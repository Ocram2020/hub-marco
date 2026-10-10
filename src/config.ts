// Textos generales del sitio. Marco los edita desde Pages CMS ("Ajustes del sitio" → src/data/sitio.json).
import { sitio } from './lib/contenido';

export const site = {
  ...sitio,
  // Newsletter (Kit). Datos técnicos: se quedan en código para que no se puedan romper desde el CMS.
  newsletterAction: 'https://app.kit.com/forms/10019748/subscriptions',
  newsletterFormId: '10019748',
  newsletterUid: '7c1ddf8cfe',
};
