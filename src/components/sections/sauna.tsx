import { FeatureFocusSection } from "@/components/sections/feature-focus";

export function SaunaSection() {
  return (
    <FeatureFocusSection
      id="sauna"
      ambient="sauna"
      eyebrow="Sauna"
      title="Sauna interna, dentro la suite."
      description="Sauna in camera: completa la SPA privata insieme alla jacuzzi, senza uscire dalla stanza e senza condivisione."
      bullets={[
        "Esperienza wellness completa, senza uscire dalla suite",
        "Un momento lento e privato, perfetto per coppie",
        "Smart check-in e smart check-out completamente da soli (tastierino)",
      ]}
      mediaLabel="Sauna interna — calore e quiete"
      mediaSrc="/passion-letto-jacuzzi-sauna.jpg"
      mediaTone="sauna"
      flip
    />
  );
}
