# CRONODE — Landing estática (HTML/CSS/JS)

Sitio web estático para presentar los proyectos y servicios de **Cronode** (Cornode): innovación con propósito humano, con enfoque en **educación** e **entretenimiento**.

## Estructura
- `index.html` — Página principal (secciones: Hero, Proyectos/Servicios, Sobre Nosotros, Contacto).
- `styles.css` — Estilos globales y componentes (nav, hero, tarjetas, animaciones).
- `scripts.js` — Efectos visuales, animaciones al hacer scroll y UX básica del formulario/contacto.

> Base tomada de tu versión actual de `index.html`, `styles.css` y `scripts.js`.  
> (Revisa los archivos en este repo para ver el estado más reciente).
  
## Cómo editar contenido
- **Proyectos/Servicios**: edita los textos y/o videos en la sección `#proyectos` del `index.html`.
- **Sobre Nosotros**: edita la sección `#nosotros`.
- **Contacto**: los accesos rápidos (Email / WhatsApp / Llamar) y el formulario están en `#contacto`.  
  - Por ahora el botón **Email** está **desactivado temporalmente** (descripción abajo).

## Contacto — Estado del Email
- El acceso **Email** está **desactivado temporalmente** por decisión de negocio/operación.
- Se muestra difuminado y con un aviso. El usuario puede copiar/escribir directamente a:
  - **cr.didaktico@gmail.com**

### ¿Cómo reactivar el botón de Email?
1. En `index.html`, en la sección **Acciones rápidas** de `#contacto`, quita:
   - `aria-disabled="true"` y la clase `is-disabled` del botón **Email**.
   - El `<span class="tip">...</span>` si ya no querés el aviso.
2. Asegúrate de que `href="mailto:cr.didaktico@gmail.com"` esté presente.
3. Opcional: elimina en `scripts.js` el bloqueo de clic para `[aria-disabled="true"]`.

## Formulario de contacto
- Actualmente usa un **fallback `mailto:`** para abrir el cliente de correo del visitante.
- Si quieres enviar sin abrir el cliente de correo, integra un servicio como:
  - **Formspree**, **Netlify Forms**, **EmailJS** o un **endpoint propio (Node/Express)**.

## Desarrollo local
No requiere build. Basta con abrir `index.html` en el navegador o servirlo con un http server simple:

```bash
# Opción 1 (Python 3)
python -m http.server 8000

# Opción 2 (Node, si tienes http-server)
npx http-server -p 8000
