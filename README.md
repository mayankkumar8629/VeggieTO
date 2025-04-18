
# 🌾 VeggieTO — A MERN Stack Microservices Platform

AgriQuick is a full-stack microservices-based platform built using the MERN stack. It aims to streamline the entire farm-to-customer pipeline, inspired by quick commerce models like Blinkit. It features three major services:

1. **Customer Service** – A quick commerce interface for end consumers.
2. **Farmer/Manufacturer Service** – Allows farmers and manufacturers to list products and quantities.
3. **Logistics & Admin Service** – Handles warehouse management, product collection, delivery, and overall system orchestration.

## 🧩 Architecture Overview

This project is built using a **Microservices Architecture** with the following stack:

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Gateway**: API Gateway for routing requests to services
- **Communication**: REST APIs (optionally scalable to gRPC/RabbitMQ/Kafka in future)

---

## 📦 Services

### 1. 🛒 Customer Service
- Browse and search for products
- Real-time stock availability
- Place orders with fast delivery
- View order history

### 2. 🌱 Farmer/Manufacturer Service
- Farmer/manufacturer registration and login
- Add/list products with quantity and price
- Schedule logistics for pickup
- Track product status in the supply chain

### 3. 🚚 Logistics & Admin Service
- Admin dashboard for monitoring operations
- Manage product collection and warehouse inventory
- Schedule and manage deliveries
- Handle system-level operations and analytics

---

## 🚪 API Gateway

A centralized entry point for all external requests. Handles:
- Routing requests to correct service
- Basic authentication/authorization (if enabled)
- Request validation and error handling

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js & npm
- MongoDB
- Docker (optional, for containerization)

### Clone the repository

```bash
git clone https://github.com/yourusername/veggieTO.git

