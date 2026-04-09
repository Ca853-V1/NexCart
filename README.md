# NexCart -

## Objective:
This project is a **full-stack e-commerce platform** that allows sellers to manage products and customers to browse, purchase and track orders while supporting role-based authentication and PDF receipt generation. It is built using the **MERN stack** and containerized using **Docker**.

## Tech Stack:
- **Frontend:** React (Vite), TailwindCSS
- **Backend:** Node.js, Typescript
- **Database:** MongoDB Compass
- **Authentication:** JWT, bcrypt, Zod
- **DevOps:** Docker
---
## Features:
### Seller:
- Add new products
- View all available products
- Update their own products
- Delete their own products.

### Customer:
- Browse product catalog with dynamic product search
- Add items to cart
- Remove items from cart
- Checkout products
- View order history
- Download PDF receipt for orders
---
## Project Structure:
```
NexCart
│
├── client
│   ├── Components
│   │   ├── Appbar.tsx
│   │   ├── CreateProduct.tsx
│   │   ├── CustomerCart.tsx
│   │   ├── CustomerCartProduct.tsx
│   │   ├── CustomerProductCard.tsx
│   │   ├── Home.tsx
│   │   ├── HomeProductCard.tsx
│   │   ├── Login.tsx
│   │   ├── ProductCard.tsx
│   │   ├── SectionImage.tsx
│   │   ├── SellerProducts.tsx
│   │   ├── Signup.tsx
│   │   ├── Toggle.tsx
│   │   ├── UpdateProduct.tsx
│   │   └── ViewProduct.tsx
│   ├── App.tsx
│   ├── dockerfile
│   ├── package.json
│
├── server
│   ├── apis
│   │   ├── customer.ts
│   │   └── seller.ts
│   ├── database
│   │   └── db.ts
│   ├── middleware
│   │   ├── cust_auth.ts
│   │   └── seller_auth.ts
│   ├── index.ts
│   ├── dockerfile
│   ├── package.json
│
├── docker-compose.yaml
├── README.md
```
---
## Installation & Setup:
### 1) Clone the repository:
```
git clone 
cd nexcart
```

### 2) Backend Setup:
#### (a) Navigate to server folder and install dependencies:
```
cd server
npm install
```
#### (b) Create `.env` file:
```
PORT=3000
JWT_SECRET_SELLER=your_secret_key
JWT_SECRET_CUSTOMER=your_secret_key
MONGO_URL=your_mongodb_connection
```
#### (c) Run backend:
```
npm run start
```

### 3) Frontend Setup:
#### (a) Navigate to root folder and install dependencies:
```
cd nexcart
npm install
```
#### (b) Create `.env` file:
```
VITE_BACKEND_URL=http://localhost:3000
```
#### (c) Run frontend:
```
npm run dev
```

### 4) Running with Docker:
#### From the root folder, run:
```
docker-compose up --build
```
#### This will start frontend, backend and mongoDB container (configure it).
---
## Future Scope:
- Add product reviews and ratings
- Seller analytics dashboard with insights on product sales, remaining inventory and profit metrics
- Advanced product sorting (price, newest listings, popularity).
---
## Screenshots for reference:
![Home](/public/reference/1.png)
![Latest Products](/public/reference/2.png)
![Product Details](/public/reference/3.png)
![Signup in Dark Theme](/public/reference/4.png)
![Customer Catalog in Dark Theme](/public/reference/5.png)
![Customer Cart](/public/reference/6.png)
![Order Receipt](/public/reference/7.png)
![Add Product](/public/reference/8.png)
![View Seller Products](/public/reference/9.png)
![Update Product](/public/reference/10.png)