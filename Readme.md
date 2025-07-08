# SeeMo: Product Verification Blockchain Platform

## Demo: Link

## 1. Solution Overview

In today’s complex global market, ensuring product authenticity and supply chain transparency is more critical than ever. Counterfeit goods erode customer trust, damage brand reputation, and lead to significant revenue losses. **SeeMo**, our blockchain-based product verification platform, addresses this challenge by offering a **secure, decentralized, and verifiable** method to authenticate products using unique digital identifiers.

## What We Offer

SeeMo enables companies to register products on a tamper-proof blockchain network (built on **Cardano**). For each registered product, companies receive:

- A **unique product hash**
- A **blockchain transaction hash**
- A **QR code** that customers can scan to verify authenticity

The platform includes two main interfaces:

---

### 1. Company Interface

Built for manufacturers and brands, this interface allows companies to:

- Register a company profile
- Upload product data in **bulk** via CSV files
- Generate and manage **unique product hashes**
- Create QR codes linked to the on-chain transaction
- Monitor analytics for product scans and verifications

> 🔒 **Data Privacy Guarantee:**  
> No actual product data is ever transferred outside the company. Only the **final cryptographic hash** is submitted to the blockchain. Not even SeeMo stores or accesses sensitive product information.

---

### 2. Customer Interface

Designed for end-users, this intuitive interface allows:

- Scanning of product QR codes (web or mobile)
- Real-time verification of authenticity
- Access to **basic product transparency data** (origin, batch, timestamp)
  > _Note: Extended traceability features like supply chain tracking are part of future development._

---

## Why Blockchain?

SeeMo leverages the **Cardano** blockchain and integrates with the **Lace Wallet** to deliver:

- **Immutability** – Once recorded, product entries cannot be altered or deleted
- **Decentralization** – Trust is distributed across a public ledger, not centralized
- **Transparency** – Each verification event is permanently recorded and traceable
- **Data Security** – No product data is transmitted or stored—only cryptographic hashes
- **Zero Setup Overhead** – No specialized infrastructure or technical knowledge needed for onboarding

---

## ✅ Key Benefits

- **No sensitive product data ever leaves the company’s systems**
- **Tamper-proof and publicly verifiable QR codes**
- **Frictionless for both businesses and customers**
- **Easily integrates with existing production workflows**

---

## 🛠 Technical Setup Guide

To set up and run SeeMo locally, follow these steps carefully.

### 📁 Folder Structure

- `seemo-front` – Frontend application (Next.js)
- `seemo-tool` – Company-side CSV upload + hash generation tool
- `backend` – API server for handling hash submission and lookup

### ⚙️ Environment Variables

> ⚠️ **Important:**  
> You must create a `.env` file in root based on the provided `.env.example`.  
> Fill in the required credentials such as API keys, endpoints, ports, etc. **The app will not work without proper `.env` setup.**

---

### 🚀 Step-by-Step Setup

1. **Install dependencies**

````bash
cd seemo-front
npm install

cd ../seemo-tool
npm install

cd ../backend
npm install
````     

2. Run the applications

Frontend
````
cd seemo-front
npm run dev     # For development
# OR
npm run build && npm start   # For production
````

Tool (CSV + Hash)
````
cd ../seemo-tool
npm run dev
````
Backend API
````
cd ../backend
node server.mjs
````
