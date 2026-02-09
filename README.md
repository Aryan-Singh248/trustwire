# TrustWire  
## Blockchain-Based Digital Banking System

TrustWire is a full-stack blockchain-based digital banking system that enables
secure wallet management, validated peer-to-peer transactions, and transparent
transaction tracking using a custom blockchain ledger.

The system combines traditional banking logic with blockchain principles such as
immutability, hash chaining, and transaction transparency, all presented through
a modern web-based dashboard.

---

## 🚀 Features

- Digital wallets with balance management
- Secure fund transfer with balance validation
- Custom blockchain implementation
- Immutable transaction ledger
- Persistent blockchain storage using MongoDB
- Real-time blockchain explorer
- Modern, fintech-style user interface

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Custom Blockchain Engine
- SHA-based hashing

### Frontend
- React (Vite)
- Axios
- Modern CSS (dark UI, gradients)

---

## 🧱 System Architecture

The system follows a three-layer architecture:

Frontend (React UI)
│
▼
Backend (Node.js + Express)
│
▼
Database (MongoDB)


- The frontend communicates with the backend via REST APIs.
- The backend handles transaction validation and blockchain logic.
- MongoDB stores wallet data and persistent blockchain records.

---

## 🔄 Transaction Flow

1. User initiates a transaction from the frontend
2. Backend validates sender, receiver, and balance
3. Wallet balances are updated
4. A new block is created and linked to the blockchain
5. Blockchain is persisted to the database
6. UI updates in real time
7. Blockchain Explorer reflects the new block

---

## 📁 Project Structure
TrustWire/
└── trustwire-backend/
├── trustwire-frontend/
│ ├── src/
│ └── package.json
│
├── src/
│ ├── blockchain/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── package.json
└── README.md


---

## ▶️ How to Run the Project

### Backend
```bash
cd trustwire-backend
npm install
npm run dev

Frontend
cd trustwire-frontend
npm install
npm run dev


cd trustwire-frontend
npm install
npm run dev

🌐 API Endpoints
Method	Endpoint	Description
GET	/api/test	Fetch full blockchain
POST	/api/add	Perform a transaction
GET	/users	Fetch wallet balances
POST	/users/create	Create a new wallet

🔐 Security & Integrity

Each transaction is validated before block creation

Blockchain uses hash chaining to prevent tampering

Blockchain integrity is verified dynamically

Invalid or insufficient transactions are rejected

⚠️ Limitations

Single-node blockchain (no distributed consensus)

No cryptographic signatures

No authentication or authorization layer

Educational implementation (not production banking)

🔮 Future Enhancements

Distributed blockchain nodes

Digital signatures and key-based wallets

Authentication and role-based access

Smart contract support

Advanced blockchain explorer (search, filters)

Transaction analytics and reports