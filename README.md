# Hub de Marco Portugal

Sitio estático con Astro. Costo: solo el dominio.

## Probar en tu computadora
    npm install
    npm run dev      # abre http://localhost:4321

## Estructura
- `src/data/`: contenido editable de las páginas (un `.json` por formulario de Pages CMS)
- `src/lib/contenido.ts`: valida ese contenido; un campo vacío o inválido se omite, no rompe la web
- `src/content/articulos/`: un archivo .md por artículo
- `src/pages/`: Inicio, Artículos, Sobre mí, Sesiones
- `src/components/blocks/`: los bloques de la página Sobre mí
- `src/config.ts`: junta los ajustes del sitio con los datos técnicos del newsletter
- `.pages.yml`: formularios de Pages CMS

## Editar la web (Marco)
Entrar a app.pagescms.org con GitHub. En el menú de la izquierda:

- **Artículos**: crear uno nuevo, escribir, guardar.
- **Página de inicio**: textos y botones de la portada. Cada sección tiene un interruptor para mostrarla u ocultarla.
- **Sobre mí**: la página es una lista de secciones (bloques). Se puede editar cada una, añadir nuevas,
  eliminarlas y arrastrarlas para cambiar el orden. Tipos disponibles: cabecera con foto, cifras clave,
  trayectoria, lista numerada, texto libre, imagen, cita, llamada a la acción y newsletter.
- **Sesiones**: textos de la página del calendario.
- **Ajustes del sitio**: nombre, frase principal, LinkedIn, usuario de Cal.com, fotos y los textos del
  newsletter y del panel oscuro que se repiten en varias páginas.

Al guardar, la web se actualiza sola en uno o dos minutos. No hay vista previa: el cambio se ve ya publicado.
Si algo queda mal, se vuelve a editar y guardar, o se pide al desarrollador deshacer el último cambio.

## Añadir un tipo de bloque nuevo (desarrollador)
1. Esquema en `src/lib/contenido.ts` (unión `bloque`).
2. Componente en `src/components/blocks/` y su línea en `BlockRenderer.astro`.
3. Formulario en `.pages.yml`, dentro de `sobre_mi` → `bloques` → `blocks`.
