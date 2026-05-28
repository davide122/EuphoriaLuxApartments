import { FeatureFocusSection } from "@/components/sections/feature-focus";

export function JacuzziSection() {
  return (
    <FeatureFocusSection
      id="spa"
      ambient="spa"
      eyebrow="Jacuzzi / Spa"
      title="Jacuzzi privata in suite (uso esclusivo)."
      description="Jacuzzi interna alla suite: niente turni, niente spazi comuni. Entri, chiudi la porta e ti rilassi in totale privacy."
      bullets={[
        "Uso esclusivo: zero spazi condivisi, zero distrazioni",
        "Luci d’atmosfera",
        "Perfetta per anniversari, sorprese e fughe romantiche",
      ]}
      mediaLabel="Spa interna — acqua e riflessi"
      mediaSrc="/passion-jacuzzi.jpg"
      mediaTone="spa"
    />
  );
}
