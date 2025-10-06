# 🧠 AM Productivity Assistant (React)

Una aplicación de productividad para escritorio desarrollada con **React**, que integra múltiples herramientas útiles en una sola interfaz: reloj con pomodoro, lista de tareas con categorías, reproductor de música de YouTube, buscador musical y un mini chatbot con IA.

---

![Status](https://badgen.net/static/Status/En%20Desarrollo/blue)

---

## 🚀 Características principales

### 🕒 Reloj + Pomodoro

- Reloj en tiempo real.
- Temporizador Pomodoro con ciclos **cortos y largos**.
- Notificaciones nativas del navegador.
- Alarma sonora al finalizar cada ciclo.
- Personalización de minutos de trabajo y descanso.

### ✅ Lista de tareas

- Crear, eliminar y marcar tareas como completadas.
- Guardado automático en **LocalStorage**.
- Posibilidad de **crear categorías personalizadas** para identificar las tareas mediante **colores**.
- Ordenar las tareas manualmente mediante **drag and drop**.
- Interfaz simple y clara, tipo lista.

### 🎵 Controlador de música (YouTube)

- Reproductor embebido con la **YouTube IFrame API**.
- Posibilidad de crear y seleccionar playlists.
- Guardado automático en **LocalStorage** de playlists.
- Control de reproducción: play, pause y stop.

### 🔍 Buscador de música

- Busca videos musicales directamente desde YouTube.
- Permite añadir resultados a tus playlists personalizadas y/o reproducirlas.

### 🤖 Mini ChatBot (OpenAI)

- Chat simple que utiliza la **API de OpenAI** para responder.
- Conversaciones cortas dentro de la app.
- Interfaz ligera y adaptable.
- Mini memoria local de mensajes

---

## 🧩 Estructura del proyecto

src/  
│  
├── components/  
│ ├── reloj/  
│ │ ├── clock.jsx  
│ │ └── style.css  
│ ├── todolist/  
│ │ ├── todolist.jsx  
│ │ └── style.css  
│ ├── musicController/  
│ │ ├── musicController.jsx  
│ │ └── style.css  
│ ├── musicSearch/  
│ │ ├── musicSearch.jsx  
│ │ └── style.css  
│ └── miniChatBot/  
│ ├── chatBot.jsx  
│ ├── style.css  
│ └── openIA-API.js  
├── contexts/  
│ ├── videoContext.jsx  
│ └── notificationContext.jsx  
├── styleGeneral.css  
├── App.css  
├── App.jsx  
└── index.js

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tuusuario/productivity-assistant.git
   cd productivity-assistant
   ```

2. Instalar dependencias:

   ```bash
   npm install

   ```

3. Ejecutar en modo desarrollo:

   ```bash
    npm run dev
   ```

4. Abrir en el navegador:

   ```arduino
    http://localhost:3000
   ```

---

# 🧠 Tecnologías utilizadas

- React.js
- React Select
- YouTube IFrame API
- OpenAI API
- LocalStorage
- CSS Modules
- Vite / Create React App

---

# 📜 Licencia

Este proyecto se distribuye bajo la licencia MIT.
Podés usarlo, modificarlo o ampliarlo libremente.

---

# 👨‍💻 Autor

Desarrollado por Brian Alvernas Morales  
📧 Contacto: [Mi Portfolio](https://brianalvernas.vercel.app/index_es.html)  
🌐 Proyecto personal orientado a la productividad y desarrollo front-end.

---
