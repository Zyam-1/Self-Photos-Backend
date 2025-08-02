# 📁 Media Upload Backend

A secure Node.js backend service for uploading, storing, and serving media files with MongoDB integration and user authentication.

## ✨ Features

- **🔒 Secure File Uploads** - Uses Multer middleware for safe file handling
- **💾 Persistent Storage** - Files stored on disk with unique naming conventions
- **📊 MongoDB Integration** - Metadata stored in MongoDB with Mongoose ODM
- **🔐 Authentication Required** - All endpoints protected with JWT authentication
- **👤 User Isolation** - Users can only access their own uploaded media
- **📄 Pagination Support** - Efficient browsing of large media collections
- **🎯 TypeScript** - Full TypeScript support for better development experience
- **⚡ RESTful API** - Clean and intuitive API design


## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or remote)
- npm 

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd media-upload-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm start
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/media-db
JWT_SECRET=your_super_secret_jwt_key
BASE_URL=http://localhost:5000/api
```

## 📚 API Documentation

> **Note:** All endpoints require authentication. Include `Authorization: Bearer <jwt_token>` in headers.

### Upload Media Files

**Endpoint:** `POST /api/media/upload`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Body:**
- `files`: One or multiple media files (form-data)

**Response:**
```json
{
  "success": true,
  "message": "Files uploaded successfully",
  "data": {
    "media": [
      {
        "_id": "64a7b2c8d1e2f3g4h5i6j7k8",
        "fileName": "image_1691234567890.jpg",
        "filePath": "uploads/64a7b2c8d1e2f3g4h5i6j7k8_1691234567890.jpg",
        "fileType": "image/jpeg",
        "uploadedBy": "64a1b2c3d4e5f6g7h8i9j0k1",
        "createdAt": "2023-08-05T10:30:45.123Z"
      }
    ]
  }
}
```

### Get User's Media Collection

**Endpoint:** `GET /api/media`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 50)
- `sortBy` (optional): Sort field (default: 'createdAt')
- `sortOrder` (optional): 'asc' or 'desc' (default: 'desc')

**Response:**
```json
{
  "success": true,
  "data": {
    "media": [
      {
        "_id": "64a7b2c8d1e2f3g4h5i6j7k8",
        "fileName": "image_1691234567890.jpg",
        "fileType": "image/jpeg",
        "createdAt": "2023-08-05T10:30:45.123Z"
      }
    ],
  }
}
```

### Serve Individual Media File

**Endpoint:** `GET /api/media/:filename`

**Parameters:**
- `filename`: unique identifier of the media file

**Response:**
- Returns the actual file buffer with appropriate content-type headers
- Only accessible by the file owner

**Example:**
```bash
curl -H "Authorization: Bearer <jwt_token>" \
     http://localhost:5000/api/media/64a7b2c8d1e2f3g4h5i6j7k8
```

### Delete Media File

**Endpoint:** `DELETE /api/media/:fileId`

**Response:**
```json
{
  "success": true,
  "message": "Media file deleted successfully"
}
```

## 🔧 Configuration Options

### Multer Configuration
- **File Size Limit**: 5MB per file (configurable)
- **Allowed Types**: Images (jpg, jpeg, png, gif, webp)
- **Storage**: Disk storage with unique filenames
- **Naming Convention**: `Date.now().toString(36) + Math.random().toString(36).substr(2)-file.originalName}`

### Security Features
- **File Type Validation**: Only allows specified MIME types
- **Size Limits**: Prevents oversized file uploads
- **Path Sanitization**: Prevents directory traversal attacks
- **User Isolation**: Users can only access their own files
- **JWT Authentication**: Secure token-based authentication


## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript
- **File Upload**: Multer
- **Authentication**: JWT (JSON Web Tokens)
- **Environment**: dotenv
- **Validation**: zod

