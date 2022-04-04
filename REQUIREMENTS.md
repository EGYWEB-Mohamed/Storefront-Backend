# API and Database Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

**_Table of Contents_**

- [API and Database Requirements](#api-and-database-requirements)
  - [API Endpoints](#api-endpoints)
    - [Products](#products)
    - [Users](#users)
    - [Orders](#orders)
  - [Data Schema](#data-schema)
    - [Products Schema](#products-schema)
    - [Users Schema](#users-schema)
    - [Orders Schema](#orders-schema)

## API Endpoints

### Products

- Index

  - HTTP verb `GET`
  - Endpoint:- `/api/products`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of Products Objects`

    ```json
    {
      "id": 1,
      "title": "Test Title Product",
      "price": "8.00"
    }
    ```

- Show

  - HTTP verb `GET`
  - Endpoint:- `/api/products/:id` - **id of the product to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Product object`

    ```json
    {
      "id": 1,
      "title": "Test Title Product",
      "price": "8.00"
    }
    ```

- Create **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `/api/products`
  - Request Body

    ```json
    {
      "title": "Test Title",
      "price": 5
    }
    ```

  - Response Body -- `User object`

    ```json
    {
      "id": 3,
      "title": "Test Title",
      "price": "5.00"
    }
    ```

- Delete **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- `/api/products/:id` - **id of the product to be deleted**
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Deleted Product Message`

    ```text
    Product Deleted Successfully
    ```

- Edit **`token required`**

  - HTTP verb `PUT`
  - Endpoint:- `/api/products/:id`
  - Request Body

    ```json
    {
      "title": "Test Product",
      "price": 9.99
    }
    ```

  - Response Body -- `Updated Product object`

    ```json
    {
      "id": 1,
      "title": "Test Product",
      "price": "9.99"
    }
    ```

- **[OPTIONAL]** Top 5 most popular products
- **[OPTIONAL]** Products by category (args: product category)

### Users

- Index - **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/api/users/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of User objects`

    ```json
    {
      "id": 1,
      "username": "fwd",
      "fullname": "Mohamed Saied"
    }
    ```

- Show **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/api/users/:id` - **id of the user to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `User object`

    ```json
    {
      "id": 1,
      "username": "fwd",
      "fullname": "Mohamed Saied"
    }
    ```

- Create **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `/api/users`
  - Request Body

    ```json
    {
      "username": "FWD-2",
      "password": "123456789",
      "fullname": "Ahmed Said"
    }
    ```

  - Response Body -- `User object`

    ```text
    JWT-Token
    ```

- Delete **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- `/api/users/:id` - **id of the user to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted User Message`

    ```text
    User Deleted Successfully
    ```

- Edit **`token required`**

  - HTTP verb `PATCH`
  - Endpoint:- `/api/users/:id`
  - Request Body

    ```json
    {
      "username": "FWD-2",
      "password": "0123456789",
      "fullname": "Ahmed Said "
    }
    ```

  - Response Body -- `Updated User object`

    ```text
    JWT-Token
    ```

### Authenticate

- Login

  - HTTP verb `POST`
  - Endpoint:- `/api/login`
  - Request Body

    ```json
    {
      "username": "FWD-2",
      "password": "0123456789"
    }
    ```

  - Response Body -- `User object & Token`

    ```json
    {
      "token": "....",
      "user": {
        "id": 3,
        "username": "FWD-2",
        "password": "$2b$10$hCrcs/rWZRf2YzTjbviL4e96sJTISjlAJD.dVWCTd5I4P1DIrj0Si",
        "fullname": "Ahmed Said "
      }
    }
    ```

- Register

  - HTTP verb `POST`
  - Endpoint:- `/api/register`
  - Request Body

    ```json
    {
      "username": "fwd",
      "password": "123456",
      "fullname": "Mohamed Saied"
    }
    ```

  - Response Body -- `User Token Text`

    ```text
    JWT-Token
    ```

### Orders

- Index - **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/api/orders`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of order objects & Product & User Details`

    ```json
    [
      {
        "id": 1,
        "product_id": 1,
        "title": "Test Product",
        "unit_price": "9.99",
        "user_id": 1,
        "fullname": "Mohamed Saied",
        "quantity": 1,
        "total_price": "9.99"
      }
    ]
    ```

- Show - **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/api/orders/:id` - **id of the order to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Order object`

    ```json
    {
      "id": 1,
      "product_id": 1,
      "title": "Test Product",
      "unit_price": "9.99",
      "user_id": 1,
      "fullname": "Mohamed Saied",
      "quantity": 1,
      "total_price": "9.99"
    }
    ```

- Create **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `/api/orders`
  - Request Body

    ```json
    {
      "product_id": 1,
      "quantity": 3,
      "user_id": 1
    }
    ```

  - Response Body -- `Order object`

    ```json
    {
      "id": 4,
      "product_id": 1,
      "quantity": 3,
      "user_id": 1
    }
    ```

- Delete **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- `/api/orders/:id` - **id of the order to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted Order Message`

    ```text
    Order Deleted Successfully
    ```

- Edit **`token required`**

  - HTTP verb `PUT`
  - Endpoint:- `/api/orders/:id`
  - Request Body

    ```json
    {
      "product_id": 1,
      "quantity": 1,
      "user_id": 1
    }
    ```

  - Response Body -- `Updated Order object`

    ```json
    {
      "id": 1,
      "product_id": 1,
      "title": "Test Product",
      "unit_price": "9.99",
      "user_id": 1,
      "fullname": "Mohamed Saied",
      "quantity": 7,
      "total_price": "69.93"
    }
    ```

- [OPTIONAL] Completed Orders by user [args: user id](token required)