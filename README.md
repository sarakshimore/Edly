# 🏫 Edly: E-Learning Platform

**Edly** is a full-stack MERN-based e-learning platform that enables **instructors** to create and manage online courses and **students** to enroll, learn through video lectures, and earn digital certificates upon completion.

---

## Features

### 👩‍🏫 For Instructors
- Create, edit, and publish courses with video lectures and thumbnails.
- Manage course content, pricing, and visibility.
- Access a personalized dashboard to monitor courses and learners.

### 🎓 For Students
- Browse and filter courses by category, price, and difficulty level.
- Purchase courses securely and access them anytime.
- Track learning progress and earn **auto-generated digital certificates** with QR-based verification.

### ⚙️ System Features
- Secure **JWT-based authentication** and **role-based access control**.
- Dynamic course search and multi-category filtering.
- Certificate generation and verification stored in MongoDB.
- Fully responsive, modern UI built with **ShadCN UI** and **TailwindCSS**.
- Real-time notifications and toast alerts for user feedback.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Redux Toolkit** with RTK Query
- **TailwindCSS**
- **ShadCN UI**
- **React Router DOM**

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **Multer** for file uploads

---

## 📂 Project Structure

```
Edly/
│
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Redux slices and APIs
│   │   ├── pages/         # Application pages
│   │   ├── App.jsx        # Main app entry point
│   │   └── main.jsx       # React DOM render
│   └── package.json
│
├── server/                # Backend (Node + Express)
│   ├── controllers/       # Controller logic
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── middlewares/       # Auth middleware
│   ├── utils/             # Helper utilities
│   ├── index.js           # Server entry point
│   └── package.json
│
└── README.md
```

---

## ⚡ Installation and Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sarakshimore/Edly
```

### 2️⃣ Backend setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder and add:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Then start the server:
```bash
npm run dev
```

### 3️⃣ Frontend setup
```bash
cd client
npm install
npm run dev
```

---

## 📈 Future Enhancements

- Add course reviews and ratings.
- Include AI-based course recommendations.

---

## 👨‍💻 Author

**Sarakshi More**  
Fullstack Developer | Mobile App Developer
🌐 GitHub: [github.com/sarakshimore](https://github.com/sarakshimore)

---

## 📸 Screenshots

<img width="1311" height="906" alt="Screenshot 2025-04-16 230126" src="https://github.com/user-attachments/assets/cba83f72-6dc8-4ebd-b575-6ed5bdb5880b" />
<img width="1621" height="913" alt="Screenshot 2025-04-16 230533" src="https://github.com/user-attachments/assets/617e8b62-90c6-46fc-9c0e-889d48b454f5" />
<img width="1314" height="568" alt="Screenshot 2025-04-16 230226" src="https://github.com/user-attachments/assets/80ab50d7-dc98-4e4d-b400-bece07890951" />
<img width="1645" height="851" alt="Screenshot 2025-04-16 231033" src="https://github.com/user-attachments/assets/ce7e4988-7432-4816-9db1-ad5f9d83dc9a" />
<img width="1651" height="917" alt="Screenshot 2025-04-16 231147" src="https://github.com/user-attachments/assets/55b36220-06cb-4499-83b9-b70980f92191" />
<img width="1653" height="652" alt="Screenshot 2025-04-16 231101" src="https://github.com/user-attachments/assets/8fba2a42-bbc3-4024-96ef-3974f9bdfb8a" />
<img width="1627" height="797" alt="Screenshot 2025-04-16 231402" src="https://github.com/user-attachments/assets/7e300441-c7ac-42d8-8226-311d2376f262" />
<img width="1344" height="919" alt="Screenshot 2025-04-16 231607" src="https://github.com/user-attachments/assets/9c3e3e38-4eac-4df2-b915-332e4610fe9e" />
<img width="1574" height="1020" alt="Screenshot 2025-04-10 201327" src="https://github.com/user-attachments/assets/4edefb46-ba91-45ed-b25b-b44c62576ede" />
<img width="1138" height="846" alt="Screenshot 2025-04-10 200840" src="https://github.com/user-attachments/assets/190e74d2-2dea-4fff-86f9-1311c15f6a74" />

---

⭐ **If you like this project, don’t forget to star the repository!**
