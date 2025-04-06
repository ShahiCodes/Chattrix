
# 💬 Chattrix – Real-Time Chat App

Chattrix is a **full-stack real-time chat application** built with the powerful **MERN stack** and enhanced with **Socket.io**, **TailwindCSS**, **DaisyUI**, and **Zustand** for state management. It allows users to communicate **one-to-one**, share **images**, track **online user status**, and personalize their experience with **32 dynamic background themes**.

---

## ✨ Features

- ✅ **JWT-based Authentication & Authorization**
- 📸 **Real-Time Image and Text Messaging**
- 🟢 **Live Online User Status**
- 🎨 **32 Background Themes** to choose from
- 🧑‍🎨 **Profile Image Upload & Update**
- 🚀 **Deployed on Render**
- 🗃️ **Global State Management with Zustand**
- 📡 **Powered by Socket.io for instant communication**
- 🛡️ **Robust Error Handling** on both client & server sides

---

## 🧠 Tech Stack

### 🔗 **MERN Stack**

- **MongoDB** – NoSQL database used for storing users, messages, and media.
- **Express.js** – Handles the backend logic and RESTful APIs.
- **React.js** – Dynamic frontend UI framework with reusable components.
- **Node.js** – JavaScript runtime environment powering the server.

### 🌐 **Socket.io**
Enables **real-time bi-directional communication** between clients and the server for a seamless messaging experience.

### 🎨 **TailwindCSS + DaisyUI**
- TailwindCSS: Utility-first CSS framework for rapid UI development.
- DaisyUI: A Tailwind component library that adds beautiful, customizable components — fast.

### 🧠 **Zustand**
Lightweight, scalable global state management for React. Used here to handle app-wide data like user authentication and theme preferences.

### 🔐 **JWT (JSON Web Tokens)**
Used for secure user authentication and session management.

###🖼️ Cloudinary- 🆕 Image Hosting & Media Management

All user-uploaded profile photos and message images are handled via Cloudinary. This ensures:
Fast and reliable image delivery
Automatic optimization and resizing
Secure upload and access via signed URLs

---

## 📂 Folder Structure (Simplified)

```
Chattrix/
├── backend/              # Express server, DB models, auth & socket setup
├── frontend/             # React app with Zustand, themes, chat UI
│   ├── components/       # Navbar, chat window, message list, etc.
│   ├── lib/axios.js      # Axios instance for API calls
│   ├── store/            # Zustand stores (e.g., theme, auth)
│   ├── assets/           # Icons, images, etc.
│   └── ...
├── .env
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ShahiCodes/Chattrix.git
cd Chattrix
```

### 2. Set up environment variables

Create `.env` files in both `/backend` and `/frontend` directories:

#### backend/.env
```
PORT=5000
MONGO_URI=your-mongodb-connection
JWT_SECRET=your_jwt_secret
```

#### frontend/.env
```
VITE_API_URL=http://localhost:5000
```

### 3. Install dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 4. Start the app (dev mode)

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

---

## 🧪 Testing the App

- Register or log in with an account.
- Start a chat with another user.
- Try switching between different background themes.
- Upload a profile picture.
- Watch live user count update in real-time!

---

## 🔒 Security Notes

- Passwords are hashed using bcrypt.
- JWT tokens are securely stored and verified.
- Image uploads are validated.

---

## 🧰 Built With

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.io](https://socket.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [JWT](https://jwt.io/)

---

## 🌍 Live Demo

🟢 [Check it out here] [Chattrix](https://chattrix-w0kw.onrender.com)

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or PRs if you'd like to improve Chattrix.

---

## 📄 License

MIT License

---
