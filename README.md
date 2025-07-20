# Product Catalog API

A RESTful API for managing products and categories with MongoDB.

## Setup and Installation

### Prerequisites
- Node.js (v14+)
- MongoDB

### Installation
```bash
git clone <https://github.com/nasimwe/productCatalog.git>
cd productCatalog
npm install
```

### Environment Setup
Create `.env` file:
```env
MONGO_URI=https://cloud.mongodb.com/v2/6871386fb7c4706d5857a2e8#/metrics/replicaSet/6871392a8409ec58ceb4aa0c/explorer/test/categories/find
```

### Start Server
```bash
npm start
```
Server runs on `http://localhost:5000`

## API Endpoints

### Categories
- `GET /categories` - Get all categories
- `POST /categories` - Create category
- `GET /categories/:id` - Get category by ID
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Products
- `GET /products` - Get all products (supports `?name=` and `?category=` filters)
- `POST /products` - Create product
- `GET /products/low-stock` - Get low stock products (supports `?threshold=` parameter)
- `GET /products/:id` - Get product by ID
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## Request/Response Examples

### Categories

**GET /categories**
```http
GET /categories
```
Response (200):
```json
[
  {
    "_id": "60f7b1b9e1b2c3d4e5f6g7h8",
    "name": "Electronics",
    "description": "Electronic devices"
  }
]
```

**POST /categories**
```http
POST /categories
{
  "name": "Electronics",
  "description": "Electronic devices"
}
```
Response (201):
```json
{
  "_id": "60f7b1b9e1b2c3d4e5f6g7h8",
  "name": "Electronics",
  "description": "Electronic devices"
}
```

**GET /categories/:id**
```http
GET /categories/60f7b1b9e1b2c3d4e5f6g7h8
```
Response (200):
```json
{
  "_id": "60f7b1b9e1b2c3d4e5f6g7h8",
  "name": "Electronics",
  "description": "Electronic devices"
}
```
Response (404):
```json
{
  "message": "Category not found"
}
```

**PUT /categories/:id**
```http
PUT /categories/60f7b1b9e1b2c3d4e5f6g7h8
{
  "name": "Consumer Electronics",
  "description": "Updated description"
}
```
Response (200):
```json
{
  "_id": "60f7b1b9e1b2c3d4e5f6g7h8",
  "name": "Consumer Electronics",
  "description": "Updated description"
}
```

**DELETE /categories/:id**
```http
DELETE /categories/60f7b1b9e1b2c3d4e5f6g7h8
```
Response (200):
```json
{
  "message": "Category deleted"
}
```

### Products

**GET /products**
```http
GET /products
GET /products?name=iphone
GET /products?category=60f7b1b9e1b2c3d4e5f6g7h8
GET /products?name=iphone&category=60f7b1b9e1b2c3d4e5f6g7h8
```
Response (200):
```json
[
  {
    "_id": "60f7b1b9e1b2c3d4e5f6g7h9",
    "name": "iPhone 15",
    "category": {
      "_id": "60f7b1b9e1b2c3d4e5f6g7h8",
      "name": "Electronics"
    },
    "price": 999.99,
    "discountPercentage": 10,
    "variants": [
      {
        "size": "128GB",
        "color": "Blue",
        "price": 999.99,
        "quantity": 50
      }
    ],
    "createdAt": "2023-07-20T10:30:00.000Z"
  }
]
```

**POST /products**
```http
POST /products
{
  "name": "iPhone 15",
  "category": "60f7b1b9e1b2c3d4e5f6g7h8",
  "price": 999.99,
  "discountPercentage": 10,
  "variants": [
    {
      "size": "128GB",
      "color": "Blue",
      "price": 999.99,
      "quantity": 50
    }
  ]
}
```
Response (201):
```json
{
  "_id": "60f7b1b9e1b2c3d4e5f6g7h9",
  "name": "iPhone 15",
  "category": "60f7b1b9e1b2c3d4e5f6g7h8",
  "price": 999.99,
  "discountPercentage": 10,
  "variants": [
    {
      "size": "128GB",
      "color": "Blue",
      "price": 999.99,
      "quantity": 50,
      "_id": "60f7b1b9e1b2c3d4e5f6g7h0"
    }
  ],
  "createdAt": "2023-07-20T10:30:00.000Z"
}
```

**GET /products/low-stock**
```http
GET /products/low-stock
GET /products/low-stock?threshold=10
```
Response (200):
```json
[
  {
    "_id": "60f7b1b9e1b2c3d4e5f6g7h9",
    "name": "iPhone 15",
    "variants": [
      {
        "size": "256GB",
        "color": "Blue",
        "price": 1199.99,
        "quantity": 3
      }
    ]
  }
]
```

**GET /products/:id**
```http
GET /products/60f7b1b9e1b2c3d4e5f6g7h9
```
Response (200):
```json
{
  "_id": "60f7b1b9e1b2c3d4e5f6g7h9",
  "name": "iPhone 15",
  "category": {
    "_id": "60f7b1b9e1b2c3d4e5f6g7h8",
    "name": "Electronics"
  },
  "price": 999.99,
  "variants": [
    {
      "size": "128GB",
      "color": "Blue",
      "price": 999.99,
      "quantity": 50
    }
  ]
}
```
Response (404):
```json
{
  "message": "Product not found"
}
```

**PUT /products/:id**
```http
PUT /products/60f7b1b9e1b2c3d4e5f6g7h9
{
  "name": "iPhone 15 Pro",
  "price": 1199.99,
  "discountPercentage": 5
}
```
Response (200):
```json
{
  "_id": "60f7b1b9e1b2c3d4e5f6g7h9",
  "name": "iPhone 15 Pro",
  "price": 1199.99,
  "discountPercentage": 5,
  "variants": [
      {
        "size": "128GB",
        "color": "Blue",
        "price": 999.99,
        "quantity": 50
      }
    ],
  "createdAt": "2023-07-20T10:30:00.000Z"
}
```

**DELETE /products/:id**
```http
DELETE /products/60f7b1b9e1b2c3d4e5f6g7h9
```
Response (200):
```json
{
  "message": "Product deleted"
}
```

### Get Products with Filters
```http
GET /products?name=iphone&category=category_id
GET /products/low-stock?threshold=5
```

## Data Models

**Category:**
- `name` (String, required, unique)
- `description` (String)

**Product:**
- `name` (String, required)
- `category` (ObjectId, required)
- `price` (Number)
- `discountPercentage` (Number)
- `variants` (Array of: size, color, price, quantity)
- `createdAt` (Date)

## Status Codes
- 200: Success
- 201: Created
- 404: Not found
- 400: Bad request
- 500: Server error

## Assumptions and Limitations
- No authentication
- No image upload support
- Low stock based on any variant below threshold
