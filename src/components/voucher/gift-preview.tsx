"use client";

import { useEffect, useRef, useState } from 'react';
import { Download, LoaderCircle } from 'lucide-react';
import { renderGift, type GiftDetails } from '@/lib/voucher/render-gift';

export function GiftPreview({ details }: { details: GiftDetails }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [previewError, setPreviewError] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const buffer = document.createElement('canvas');
    renderGift(buffer, details).then(() => {
      if (cancelled || !canvas.current) return;
      canvas.current.width = buffer.width; canvas.current.height = buffer.height;
      canvas.current.getContext('2d')?.drawImage(buffer, 0, 0);
      setPreviewError(false);
    }).catch(() => { if (!cancelled) setPreviewError(true); });
    return () => { cancelled = true; };
  }, [details]);

  async function download() {
    if (busy) return;
    setBusy(true); setStatus('');
    try {
      const output = document.createElement('canvas');
      const [{ jsPDF }] = await Promise.all([import('jspdf'), renderGift(output, details)]);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [150, 210], compress: true });
      pdf.setProperties({ title: 'Un regalo per te · Euphoria · TEST', subject: 'Anteprima non valida per la prenotazione', author: 'Euphoria Luxury Suite' });
      pdf.addImage(output.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 150, 210);
      pdf.save('euphoria-voucher-test.pdf');
      setStatus('PDF di prova generato. Lo trovi nei download. Nessun pagamento effettuato.');
    } catch { setStatus('Non è stato possibile generare il PDF. Riprova tra un momento.'); }
    finally { setBusy(false); }
  }

  return <div className="space-y-5">
    <div className="flex items-center justify-between gap-3"><p className="text-xs uppercase tracking-[0.2em] text-purple-200">Il tuo regalo prende forma</p><span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-400">Anteprima</span></div>
    <div className="overflow-hidden rounded-sm shadow-[0_20px_70px_-15px_rgba(0,0,0,.75)] ring-1 ring-white/15">
      <canvas ref={canvas} className="block h-auto w-full bg-[#080808]" style={{ aspectRatio: '5 / 7' }} role="img" aria-label={`Anteprima del voucher ${details.experience}, per ${details.to || 'una persona speciale'}, da ${details.from || 'chi ti vuole bene'}. Dedica: ${details.message}`} />
    </div>
    {previewError && <p role="alert" className="text-sm text-rose-200">Impossibile caricare l’anteprima. Controlla la connessione e riprova.</p>}
    <p className="text-sm leading-relaxed text-zinc-400">Il prezzo resta una tua attenzione. Sul regalo compaiono soltanto l’esperienza, i vostri nomi e le tue parole.</p>
    <button type="button" onClick={download} disabled={busy} className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#f1d6c8] px-5 py-4 font-semibold text-[#271220] transition hover:bg-[#fae7dc] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300 disabled:opacity-60">
      {busy ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}{busy ? 'Sto preparando il tuo regalo…' : 'Test · Genera il PDF gratis'}
    </button>
    <p className="text-xs leading-relaxed text-zinc-500">Prova senza pagamento. Il PDF è contrassegnato TEST e non è un voucher attivo. Nessun dato viene inviato al destinatario.</p>
    <p role="status" aria-live="polite" className="text-sm text-purple-200">{status}</p>
  </div>;
}
