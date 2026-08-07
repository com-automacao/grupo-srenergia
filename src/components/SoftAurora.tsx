"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { fragmentShader, hexToVec3, vertexShader } from "./aurora-shader";

/**
 * SoftAurora — aurora boreal em shader, do react-bits
 * (`@react-bits/SoftAurora-JS-CSS`). Usada no hero das páginas de marca, cada
 * uma na sua cor.
 *
 * Diferenças em relação ao componente original:
 *
 * - Portado para TypeScript, com os shaders isolados em `aurora-shader.ts`.
 * - **Respeita `prefers-reduced-motion`**: o original roda um
 *   `requestAnimationFrame` infinito sem checar a preferência. Aqui, quando a
 *   preferência está ativa, renderizamos um único quadro estático — a cor
 *   permanece, o movimento não.
 * - **Pausa fora da viewport** via IntersectionObserver. Sem isso o shader
 *   continua queimando GPU enquanto o visitante lê o rodapé.
 * - `enableMouseInteraction` desligado por padrão: aqui a aurora é plano de
 *   fundo atrás de texto, não um brinquedo.
 */

type SoftAuroraProps = {
  /** Cor da primeira camada da aurora. */
  color1?: string;
  /** Cor da segunda camada — normalmente o acento da marca. */
  color2?: string;
  speed?: number;
  scale?: number;
  brightness?: number;
  bandHeight?: number;
  bandSpread?: number;
  className?: string;
};

export function SoftAurora({
  color1 = "#f7f7f7",
  color2 = "#e100ff",
  speed = 0.5,
  scale = 1.5,
  brightness = 1,
  bandHeight = 0.5,
  bandSpread = 1,
  className,
}: SoftAuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height],
        },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uBrightness: { value: brightness },
        uColor1: { value: hexToVec3(color1) },
        uColor2: { value: hexToVec3(color2) },
        uNoiseFreq: { value: 2.5 },
        uNoiseAmp: { value: 1 },
        uBandHeight: { value: bandHeight },
        uBandSpread: { value: bandSpread },
        uOctaveDecay: { value: 0.1 },
        uLayerOffset: { value: 0 },
        uColorSpeed: { value: 1 },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseInfluence: { value: 0 },
        uEnableMouse: { value: false },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      program.uniforms.uResolution.value = [
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height,
      ];
      renderer.render({ scene: mesh });
    };

    window.addEventListener("resize", resize);
    container.appendChild(gl.canvas);
    resize();

    let frame = 0;
    let visible = true;

    const update = (time: number) => {
      frame = requestAnimationFrame(update);
      if (!visible) return;
      program.uniforms.uTime.value = time * 0.001;
      renderer.render({ scene: mesh });
    };

    // Só anima quando faz sentido animar: preferência do usuário respeitada e
    // elemento efetivamente na tela.
    let observer: IntersectionObserver | undefined;
    if (reduced) {
      renderer.render({ scene: mesh });
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0 },
      );
      observer.observe(container);
      frame = requestAnimationFrame(update);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [color1, color2, speed, scale, brightness, bandHeight, bandSpread]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className ?? ""}`}
    />
  );
}
