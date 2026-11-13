import { buildWhatsAppUrl, siteConfig, interests, visualAssets, visualFocalPoints } from './config.js';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const contactDialog = document.querySelector('#contact-dialog');
const contactForm = document.querySelector('#contact-form');
const status = document.querySelector('#contact-status');
const interestSelect = document.querySelector('#travel-interest');
let returnFocus = null;

document.querySelectorAll('[data-visual-slot]').forEach((slot) => {
  const source = visualAssets[slot.dataset.visualSlot];
  if (!source) return;
  const img = document.createElement('img');
  img.className = 'asset-original';
  img.alt = '';
  img.decoding = 'async';
  img.style.objectPosition = visualFocalPoints[slot.dataset.visualSlot] || '50% 50%';
  img.setAttribute('aria-hidden', 'true');
  if (slot.dataset.visualSlot !== 'hero') img.loading = 'lazy';
  img.addEventListener('load', () => slot.classList.add('has-original'));
  img.addEventListener('error', () => {
    img.remove();
    console.warn(`Andariz: no se pudo cargar la fotografía de ${slot.dataset.visualSlot}; se conserva la referencia.`);
  });
  img.src = source;
  slot.prepend(img);
});

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

function openDialog(dialog, trigger) {
  if (!dialog) return;
  const currentDialog = document.querySelector('dialog[open]');
  if (!currentDialog) returnFocus = trigger || document.activeElement;
  if (currentDialog === dialog) return;
  if (currentDialog) currentDialog.close();
  closeMenu();
  dialog.showModal();
  dialog.scrollTop = 0;
  dialog.querySelector('[data-close]')?.focus({ preventScroll: true });
}

function openContact(interest, trigger) {
  interestSelect.value = Object.hasOwn(interests, interest) ? interest : 'general';
  status.replaceChildren();
  openDialog(contactDialog, trigger);
}

document.addEventListener('click', (event) => {
  const contactLink = event.target.closest('[data-contact]');
  if (contactLink) {
    event.preventDefault();
    openContact(contactLink.dataset.contact, contactLink);
    return;
  }
  const dialogLink = event.target.closest('[data-dialog]');
  if (dialogLink) {
    event.preventDefault();
    openDialog(document.getElementById(dialogLink.dataset.dialog), dialogLink);
    return;
  }
  const closeLink = event.target.closest('[data-close-link]');
  if (closeLink) closeLink.closest('dialog')?.close();
});

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  // Only the backdrop dismisses; clicking the dialog's own padding does not.
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) returnFocus?.focus({ preventScroll: true });
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const href = buildWhatsAppUrl({ name: data.get('name'), interest: data.get('interest'), message: data.get('message') });
  const link = document.createElement('a');
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Abrir WhatsApp';
  status.replaceChildren('Tu mensaje está preparado. Revisalo y envialo desde WhatsApp. ', link);
  // The user clicks Send inside WhatsApp. The website sends no message itself.
  link.click();
});

// Keep all public contact links in sync with the single configuration file.
document.querySelectorAll('[data-contact]').forEach((link) => {
  link.href = buildWhatsAppUrl({ interest: link.dataset.contact });
});
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.href = `mailto:${siteConfig.email}`;
  if (link.textContent.includes('@')) link.textContent = siteConfig.email;
});
document.querySelector('.whatsapp-icon').href = `https://wa.me/${siteConfig.whatsapp}`;

const deepLinks = {
  '#mi-historia': 'emi-dialog', '#nuestra-forma': 'philosophy-dialog',
  '#egipto': 'egypt-dialog', '#amazonas': 'amazon-dialog', '#privacidad': 'privacy-dialog',
  '#bitacora': 'journal-dialog',
};
function readDeepLink() {
  const dialogId = deepLinks[window.location.hash];
  if (dialogId) openDialog(document.getElementById(dialogId), document.querySelector(`[data-dialog="${dialogId}"]`));
}
window.addEventListener('hashchange', readDeepLink);
readDeepLink();
