# Agent App with File Upload Functionality

This application includes a React frontend and Express backend with file upload capabilities.

## Features

- React frontend with a clean UI
- Express backend for handling file uploads
- File upload functionality in the "Create a new proposal" section

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

You can run both the frontend and backend concurrently with:

```
npm run dev
```

This will start:
- React frontend on http://localhost:3000
- Express backend on http://localhost:5000

## Backend API Endpoints

### File Upload

- **URL**: `/api/upload`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Request Body**: Form data with a file field named 'file'
- **Response**: JSON object with file information
  ```json
  {
    "message": "File uploaded successfully",
    "file": {
      "filename": "file-1234567890.jpg",
      "originalname": "example.jpg",
      "mimetype": "image/jpeg",
      "size": 12345,
      "path": "/uploads/file-1234567890.jpg"
    }
  }
  ```

## File Storage

Uploaded files are stored in the `public/uploads` directory and can be accessed via `/uploads/filename`.
