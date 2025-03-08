# PersewaanAPI
API for a rental system with authentication, product management, and Cloudinary integration for image storage.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary">
  <img src="https://img.shields.io/badge/Joi-25A162?style=for-the-badge&logo=buffer&logoColor=white" alt="Joi">
  <img src="https://img.shields.io/badge/SuperTest-FF4A00?style=for-the-badge&logo=jest&logoColor=white" alt="SuperTest">
  <img src="https://img.shields.io/badge/Bcrypt-4A90E2?style=for-the-badge&logo=auth0&logoColor=white" alt="Bcrypt">
  <img src="https://img.shields.io/badge/Dotenv-ECD53F?style=for-the-badge&logo=.env&logoColor=white" alt="Dotenv">
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white" alt="Nodemon">
  <img src="https://img.shields.io/badge/Multer-FF4500?style=for-the-badge&logo=upload&logoColor=white" alt="Multer">
  <img src="https://img.shields.io/badge/Sharp-00BFFF?style=for-the-badge&logo=adobephotoshop&logoColor=white" alt="Sharp">
  <img src="https://img.shields.io/badge/Winston-15AABF?style=for-the-badge&logo=logstash&logoColor=white" alt="Winston">
  <img src="https://img.shields.io/badge/UUID-FF69B4?style=for-the-badge&logo=vercel&logoColor=white" alt="UUID">
  <img src="https://img.shields.io/badge/Express--Rate--Limit-FF5733?style=for-the-badge&logo=security&logoColor=white" alt="Express Rate Limit">
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest">
</p>

## 📌 Features
- **Authentication**: User login and registration using bcrypt.
- **Product Management**: CRUD operations for rental items.
- **Cloudinary Integration**: Upload and manage images.
- **Data Validation**: Using Joi.
- **Security Features**: Rate limiting & password hashing.
- **Logging**: Using Winston for logging requests & errors.
- **API Testing**: Using Jest & SuperTest.

## 🚀 Technologies Used
- **Node.js + Express.js** (Backend framework)
- **Prisma** (ORM for MySQL)
- **Joi** (Input validation)
- **Cloudinary** (Image storage)
- **Multer + Sharp** (File upload & image processing)
- **Bcrypt** (Password hashing)
- **UUID** (Generate unique identifiers)
- **Winston** (Logging)
- **Express-Rate-Limit** (API security)
- **Dotenv** (Environment variable management)
- **Nodemon** (Development tool for auto-restart)
- **Jest + SuperTest** (API testing)

## 📥 Installation and Running the Server
1. Clone this repository:
   ```sh
   git clone https://github.com/jokosby123/PersewaanAPI.git
   cd PersewaanAPI
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the project root and fill it as follows:
   ```ini
   DATABASE_URL="mysql://root:@localhost:3306/PersewaanAPI"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```

4. Start the server:
   ```sh
   npm start
   ```
   or for development mode with nodemon:
   ```sh
   npm run demon
   ```

## 📄 API Endpoints

### 🔑 Authentication
| Method | Endpoint | Description |
|--------|------------------|------------------|
| POST   | `/register` | User registration |
| POST   | `/login` | User login |
| GET    | `/admin/check` | Check admin status |

### 🏢 Company Management
| Method | Endpoint | Description |
|--------|------------------------|------------------|
| POST   | `/admin/company/create` | Add a new company |
| PATCH  | `/admin/company/update` | Update company data |
| GET    | `/company` | Get company data |

### 🛍️ Model & Type Management
| Method | Endpoint | Description |
|--------|------------------------|------------------|
| POST   | `/admin/model/create` | Add a new model |
| PATCH  | `/admin/model/update/:id` | Update model |
| DELETE | `/admin/model/delete/:id` | Delete model |
| GET    | `/model` | Get all models |

| Method | Endpoint | Description |
|--------|------------------------|------------------|
| POST   | `/admin/type/create` | Add a new type |
| PATCH  | `/admin/type/update/:id` | Update type |
| DELETE | `/admin/type/delete/:id` | Delete type |
| GET    | `/type` | Get all types |

### 🎨 Color Management
| Method | Endpoint | Description |
|--------|------------------------|------------------|
| POST   | `/admin/tool/color/create` | Add color |
| PATCH  | `/admin/tool/color/update` | Update color |
| DELETE | `/admin/tool/color/delete/:id` | Delete color |
| GET    | `/colors` | Get all colors |

### 🛠️ Tool & Sub-tool Management
| Method | Endpoint | Description |
|--------|------------------------|------------------|
| POST   | `/admin/tool/create` | Add a new tool |
| PATCH  | `/admin/tool/update` | Update tool |
| DELETE | `/admin/tool/delete/:id` | Delete tool |
| GET    | `/tools` | Get all tools |

| Method | Endpoint | Description |
|--------|------------------------|------------------|
| POST   | `/admin/tool/sub/create` | Add a new sub-tool |
| PATCH  | `/admin/tool/sub/update` | Update sub-tool |
| DELETE | `/admin/tool/sub/delete/:id` | Delete sub-tool |
| GET    | `/subtools` | Get all sub-tools |

### 📰 News & Promotions Management
| Method | Endpoint | Description |
|--------|------------------------|------------------|
| POST   | `/admin/news/create` | Add a new news post |
| PATCH  | `/admin/news/update/:id` | Update news post |
| DELETE | `/admin/news/delete/:id` | Delete news post |
| GET    | `/news` | Get all news posts |

| Method | Endpoint | Description |
|--------|------------------------|------------------|
| POST   | `/admin/promo/create` | Add a new promotion |
| PATCH  | `/admin/promo/update/:id` | Update promotion |
| DELETE | `/admin/promo/delete/:id` | Delete promotion |
| GET    | `/promo` | Get all promotions |

## 🛠 Development & Contribution
1. Fork this repository.
2. Create a new branch (`git checkout -b your-feature`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to GitHub (`git push origin your-feature`).
5. Create a pull request.

## 📃 License
This project is licensed under the **MIT License**. Feel free to use and modify it as needed.

---
🔥 Created with ❤️ by **Joko Susilo**

