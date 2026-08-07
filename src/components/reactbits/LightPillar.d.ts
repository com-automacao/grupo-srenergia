/**
 * Tipagem dos props do LightPillar (react-bits). O componente em si fica em
 * JavaScript, verbatim como veio do registro — só a superfície é tipada, para
 * que os call sites tenham autocomplete e checagem.
 */
declare const LightPillar: (props: {
  /** Cor do topo do pilar. */
  topColor?: string;
  /** Cor da base do pilar. */
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  className?: string;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  mixBlendMode?: "screen" | "normal" | "lighten" | "plus-lighter";
  pillarRotation?: number;
  quality?: "low" | "medium" | "high";
}) => React.JSX.Element;

export default LightPillar;
