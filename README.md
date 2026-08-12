# ShopEase

A full-stack e-commerce demo built with React, Vite, Node.js, Express, and MySQL. It includes a customer storefront, user accounts, cart and orders, plus an administrator dashboard for products and order status.

## Features

- Browse, search, and filter products
- Register, sign in, update a profile, and manage a shopping cart
- Place orders and review order history
- Administrator dashboard for product creation, editing, stock status, deletion, and order updates
- Client- and server-side validation for accounts and product data
- Responsive storefront, admin interface, and footer

## Tech stack

- Frontend: React, React Router, Vite
- Backend: Node.js, Express
- Database: MySQL
- Authentication: JSON Web Tokens (JWT)
- Uploads: Multer

## Requirements

- Node.js 18 or newer
- MySQL 8 or newer

## Local setup

1. Clone the repository and install dependencies.

   ```bash
   git clone <your-repository-url>
   cd node_ecommerce
   npm install
   cd client
   npm install
   cd ..
   ```

2. Create a MySQL database named `ecommerce`.

   ```sql
   CREATE DATABASE ecommerce;
   ```

   Optionally import `schema.sql` to add the sample products.

3. Configure the database and JWT values. Set these environment variables in your terminal or hosting provider:

   ```text
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=ecommerce
   JWT_SECRET=replace_with_a_long_random_secret
   ```

   `.env.example` is included as a reference. Do not upload your real `.env` file or production secrets.

4. Start the backend and frontend in separate terminals.

   ```bash
   # Terminal 1, from the project root
   node server.js
   ```

   ```bash
   # Terminal 2
   cd client
   npm run dev
   ```

5. Open the URL Vite prints in the terminal (normally `http://localhost:5173`).

## Demo admin account

The backend seeds this account after it successfully connects to an empty database:

```text
Email: admin@shopease.com
Password: admin123
```

Use it at `/login`, then open `/admin`. These credentials are intentionally public for this demo only. Replace them and use a strong `JWT_SECRET` before deploying a real store.

## Useful commands

```bash
# Build the frontend for production
cd client
npm run build

# Run frontend linting
npm run lint
```

## Repository notes

- `uploads/` is used for product images at runtime. New uploads are ignored by Git; `uploads/.gitkeep` preserves the folder.
- `node_modules/`, generated frontend builds, local environment files, and logs are excluded through `.gitignore`.
