import { FeatureFocusSection } from "@/components/sections/feature-focus";

export function SaunaSection() {
  return (
    <FeatureFocusSection
      id="sauna"
      ambient="sauna"
      eyebrow="Sauna"
      title="Sauna interna: benessere vero, intimità totale."
      description="Il lusso non è solo estetica: è come ti senti. La sauna completa l’esperienza e alza il livello: più relax, più intimità, più stacco dal mondo."
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
