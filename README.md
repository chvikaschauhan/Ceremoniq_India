# Ceremoniq India

Ceremoniq India is a cultural gifting platform for discovering thoughtful gifts inspired by Indian traditions, regional craft, and meaningful occasions. Visitors can use a guided gift finder, explore a product collection, personalise packaging, manage a basket, and place an order.

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **API:** Express JSON endpoints for recommendations, products, packaging customisation, and orders

## Requirements

- Node.js 20.19 or newer (required by the installed Vite version)
- npm

## Local setup

Install the client and server dependencies in separate terminals (or run these commands one after the other from the repository root):

```bash
cd client
npm install
```

```bash
cd server
npm install
```

Create the server environment file from the sample:

```bash
cd server
cp .env.example .env
```

`PORT` is the only environment variable currently read by the server. The current API uses in-memory sample data and does not require a database connection. If database persistence is added later, put the connection string in `server/.env` (for example, `MONGO_URI`) and keep real credentials out of source control.

Start the API from the `server` directory:

```bash
npm run dev
```

Start the frontend in another terminal from the `client` directory:

```bash
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). Vite proxies `/api` requests to the API at `http://localhost:5000`. To run the API without nodemon, use `npm start` in `server`. Its health endpoint is `http://localhost:5000/api/health`.

## Project layout

```text
client/   React + Vite application and styling
server/   Express API, route handlers, and controllers
```

The main gifting flow is available from the shared navigation: Home, Gift finder, Catalog, Cart, and Checkout. The gift finder is part of the Home page; selecting a catalog item opens packaging customisation before it can be added to the cart.
