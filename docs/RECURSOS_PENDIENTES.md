# Recursos pendientes y sustitución sin rediseñar

## Qué se recibió

`Archivo(1).zip` contiene el manual de identidad, láminas SVG con imágenes incorporadas, logos, símbolos, textura de papel, dos fotos de Emi y las fuentes Reislust y Ranberg Rounded Rough Demo. No contiene los cinco paisajes del PNG como fotografías separadas.

Los archivos adjuntos cuyo nombre empieza por `._` son metadatos de macOS, no fuentes instalables. Los archivos tipográficos completos sí están dentro del ZIP.

## Fotografías que faltan

Tamaños orientativos para originales nítidos; no representan archivos ya recibidos. Las medidas de la tercera columna son las cajas de referencia sobre el boceto de 1024 × 1536 px.

| Clave en config.js | Nombre propuesto | Caja de referencia | Contenido y encuadre | Original sugerido |
| --- | --- | --- | --- | --- |
| `hero` | `hero-rio-negro.webp` | 596 × 445 px | Canoa centrada en el tercio inferior, río y selva; cielo libre arriba para la anotación | 1800 px de ancho o más |
| `nile` | `nilo-faluca.webp` | 219 × 284 px, marco inclinado | Faluca con vela vertical, agua abajo y cielo arriba | 800 × 1100 px o más |
| `lodge` | `amazonas-lodge.webp` | 603 × 230 px | Pasarela, lodge a la derecha, río al centro e izquierda | 1800 × 700 px o más |
| `egypt` | `egipto-piramides.webp` | 479 × 231 px | Pirámides, vegetación y luz cálida; horizontal ancho | 1500 × 750 px o más |
| `amazon` | `amazonas-canoa.webp` | 480 × 231 px | Canoa al centro, canal y selva a ambos lados | 1500 × 750 px o más |

Si se reciben fotos diferentes, mantener la composición y ajustar únicamente el punto de encuadre. No afirmar que fotos distintas producen un resultado idéntico al PNG.

## Cómo integrarlas

1. Copiar las fotografías a `assets/photos/` con los nombres de la tabla.
2. Cambiar solo las claves correspondientes de `visualAssets` en `src/config.js`:

```js
export const visualAssets = Object.freeze({
  hero: '/assets/photos/hero-rio-negro.webp',
  nile: '/assets/photos/nilo-faluca.webp',
  lodge: '/assets/photos/amazonas-lodge.webp',
  egypt: '/assets/photos/egipto-piramides.webp',
  amazon: '/assets/photos/amazonas-canoa.webp',
});
```

3. En `visualFocalPoints`, ajustar `object-position` si hace falta; por ejemplo `hero: '50% 60%'`. No cambiar el tamaño de la sección para acomodar una foto.
4. La imagen se muestra cuando termina de cargar. Si falla, permanece la escena del boceto. `npm run check` detecta rutas configuradas que no existen.
5. Los marcos y anotaciones HTML se activan al cargar la fotografía. El paisaje original no debe traer títulos ni botones impresos.
6. Ejecutar `npm run check`, revisar escritorio y celular, y regenerar el build y el HTML autónomo.

## Elementos de collage aún no separados

La palma del hero, el sello egipcio y el matasellos forman parte del PNG. El sello y el matasellos tienen capas propias; la palma está dentro de la escena provisional del hero. La cinta y las etiquetas de una fotografía definitiva están preparadas en CSS/HTML.

Para una reproducción completa con fotografías nuevas, hace falta también una palma recortada con transparencia y el sello/matasellos originales, si existen. Una palma nueva se debe colocar por encima del hero, pegada al borde derecho, sin cubrir el texto ni la proa. No sustituir esos adornos por emojis o iconos genéricos.

## Tipografías y símbolos

El PNG generado estilizó algunos símbolos y letras. Se mantiene la identidad SVG recibida, incluso donde su trazo difiere del boceto. Los titulares usan Calistoga; las anotaciones, Caveat. Las fuentes del ZIP no son las letras que se ven en el PNG: Reislust es de trazo fino y Ranberg Demo tiene únicamente letras latinas básicas. La versión demo no puede cubrir los textos españoles de la página.

## Límite de esta versión

La home está lista para revisar la composición y continuar el desarrollo. La sustitución de los cinco originales y de los adornos señalados sigue pendiente. No eliminar `assets/reference/boceto.png` hasta que ninguna regla CSS dependa de él.
