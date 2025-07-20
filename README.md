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
MONGO_URI=mongodb+srv://nasimwe:HDfE1maV1vgNbBYw@cluster0.io6q7di.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
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

### Create Category
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
  "_id": "...",
  "name": "Electronics",
  "description": "Electronic devices"
}
```

### Create Product
```http
POST /products
{
  "name": "iPhone 15",
  "category": "category_id_here",
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
