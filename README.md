# Node.js + MySQL REST API

This is a simple REST API built with **Node.js**, **Express.js**, and **MySQL**. It provides endpoints for managing words in a MySQL database.

## Features

- CRUD operations for managing words.
- Environment variable support using `dotenv`.
- MySQL database integration.
- Automatic database table creation on service startup.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MySQL](https://www.mysql.com/) database

## Project Setup

### 1. Clone the Repository

```sh
git clone <repository_url>
cd node-mysql-api
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=word_database
PORT=3000
```

Ensure your MySQL server is running and replace the values as needed.

### 4. Start the Server

```sh
node index.js
```

The server should now be running on `http://localhost:3000`.

## API Endpoints

### 1. Get All Words

**GET** `/api/words`

### 2. Get a Word by ID

**GET** `/api/words/:id`

### 3. Create a Word

**POST** `/api/words`

- Body: `{ "word": "example" }`

### 4. Update a Word

**PUT** `/api/words/:id`

- Body: `{ "word": "updated_value" }`

### 5. Delete a Word

**DELETE** `/api/words/:id`

### 6. Health Check

**GET** `/health`

## Database Setup

### Automatic Table Creation
The service automatically creates the `words` table if it does not exist when the server starts.

### Manual Database Setup (Optional)
If you prefer to manually set up the database:

1. Log in to MySQL:
   ```sh
   mysql -u root -p
   ```
2. Create the database:
   ```sql
   CREATE DATABASE word_database;
   ```
3. Select the database:
   ```sql
   USE word_database;
   ```
4. Create the table:
   ```sql
   CREATE TABLE words (
       id INT AUTO_INCREMENT PRIMARY KEY,
       word VARCHAR(255) NOT NULL
   );
   ```

## Local Development

### Run Mysql

```
docker run --name mysql-container \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=word_database \
  -e MYSQL_USER=myuser \
  -e MYSQL_PASSWORD=mypassword \
  -p 3306:3306 -d mysql:latest
```

### Create Docker image for project
```
docker build -t node-javascript-mysql-demo .
```

### Run Docker image
```
docker run -p 3000:3000 node-javascript-mysql-demo -e DB_HOST=localhost -e DB_USER=root -e MYSQL_ROOT_PASSWORD=password
```
