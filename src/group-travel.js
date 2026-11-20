// Both entry points use the same existing destination. No new destination slugs.
for(const [key,selector] of Object.entries({egipto:'.egypt-card .trip-card-link',amazonas:'.amazon-card .trip-card-link'})){
 const source=document.querySelector(selector),target=document.querySelector(`[data-schedule-link="${key}"]`);
 if(!source||!target)continue;
 for(const attr of ['href','data-dialog','aria-haspopup','aria-controls','target','rel']){
  if(source.hasAttribute(attr))target.setAttribute(attr,source.getAttribute(attr));else target.removeAttribute(attr);
 }
}
