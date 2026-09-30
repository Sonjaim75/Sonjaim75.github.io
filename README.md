# Sonjaim

Catálogo personal de películas.

## Cómo publicar en GitHub Pages

1. Crea un repositorio nuevo llamado **exactamente** `TUUSUARIO.github.io`  
   (reemplaza TUUSUARIO por tu nombre de usuario de GitHub).

2. Sube **todos** los archivos y carpetas de este proyecto a la raíz del repositorio.

3. Ve a **Settings → Pages**.

4. En "Source" elige la rama `main` (o `master`) y la carpeta `/ (root)`.

5. Guarda. En 1-2 minutos tu sitio estará en:  
   `https://TUUSUARIO.github.io`

## Estructura

```
sonjaim/
├── index.html              → Página de inicio
├── peliculas.html          → Catálogo con filtros
├── colecciones.html        → Sección de colecciones
├── sobre.html              → Sobre nosotros
├── pelicula-merrily.html   → Detalle de cada película
├── pelicula-company.html
├── pelicula-woods.html
├── pelicula-sweeney.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── img/                    → (vacío por ahora, para posters futuros)
```

## Notas

- Los carteles actuales son placeholders (letra inicial + gradiente verde).
- Los enlaces externos de "Ver película" están preparados para que los agregues después.
- Los filtros por año y género funcionan en la página Películas.
- El buscador (ícono de lupa) también está activo.
