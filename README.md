# TrustWire  
### Blockchain-Based Digital Banking System

![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React%20(Vite)-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📌 Live Demo
- **Frontend:** https://trustwire-frontend.onrender.com  
- **Backend API:** https://trustwire.onrender.com/api/test  

---

## 📖 Overview

TrustWire is a full-stack blockchain-based digital banking system that enables
secure wallet management, validated peer-to-peer transactions, and transparent
transaction tracking using a custom-built blockchain ledger.

The system combines traditional banking logic with blockchain principles such as
immutability, hash chaining, and transaction transparency, delivered through a
modern fintech-style web dashboard.

---

## 🚀 Features

- Digital wallets with balance management  
- Secure fund transfers with balance validation  
- Custom blockchain implementation  
- Immutable transaction ledger  
- Persistent blockchain storage using MongoDB  
- Real-time blockchain explorer  
- Modern dark-themed UI  

---

## 🛠 Tech Stack

### Backend
- Node.js  
- Express.js  
- MongoDB Atlas  
- Custom Blockchain Engine  

### Frontend
- React (Vite)  
- Axios  
- Modern CSS (gradients & glassmorphism)  

---

## 🧱 System Architecture

Frontend (React UI)  
↓  
Backend (Node.js + Express REST APIs)  
↓  
Database (MongoDB Atlas)

---

## 🔄 Transaction Flow

1. User initiates a transaction from the frontend  
2. Backend validates sender, receiver, and balance  
3. Wallet balances are updated atomically  
4. A new block is created and linked to the blockchain  
5. Blockchain is persisted to MongoDB  
6. UI updates in real time  
7. Blockchain Explorer reflects the new block  

---

## 📁 Project Structure

```text
TrustWire/
├── README.md
├── screenshots/
├── trustwire-backend/
│   ├── src/
│   │   ├── blockchain/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
└── trustwire-frontend/
    ├── src/
    ├── public/
    └── package.json
```

---

## 🚀 Deployment (Render)

### Backend (Web Service)

- Runtime: Node.js  
- Root Directory: `trustwire-backend`  
- Build Command:
```bash
npm install
```
- Start Command:
```bash
node src/server.js
```

**Environment Variables**
- `PORT=10000`  
- `MONGO_URI=<MongoDB Atlas URI>`  

**Backend URL**
```
https://trustwire.onrender.com
```

---

### Frontend (Static Site)

- Root Directory: `trustwire-frontend`  
- Build Command:
```bash
npm install && npm run build
```
- Publish Directory:
```text
dist
```

**Environment Variable**
```
VITE_API_URL=https://trustwire.onrender.com
```

---

## 🧪 Local Development (Optional)

### Backend
```bash
cd trustwire-backend
npm install
npm run dev
```
Runs on: http://localhost:5001  

### Frontend
```bash
cd trustwire-frontend
npm install
npm run dev
```
Runs on: http://localhost:5173  

---

## 🌐 API Endpoints

| Method | Endpoint      | Description               |
|------|---------------|---------------------------|
| GET  | /api/test     | Fetch full blockchain     |
| POST | /api/add      | Perform a transaction     |
| GET  | /users        | Fetch wallet balances     |
| POST | /users/create | Create a new wallet       |

---

## 🔐 Security & Integrity

- Pre-transaction validation before block creation  
- Hash chaining ensures immutability  
- Blockchain integrity verified dynamically  
- Invalid or insufficient transactions are rejected  

---

## ⚠️ Limitations

- Single-node blockchain (no distributed consensus)  
- No cryptographic signatures  
- No authentication or authorization  
- Educational prototype (not production banking)  

---

## 🔮 Future Enhancements

- Distributed blockchain nodes  
- Digital signatures and key-based wallets  
- Authentication and RBAC  
- Smart contracts  
- Advanced blockchain analytics  

---

## 📸 Screenshots

### Full Dashboard
![Dashboard](screenshots/Main%20TrustWire%20Dashboard.png)

### Wallets Before Transaction
![Wallet Before](screenshots/wallet-before-transaction.png)

### Wallets After Transaction
![Wallet After](screenshots/wallet-after-transaction.png)

### Transaction Success
![Transaction Success](screenshots/transaction-success-toast.png)

### Blockchain Explorer
![Blockchain Explorer](screenshots/Blockchain%20Explorer%20%E2%80%93%20Full%20View.png)

### Backend API Test
![API Test](screenshots/backend-api-test.png)

---

## 🧩 System Design Diagrams

### System Architecture Diagram
![System Architecture](screenshots/system-architecture.png)

### Transaction Sequence Diagram
![Transaction Sequence](screenshots/transaction-sequence-diagram.png)

---

## ✅ Project Status

**Fully deployed, functional, and production-ready on Render.**
