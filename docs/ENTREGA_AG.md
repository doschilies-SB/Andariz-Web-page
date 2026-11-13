# Continuar en Antigravity

## Prompt para AG

```text
Continuamos la home de Andariz Expediciones. Usá esta carpeta como raíz: contiene la reconstrucción del PNG aprobado, no la primera interpretación visual. Leé README.md, docs/RECURSOS_PENDIENTES.md y docs/VOZ_Y_CONTENIDO.md.

1. Abrí npm run dev. Compará /src/qa-compare.html: el PNG aprobado está en assets/reference/boceto.png. La referencia tiene 1024 × 1536 px. Conservá composición, alturas relativas, cortes de renglón, superposición del Nilo y orden de secciones.
2. Usá los recursos originales de assets/brand/. Las cinco fotos de la home todavía son fragmentos provisionales del PNG porque no venían en el ZIP de marca. Si Santi aporta las originales, integrálas mediante visualAssets y visualFocalPoints en src/config.js, según docs/RECURSOS_PENDIENTES.md. No inventes que ya existen ni reemplaces escenas por imágenes de stock sin que se pida.
3. No cambies fuentes por las del ZIP automáticamente: Reislust y Ranberg Demo no son las letras del boceto. La demo carece de signos, números y tildes. Conservá Calistoga/Caveat salvo una decisión expresa de tipografía.
4. Conservá textos como HTML seleccionable, botones funcionales y el comportamiento móvil. Los paisajes provisionales no justifican convertir toda la página en una imagen.
5. Ejecutá npm run check, npm test y npm run build. Revisá también /src/qa-responsive.html. El build excluye qa-*.html.
6. Regenerá npm run standalone cuando cambie la web. Ese HTML sirve para revisión; no es el fuente principal.
7. Cuando Santi indique publicar, prepará Git/GitHub y Vercel usando vercel.json: Other, npm run build, dist. Confirmá el repositorio y la cuenta de destino antes de elegirlos. Completá canonical y og:image con el dominio real cuando se defina.
8. Conservá WhatsApp +54 9 3537 32-7836 y correo andarizexpediciones@gmail.com. El formulario prepara el texto; el visitante envía desde WhatsApp. No hay servicio de correo conectado.

No rediseñes ni migres de framework para subirla. No inventes fechas, precios, cupos, testimonios, matrículas, artículos, redes ni itinerarios. La Bitácora actual solo contiene fragmentos derivados de los textos de Emi; los dos artículos definitivos no fueron entregados.
```

## Mapa de composición

Medidas de referencia a 1024 px; el CSS escala hasta 1600 px y cambia a una composición apilada a 700 px o menos.

| Bloque | Altura base | Color |
| --- | --- | --- |
| Cabecera | 85 px | Crema |
| Hero | 448 px | Mostaza |
| Emi | 249 px | Borgoña |
| Viajes | 471 px | Azul |
| Amazonas a medida | 74 px | Oliva |
| Contacto | 153 px | Petróleo |
| Pie | 56 px | Petróleo |

La home suma 1536 px a ese ancho. Los motivos de marca y bordes de papel pueden sobresalir de las secciones de forma intencional. Mantener esas capas; no añadir `overflow: hidden` a cada sección.

## Antes de la publicación definitiva

Completar las fotografías y adornos pendientes según el documento específico, el dominio y los datos definitivos del negocio. No hacen falta variables secretas ni una base de datos para el alcance actual. Esta entrega no registra ni publica un sitio remoto.
