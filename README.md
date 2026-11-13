# Andariz Expediciones · reconstrucción del boceto

Home en HTML, CSS y JavaScript, preparada para continuar en Antigravity (AG), GitHub y Vercel. Esta versión reemplaza la primera interpretación visual: usa la composición del PNG aprobado como referencia de escritorio.

## Abrir

Con Node.js 22 o superior, desde esta carpeta:

```bash
npm run dev
```

Abrir `http://localhost:5173`. No hay dependencias de producción que instalar.

Para revisar sin instalar nada, abrir **Andariz-Home-preview.html**. Es un archivo autónomo con imágenes, fuentes e interacciones incluidas. El código editable sigue estando en `index.html`, `src/` y `assets/`; no editar el archivo autónomo a mano.

## Estado real de la entrega

- Composición, proporciones de escritorio, colores por bloque, cortes de texto, superposición del Nilo y adaptación móvil reconstruidos.
- Logo, símbolos, textura y fotografías de Emi extraídos del ZIP de marca e incorporados como recursos locales.
- Las cinco escenas fotográficas de la home se muestran provisionalmente desde el PNG aprobado. **No son cinco fotografías originales de alta resolución.** Esos archivos no vienen en el ZIP recibido.
- Las letras del boceto generado tampoco corresponden a las dos fuentes del ZIP. Se usan Calistoga y Caveat, incluidas con sus licencias, como aproximación. Ranberg Demo no contiene tildes, signos ni números; las dos fuentes recibidas se conservan en `docs/originales-tipografias/` para identificación.
- No es una captura convertida en una página completa: títulos, párrafos, tarjetas, botones, navegación, formularios y diálogos son HTML seleccionable y funcional. Solo los fragmentos fotográficos y dos adornos pendientes usan el PNG.
- No se publicó en GitHub ni Vercel.

Leer `docs/RECURSOS_PENDIENTES.md` antes de sustituir fotografías. Describe nombres, encuadres, tamaños y el mecanismo para cambiarlas sin rediseñar la home.

## Comandos

| Comando | Resultado |
| --- | --- |
| `npm run dev` | Desarrollo local |
| `npm run check` | Recursos, imágenes, diálogos y sintaxis |
| `npm test` | Mensajes y codificación de enlaces de WhatsApp |
| `npm run build` | Genera `dist/`; excluye las páginas internas de revisión |
| `npm run preview` | Sirve `dist/` |
| `npm run standalone` | Regenera el HTML autónomo |

## Dónde editar

| Archivo | Función |
| --- | --- |
| `index.html` | Secciones, textos, metadatos y diálogos |
| `src/styles.css` | Composición y adaptación móvil |
| `src/config.js` | Contactos, cinco fotografías y puntos de encuadre |
| `src/main.js` | Menú, carga de fotos, diálogos y consulta |
| `assets/brand/` | Identidad original normalizada y bordes |
| `assets/reference/boceto.png` | Referencia visual aprobada; no sustituir por la primera home |
| `docs/ENTREGA_AG.md` | Prompt concreto para continuar |
| `docs/RECURSOS_PENDIENTES.md` | Lo que falta y cómo integrarlo |
| `docs/ASSETS.md` | Procedencia de recursos y fuentes |
| `docs/VOZ_Y_CONTENIDO.md` | Tono de Emi y criterios editoriales |
| `docs/VALIDACION.md` | Verificaciones y límites |

## Comparar el diseño

Con el servidor de desarrollo abierto:

- `/src/qa-compare.html`: PNG y home al mismo ancho de contenido (1024 px).
- `/src/qa-responsive.html`: vistas con 390, 320 y 768 px útiles.

Estas páginas no se copian al build de producción.

## Contactos y publicación

Se conservan los contactos configurados en la entrega anterior: **+54 9 3537 32-7836** y **andarizexpediciones@gmail.com**. La configuración está en `src/config.js`; si se modifica, actualizar también los respaldos HTML.

`vercel.json` prepara una web estática: framework Other, build `npm run build`, directorio `dist`. Cuando se defina el dominio, completar canonical y una og:image absoluta. AG debe continuar sobre esta carpeta y mantener la composición.

El formulario prepara un enlace de WhatsApp; el visitante envía el mensaje desde ese servicio. El correo usa `mailto:`. No hay base de datos, checkout, panel ni envío automático de mensajes. Fechas, precios, cupos y datos no recibidos no se inventaron.
