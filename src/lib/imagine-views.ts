import type { ImagineSuite } from '@/lib/imagine';

export const imagineViews = ['room', 'spa', 'bed'] as const;
export type ImagineView = (typeof imagineViews)[number];
export type SuiteReference = { id: ImagineView; label: string; file: string };

// The selected photo is always first in the edit request. Other views belong
// to the same suite and provide material/layout context, never another room.
export const suiteReferences: Record<ImagineSuite, readonly SuiteReference[]> = {
  Passion: [
    { id: 'room', label: 'La suite', file: 'passion-letto-jacuzzi-sauna.jpg' },
    { id: 'spa', label: 'La jacuzzi', file: 'passion-jacuzzi.jpg' },
    { id: 'bed', label: 'Il vostro rifugio', file: 'passion/WhatsApp Image 2026-08-16 at 21.29.22.jpeg' },
  ],
  Infinity: [
    { id: 'room', label: 'La suite', file: 'infinity/WhatsApp Image 2026-08-16 at 21.29.23 (2).jpeg' },
    { id: 'spa', label: 'La jacuzzi', file: 'infinity/WhatsApp Image 2026-08-16 at 21.29.16 (2).jpeg' },
    { id: 'bed', label: 'Il vostro rifugio', file: 'infinity/WhatsApp Image 2026-08-16 at 21.29.16.jpeg' },
  ],
};
export function orderedReferences(suite: ImagineSuite, view: ImagineView) {
  const refs = suiteReferences[suite];
  return [refs.find(ref => ref.id === view) ?? refs[0], ...refs.filter(ref => ref.id !== view)];
}
export function referenceUrl(suite: ImagineSuite, view: ImagineView) {
  return '/' + orderedReferences(suite, view)[0].file;
}
