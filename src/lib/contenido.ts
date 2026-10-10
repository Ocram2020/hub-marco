// Contenido editable desde Pages CMS (src/data/*.json), validado de forma tolerante:
// un campo vacío, ausente o mal formado nunca rompe el build; simplemente no se muestra.
// Pages CMS elimina del archivo los campos que quedan vacíos, por eso todo tiene un valor por defecto.
import { z } from 'astro/zod';
import sitioJson from '../data/sitio.json';
import inicioJson from '../data/inicio.json';
import sobreMiJson from '../data/sobre-mi.json';
import sesionesJson from '../data/sesiones.json';

// Texto: acepta cualquier cosa y devuelve un string recortado (o `def` si queda vacío).
const txt = (def = '') =>
  z.unknown().transform((v) => (typeof v === 'string' || typeof v === 'number' ? String(v).trim() : '') || def);
const bool = (def: boolean) => z.boolean().catch(def);
// Objeto: si falta o no es un objeto, se trata como vacío.
const obj = <T extends z.ZodRawShape>(shape: T) =>
  z.preprocess((v) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {}), z.object(shape));
// Lista: descarta los ítems inválidos (con aviso) en lugar de fallar.
const lista = <T extends z.ZodTypeAny>(item: T, nombre: string) =>
  z.unknown().transform((v) =>
    (Array.isArray(v) ? v : []).flatMap((x): z.output<T>[] => {
      const r = item.safeParse(x);
      if (!r.success) console.warn(`[contenido] Se ignoró un elemento inválido en "${nombre}":`, JSON.stringify(x));
      return r.success ? [r.data] : [];
    }),
  );

const boton = obj({
  texto: txt(),
  destino: z.enum(['sesiones', 'articulos', 'sobre-mi', 'linkedin', 'otro']).catch('sesiones'),
  url: txt(),
  estilo: z.enum(['primary', 'secondary']).catch('primary'),
});
export type Boton = z.output<typeof boton>;
const botones = lista(boton, 'botones');

const bloque = z.discriminatedUnion('tipo', [
  z.object({ tipo: z.literal('perfil'), foto: txt(), etiqueta: txt(), nombre: txt(), rol: txt(), presentacion: txt(), botones }),
  z.object({ tipo: z.literal('cifras'), titulo: txt(), items: lista(obj({ valor: txt(), descripcion: txt() }), 'cifras') }),
  z.object({ tipo: z.literal('trayectoria'), titulo: txt(), items: lista(obj({ etiqueta: txt(), titulo: txt(), texto: txt() }), 'trayectoria') }),
  z.object({ tipo: z.literal('lista'), titulo: txt(), items: lista(txt(), 'lista') }),
  z.object({ tipo: z.literal('texto'), titulo: txt(), contenido: txt() }),
  z.object({ tipo: z.literal('imagen'), imagen: txt(), alt: txt(), pie: txt() }),
  z.object({ tipo: z.literal('cita'), texto: txt(), autor: txt() }),
  z.object({ tipo: z.literal('cta'), titulo: txt(), texto: txt(), botones }),
  z.object({ tipo: z.literal('newsletter'), titulo: txt(), texto: txt() }),
]);
export type Bloque = z.output<typeof bloque>;

// Ajustes del sitio. Los valores por defecto son la última red de seguridad si el campo se vacía.
const sitioSchema = obj({
  name: txt('Marco Portugal'),
  tagline: txt(),
  description: txt(),
  linkedin: txt('https://www.linkedin.com/in/marcoportugal1'),
  calUser: txt('marco.portugal'),
  heroImage: txt('/images/header-placeholder.png'),
  photo: txt('/images/marco-placeholder.jpeg'),
  coverFallback: txt('/images/cover-placeholder.png'),
  showCoverFallback: bool(true),
  newsletter: obj({
    titulo: txt('No te pierdas lo que viene'),
    texto: txt(),
    boton: txt('Suscribirme'),
    nota: txt(),
  }),
  cta: obj({ titulo: txt('¿Quieres llevar tu empresa al siguiente nivel?'), texto: txt() }),
});

const inicioSchema = obj({
  hero: obj({ titulo: txt(), texto: txt(), botones }),
  articulos: obj({
    titulo: txt('Últimos artículos'),
    cantidad: z.coerce.number().int().min(1).max(12).catch(6),
    texto_ver_todos: txt('Ver todos los artículos'),
  }),
  sobre: obj({ mostrar: bool(true), titulo: txt(), texto: txt(), texto_enlace: txt() }),
  newsletter: obj({ mostrar: bool(true) }),
  cta: obj({ mostrar: bool(true), titulo: txt(), texto: txt() }),
});

const sobreMiSchema = obj({ seo_titulo: txt('Sobre mí'), seo_descripcion: txt(), bloques: lista(bloque, 'bloques de Sobre mí') });

const sesionesSchema = obj({
  titulo: txt('Sesiones de consultoría'),
  texto: txt(),
  texto_ayuda: txt(),
  texto_enlace: txt('Agenda aquí directamente'),
  seo_descripcion: txt(),
});

export const sitio = sitioSchema.parse(sitioJson);
export const inicio = inicioSchema.parse(inicioJson);
export const sobreMi = sobreMiSchema.parse(sobreMiJson);
export const sesiones = sesionesSchema.parse(sesionesJson);
