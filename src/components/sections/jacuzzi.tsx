import { FeatureFocusSection } from "@/components/sections/feature-focus";

export function JacuzziSection() {
  return (
    <FeatureFocusSection
      id="spa"
      ambient="spa"
      eyebrow="Jacuzzi / Spa"
      title="Jacuzzi privata. Non un dettaglio: il motivo per cui la scegli."
      description="Qui non condividi nulla. La jacuzzi è solo vostra: luci, riflessi, privacy e un ritmo lento. È così che una notte diventa un’esperienza."
      bullets={[
        "Uso esclusivo: zero spazi condivisi, zero distrazioni",
        "LED e riflessi: atmosfera lounge, mai kitsch",
        "Perfetta per anniversari, sorprese e fughe romantiche",
      ]}
      mediaLabel="Spa interna — acqua e riflessi"
      mediaSrc="/passion-jacuzzi.jpg"
      mediaTone="spa"
    />
  );
}
