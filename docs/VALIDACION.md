# Validación de la reconstrucción

12 de noviembre de 2026. Estas verificaciones corresponden a la segunda entrega visual.

## Comprobado

- `npm run check`: recursos locales, fotografías configuradas, IDs, vínculos a diálogos, alternativas y dimensiones de las imágenes HTML, sintaxis JavaScript. Resultado: correcto, 22 recursos referenciados.
- `npm test`: los dos casos existentes de WhatsApp pasan, incluidas tildes, saltos de línea, caracteres reservados, nombre vacío e interés no reconocido.
- `npm run build`: genera la web estática y excluye las páginas `qa-*.html`.
- Comparación visual junto al PNG con ancho útil idéntico: 1024 px. La home mide 1536 px de alto, como la referencia.
- Medición del documento en navegador: sin desborde horizontal a 320, 390, 768 y 1024 px. El ancho de contenido y scrollWidth coinciden en los cuatro casos.
- Menú móvil: abrir, entrar en Viajes y comprobar el cierre automático.
- Egipto: abrir propuesta y continuar al contacto; interés seleccionado `egipto`.
- Cerrar contacto con Escape; el diálogo desaparece.
- Amazonas a medida: abrir contacto; interés seleccionado `medida`.
- HTML autónomo: abre y permite entrar y salir de la propuesta de Amazonas, con el encabezado esperado.
- Registros observados: sin errores o advertencias de la aplicación en las URLs del servidor local. Hubo mensajes internos de la extensión del navegador, ajenos al sitio.

## Límites

No se enviaron WhatsApps ni correos, no se publicó en GitHub o Vercel y no se probaron dispositivos físicos. El envío está delegado a WhatsApp, donde el visitante confirma el mensaje.

Los cinco paisajes originales no están disponibles. Se conservan fragmentos del PNG para revisar composición; la fidelidad final de las fotografías, los adornos faltantes y las letras sigue pendiente según `RECURSOS_PENDIENTES.md`. No se declara una coincidencia píxel por píxel ni una reconstrucción completa con originales.

La política de privacidad describe el comportamiento de la home; la información definitiva del negocio y del dominio deberá incorporarse al preparar la publicación.
