export type GiftDetails = {
  from: string;
  to: string;
  message: string;
  experience: string;
  duration: string;
  theme: 'romance' | 'celebrate' | 'escape';
};

export const giftThemes = {
  romance: { label: 'Con amore', title: 'Il tempo più bello.', subtitle: 'È quello che scegliamo di regalarci.', ink: '#fff3ed', accent: '#d5a5ac' },
  celebrate: { label: 'Per festeggiarti', title: 'Oggi, solo tu.', subtitle: 'Certi momenti meritano qualcosa di speciale.', ink: '#fff5e6', accent: '#d4b583' },
  escape: { label: 'Una pausa per te', title: 'Lascia fuori il mondo.', subtitle: 'Dentro, c’è tutto il tempo per stare bene.', ink: '#eef7f4', accent: '#a1c4bb' },
} as const;

function wrap(ctx: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = [];
  for (const paragraph of text.split('\n')) {
    let line = '';
    for (const char of Array.from(paragraph)) {
      if (ctx.measureText(line + char).width > width) {
        const space = line.lastIndexOf(' ');
        if (space > 0) { lines.push(line.slice(0, space)); line = line.slice(space + 1) + char; }
        else { lines.push(line); line = char; }
      } else line += char;
    }
    lines.push(line);
  }
  return lines;
}

export async function renderGift(canvas: HTMLCanvasElement, details: GiftDetails) {
  const photo = new Image();
  photo.src = '/passion-letto-jacuzzi-sauna.jpg';
  await photo.decode();
  canvas.width = 1800;
  canvas.height = 2520;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');
  ctx.scale(1.8, 1.8);
  const theme = giftThemes[details.theme];
  ctx.fillStyle = '#080808'; ctx.fillRect(0, 0, 1000, 1400);
  const scale = Math.max(1000 / photo.width, 480 / photo.height);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, 480); ctx.clip();
  ctx.drawImage(photo, (1000 - photo.width * scale) / 2, (480 - photo.height * scale) / 2, photo.width * scale, photo.height * scale);
  ctx.restore();
  const shade = ctx.createLinearGradient(0, 0, 0, 480);
  shade.addColorStop(0, '#080808bb'); shade.addColorStop(0.4, '#08080855'); shade.addColorStop(1, '#080808');
  ctx.fillStyle = shade; ctx.fillRect(0, 0, 1000, 480);
  // A fine inset frame keeps the dark gift card distinct on screen and in print.
  ctx.strokeStyle = theme.accent + '50'; ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, 940, 1340);
  ctx.textAlign = 'center'; ctx.fillStyle = '#fff8ef';
  ctx.font = '48px Georgia'; ctx.fillText('Euphoria', 500, 98);
  ctx.font = '13px Arial'; ctx.letterSpacing = '5px'; ctx.fillText('LUXURY SUITE', 500, 128); ctx.letterSpacing = '0px';
  ctx.font = 'italic 58px Georgia'; ctx.fillText(theme.title, 500, 358);
  ctx.font = '19px Arial'; ctx.fillText(theme.subtitle, 500, 400);
  ctx.fillStyle = theme.accent; ctx.fillRect(499, 451, 2, 64);
  ctx.font = '12px Arial'; ctx.letterSpacing = '4px'; ctx.fillText('UN REGALO, SOLO PER TE', 500, 556); ctx.letterSpacing = '0px';
  ctx.fillStyle = theme.ink;
  const recipient = details.to.trim() || 'Una persona speciale';
  ctx.font = '46px Georgia';
  let size = 46;
  while (ctx.measureText(recipient).width > 820 && size > 20) { size--; ctx.font = `${size}px Georgia`; }
  ctx.fillText(recipient, 500, 627);
  ctx.strokeStyle = theme.accent + '60'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(420, 663); ctx.lineTo(580, 663); ctx.stroke();
  const message = details.message.trim().replace(/\s+/g, " ") || "Un momento da vivere. Un ricordo da portare con te.";
  let messageSize = 28;
  ctx.font = `italic ${messageSize}px Georgia`;
  let lines = wrap(ctx, message, 770);
  while (lines.length * messageSize * 1.5 > 285 && messageSize > 12) {
    messageSize--; ctx.font = `italic ${messageSize}px Georgia`; lines = wrap(ctx, message, 770);
  }
  const lineHeight = messageSize * 1.5;
  const start = 715 + (285 - lines.length * lineHeight) / 2;
  lines.forEach((line, i) => ctx.fillText(line, 500, start + i * lineHeight));
  ctx.fillStyle = theme.accent; ctx.font = '12px Arial'; ctx.letterSpacing = '3px'; ctx.fillText('CON AFFETTO', 500, 1032); ctx.letterSpacing = '0px';
  ctx.fillStyle = theme.ink; ctx.font = 'italic 30px Georgia';
  const sender = details.from.trim() || 'Chi ti vuole bene';
  let senderSize = 30;
  while (ctx.measureText(sender).width > 800 && senderSize > 16) { senderSize--; ctx.font = `italic ${senderSize}px Georgia`; }
  ctx.fillText(sender, 500, 1076);
  ctx.fillStyle = '#111111'; ctx.fillRect(65, 1120, 870, 143);
  ctx.strokeStyle = theme.accent + '60'; ctx.strokeRect(65, 1120, 870, 143);
  ctx.font = '12px Arial'; ctx.fillStyle = theme.accent; ctx.letterSpacing = '3px'; ctx.fillText('LA TUA ESPERIENZA', 500, 1155); ctx.letterSpacing = '0px';
  ctx.fillStyle = theme.ink; ctx.font = '27px Georgia'; ctx.fillText(details.experience, 500, 1194);
  ctx.font = '17px Arial'; ctx.fillText(details.duration + ' · Per due persone', 500, 1230);
  ctx.font = '12px Arial'; ctx.fillStyle = '#aaa4a0'; ctx.fillText('EUPHORIA LUXURY SUITE · PORTO EMPEDOCLE, SICILIA', 500, 1307);
  ctx.fillStyle = theme.ink; ctx.font = 'bold 13px Arial'; ctx.fillText('ANTEPRIMA TEST · NON VALIDO PER LA PRENOTAZIONE', 500, 1350);
}
