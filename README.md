# 🪑 Mueblería Hermanos Jota - E-commerce

## 📌 Descripción
Este proyecto corresponde a la primera entrega del desarrollo de la plataforma de e-commerce para **Mueblería Hermanos Jota**.  
En esta etapa construimos la **fachada digital completa** utilizando únicamente tecnologías del lado del cliente (**HTML, CSS y JavaScript**).  

El sitio incluye:
- Página de Inicio (`index.html`) con hero banner y productos destacados.  
- Catálogo de productos (`productos.html`) con renderizado dinámico desde un array en JavaScript.  
- Detalle de producto (`producto.html`) con información completa y opción de añadir al carrito.  
- Formulario de contacto (`contacto.html`) con validación en el lado del cliente.  
- Carrito simulado con contador visible en el header.  

## 👥 Desarrolladores
- [David Shih]  
- [Johana Salgueiro]  

## 🛠️ Tecnologías utilizadas
- HTML5  
- CSS3 (Flexbox, Mobile-First)  
- JavaScript (DOM, Eventos, Arrays de Objetos)  
- Git & GitHub  

## 💻 Empezando a levantar el servidor 
1. Instalar todas las dependencias necesarias (express, dotenv y nodemon) que están listadas en el archivo package.json. En la terminal, desde la carpeta MuebleriaJota/backend, ejecutar:
   ```console
   npm install
   ```
   
2. Guardar configuración privada del puerto. Dentro de MuebleriaJota/backend, crear un archivo llamado .env y escribir adentro:
   ```console
   PORT=4000
   ```
   (Elegir cualquier número de puerto libre, por ejemplo 4000, 8080, etc. Si no se crea el archivo .env, el servidor usará por defecto el puerto 3000.)

3. Iniciar el servidor en modo desarrollo con nodemon, que recarga automáticamente cuando hacés cambios en el código:
   ```python
   npm run dev
   ```