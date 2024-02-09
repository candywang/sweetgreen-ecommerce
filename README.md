# Sweetgreen-Inspired E-commerce Application

## Description

This application is a simple e-commerce platform inspired by Sweetgreen's website. It features a streamlined user experience for viewing a restaurant's menu, managing a shopping cart, and checking out. The application includes five main pages: Home, Locations, Ordering, Checkout, and an Error page, with a persistent header component across pages.

## Built With React + Vite

For more about Vite and its React setup: [Vite React Guide](https://vitejs.dev/guide/)

## Features

- **Home Page**: Displays call-to-action buttons based on the application state.
- **Locations Page**: Lists Sweetgreen locations for users to select from, navigating them to the ordering page upon selection.
- **Ordering Page**: Shows menu items available at the selected location.
- **Shopping Cart**: Users can add, remove, or delete items, adhering to a maximum limit set by each store.
- **Checkout Page**: Displays all items in the cart with quantities and a subtotal.

## Requirements

- Node.js version 18+ (Some templates may require Node.js version 20+; please upgrade if your package manager warns about it).

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <project-directory>
npm run dev # or yarn run dev
```

After running the `npm run dev` or `yarn run dev` command, the Vite development server will start. Upon successful startup, server address where the application is running will be displayed `http://localhost:3000` in the terminal. Open this URL in your web browser to view the application in local development mode.

Please note, the exact port number (`3000` in this example) may vary if that port is already in use on your machine; Vite will automatically choose an available port and inform you of the actual URL to use.
