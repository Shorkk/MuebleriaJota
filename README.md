# 🪑 Mueblería Hermanos Jota — E-commerce

🔗 **Frontend:** [https://muebleria-jota-gules.vercel.app/](https://muebleria-jota-gules.vercel.app/)
🔗 **Backend:** [https://muebleriajota.onrender.com/](https://muebleriajota.onrender.com/)

---

## 📌 Descripción

Este proyecto corresponde al desarrollo de una plataforma de **e-commerce para Mueblería Hermanos Jota**, enfocada en la venta y navegación de productos mobiliarios.
La aplicación permite explorar un catálogo, agregar artículos al carrito y visualizar pedidos. Además, incluye un panel de administración para la gestión de usuarios.

### ✔️ Funcionalidades principales

* Página de inicio, catálogo, detalle de producto, carrito, contacto, pedidos, perfil de usuario y login/registro.
* Autenticación con **JWT** y autorización basada en roles (usuario y administrador).
* Almacenamiento seguro de contraseñas utilizando **bcrypt** para hashing y salting
* Carrito de compras simulado con **contador visible** en el header.
* Panel de administración para la **gestión de usuarios** (eliminar y cambiar rol).
* Almacenamiento de datos en **MongoDB** (usuarios, productos, pedidos, formularios de contacto).
* Manejo de estado global con **Context API** de React.
* **Diseño Mobile First (CSS)** y completamente responsivo.
* Despliegue:

  * Frontend → **Vercel**
  * Backend → **Render**

---

## 👥 Desarrolladores

* **David Shih**
* **Johana Salgueiro**

---

## 🛠️ Tecnologías utilizadas

| Frontend | Backend | Base de datos |
| -------- | ------- | ------------- |
| React    | Node.js | MongoDB       |
| Vite     | Express | Mongoose      |
| CSS      | JWT     |               |

<br>

<table>
   <tr align="center">
      <td>
         <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/html.png" width="50"/>
         <p>HTML5</p>
      </td>
      <td>
         <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/css.png" width="50"/>
         <p>CSS3</p>
      </td>
      <td>
         <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png" width="50"/>
         <p>JavaScript</p>
      </td>
      <td>
         <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" width="50"/>
         <p>React</p>
      </td>
   </tr>
   <tr align="center">
      <td>
         <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/node_js.png" width="50"/>
         <p>Node.js</p>
      </td>
      <td>
         <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/express.png" width="50"/>
         <p>Express</p>
      </td>
      <td>
         <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/mongodb.png" width="50"/>
         <p>MongoDB</p>
      </td>
      <td>
         <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/github.png" width="50"/>
         <p>GitHub</p>
      </td>
   </tr>
</table>
<p>
Icons by 
<a href="https://github.com/marwin1991/profile-technology-icons" target="_blank">
  marwin1991
</a>
</p>

---

## 💻 Instalación local

### 🔹 Backend (Servidor)

Dentro de la carpeta `MuebleriaJota/backend`:

1. Instalar las dependencias definidas en el archivo `package.json`:

   ```console
   npm install
   ```

2. Crear un archivo `.env` para guardar las variables de entorno sensibles:

   ```console
   PORT=4000
   MONGODB_URI=mongodb+srv://usuario:contraseña@cluster/dbname
   JWT_SECRET=claveSecreta
   ```

3. Iniciar el servidor:

   ```console
   npm start
   ```

---

### 🔹 Frontend (Cliente)

Dentro de la carpeta `MuebleriaJota/client`:

1. Instalar las dependencias necesarias:

   ```console
   npm install
   ```

2. Crear un archivo `.env` con la URL del backend:

   ```console
   VITE_API_URL=http://localhost:4000
   ```

3. Iniciar el servidor de desarrollo:

   ```console
   npm run dev
   ```
