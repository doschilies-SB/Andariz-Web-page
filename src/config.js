// Datos públicos. No colocar claves ni credenciales en este archivo.
export const siteConfig = Object.freeze({
  brand: 'Andariz Expediciones',
  whatsapp: '5493537327836',
  whatsappDisplay: '+54 9 3537 32-7836',
  email: 'andarizexpediciones@gmail.com',
});

export const interests = Object.freeze({
  egipto: 'Egipto en grupo',
  amazonas: 'Amazonas en grupo',
  medida: 'Amazonas a mi medida',
  general: 'Todavía estoy descubriendo',
});

// Las fotografías exactas del boceto NO están en el ZIP de identidad.
// null conserva la escena del PNG aprobado como referencia provisional.
// Para sustituirla, indicar una ruta local; ver docs/RECURSOS_PENDIENTES.md.
// El marco, la posición y la superposición se conservan en CSS.
export const visualAssets = Object.freeze({
  hero: null,
  nile: null,
  lodge: null,
  egypt: null,
  amazon: null,
});

export const visualFocalPoints = Object.freeze({
  hero: '50% 50%',
  nile: '50% 50%',
  lodge: '50% 50%',
  egypt: '50% 50%',
  amazon: '50% 50%',
});

export function buildWhatsAppUrl({ name = '', interest = 'general', message = '' } = {}) {
  const selectedInterest = Object.hasOwn(interests, interest) ? interest : 'general';
  const subject = interests[selectedInterest];
  const greeting = name.trim() ? `Hola, Emi. Soy ${name.trim()}.` : 'Hola, Emi.';
  const request = selectedInterest === 'general'
    ? 'Me gustaría conversar sobre los viajes de Andariz.'
    : `Me gustaría saber más sobre ${subject}.`;
  const text = [greeting, request, message.trim()].filter(Boolean).join('\n\n');
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}
