# Food delivery app

A high-performance food delivery app, created using React, Fastify, and React Native. Enjoy a seamless user experience on both web and mobile platforms, featuring quick order placement, real-time tracking, and personalized recommendations for a hassle-free dining experience.

## 🔑 Before we start...

You need to create a .env file in the backend folder !

Like for example:

```bash
# .env
DATABASE_URL="file:./dev.db"
JWT_SECRET="segredo123secreto"

```

## ❓ How to Start ?

```bash

$ git clone https://github.com/hicham-elkamouni/food-delivery-app.git

```

```bash
# Install the dependencies
$ cd backend/ #to enter the backend folder

$ npm i #to install the back dependencies

$ cd .. #to exit the backend folder

$ cd frontend/ #to exit the backend folder

$ npm i #to install the front dependencies

# Run the back end
$ npm run dev

# Run the front end
$ npm run dev
```

# THE FOOD FUNCTIONS

### RFs (Functional requirements)

- [x] CRUD of users;
- [x] CRUD of products;
- [x] cart CRUD;
- [x] It must be possible to authenticate;
- [x] It must be possible to obtain the profile of a logged in user;
- [ ] You must have two types of user (Admin and standard)

### RNs (Business Rules)

- [x] The user can have a cart
- [x] The user can manipulate products in the cart
- [x] The admin user can manipulate products
- [x] The logged in user can add a photo
- [x] Logged in user edit product photo

### RNFs (Non-Functional Requirements)

- [x] The user's password must be encrypted;
- [x] The user must be identified by a JWT (JSON Web Token);
- [ ] Product pagination

# Frontend Routes

- /hello-world (public)
- /login (public)
- /menu (private)
- /profile (private)
- /cart (private)
- /admin-product (private)

# BackEnd Routes

Private routes need the login token in the header, and several of the routes need a body (see the code or postman).

## Hello World

- /hello-world (GET) (public)

## Public

- /login (POST)
- /user (CREATE)
- /uploads/imageId (GET)

## Image up

- /upload (POST) (private)
- /uploadToProduct/:id (POST) (private)

## Users

- /users (GET) (private)
- /user/:id (GET) (private)
- /user/:id (PUT) (private)
- /user/:id (DELETE) (private)

## Products

- /product/:id (GET) (private)
- /product (POST) (private)
- /products (GET) (private)
- /product/:id (PUT) (private)
- /product/:id (DELETE) (private)

## Cart

- /cart/:id (GET) (private)
- /cart (POST) (private)
- /cart (PUT) (private)
- /cart (DELETE) (private)
