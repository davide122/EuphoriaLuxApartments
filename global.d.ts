import { type Ref } from "react";
import { type ShaderMaterial } from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidMaterial: {
        ref?: Ref<ShaderMaterial | null>;
        transparent?: boolean;
        depthWrite?: boolean;
      };
    }
  }
}

export {};

