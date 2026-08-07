"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Scroll suave (Lenis) sincronizado com o ScrollTrigger do GSAP.
 *
 * O Lenis substitui a rolagem nativa por uma interpolada — é o que dá
 * consistência ao parallax do hero, que é preso ao scroll via `scrub`. Sem
 * ele o efeito anda aos saltos, no passo dos eventos de roda do mouse.
 *
 * Não monta sob `prefers-reduced-motion`: sequestrar a rolagem de quem pediu
 * menos movimento é exatamente o que a preferência existe para evitar. Nesse
 * caso a página usa a rolagem nativa e o parallax fica parado.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      // Toque continua nativo: no celular o scroll interpolado atrapalha mais
      // do que ajuda, e briga com o "overscroll" do sistema.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /**
     * Âncoras precisam passar pelo Lenis: com a rolagem sequestrada, o pulo
     * nativo do navegador não acontece e os links `#secao` ficariam mortos.
     */
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Só âncoras da própria página: "#x" ou "/#x" estando na home.
      const hash = href.startsWith("#")
        ? href
        : href.startsWith("/#") && window.location.pathname === "/"
          ? href.slice(1)
          : null;
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -96 });
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
