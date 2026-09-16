# 🎟️ Ticket-Nova Concurrent Booking Engine (Backend)

**Duration:** Aug 2025 – Sep 2025  

A high-performance backend booking system designed to handle **concurrent seat reservations at scale**, ensuring data consistency, fairness, and reliability under heavy load.

---

## 🚀 Features

### 🔒 Concurrency & Consistency
- **Atomic Distributed Locking** using Redis Lua scripts  
  - Prevents double bookings and race conditions across distributed systems
- **PostgreSQL Transactions**
  - Row-level locking
  - Serializable isolation level to ensure strict consistency

---

### ⚡ Rate Limiting & Abuse Protection
- Implemented **rate limiting via Redis Lua scripts**
- Protects booking endpoints from abuse and ensures fair usage

---

### 🔍 Advanced Search
- **Full-Text Search (FTS)** using PostgreSQL
- GIN indexing with SQL triggers for:
  - Fast and scalable querying
  - Efficient search across bookings and user data

---

### 🔐 Authentication & Authorization
- **JWT-based Authentication**
  - Rotating Access & Refresh Tokens
- **Role-Based Access Control (RBAC)**
- Account suspension handling for restricted users

---

### 🪑 Booking System Enhancements
- Bulk seat generation for events
- Strong consistency guarantees during high-concurrency bookings

---

### 📊 Optimized Data Fetching
- Implemented **Offset-based Pagination**
- Used **"Limit + 1" technique** to efficiently detect next page availability

---

## 🛠️ Tech Stack

- **Backend:** Node.js / Express (or your backend framework)
- **Database:** PostgreSQL
- **Cache & Locking:** Redis (Lua scripting)
- **Authentication:** JWT
- **Search:** PostgreSQL Full-Text Search (GIN Index)

---

## ⚙️ Key Design Highlights

- Designed for **high concurrency environments**
- Eliminates **race conditions** at both application and database level
- Uses **atomic operations in Redis** for distributed coordination
- Ensures **data integrity with strict SQL isolation levels**

---

## 📌 Use Cases

- Event ticket booking platforms  
- Movie/concert seat reservation systems  
- Any system requiring **real-time concurrent resource allocation**

---

## 🧠 Learnings & Highlights

- Deep understanding of **distributed locking**
- Handling **race conditions in real-world systems**
- Efficient **query optimization using indexing & FTS**
- Designing **scalable and fault-tolerant backend systems**

---

## 📬 Contact

Feel free to reach out for collaboration or questions!
