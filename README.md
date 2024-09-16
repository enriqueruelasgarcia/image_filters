Image Upload and Filter API
This is a full-stack application that allows users to upload images and apply different filters to them. The front-end is built with React JS, while the back-end is built with Node.js. Users can log in, upload images, apply filters, and download the modified images.

Features
User authentication (login/logout)
Upload images
Apply filters to uploaded images
Download images with applied filters
Filters supported: Grayscale, Sepia, Blur, Brightness, etc.
Technology Stack
Frontend: React JS
Backend: Node.js, Express
Database: MongoDB (or your preferred database)
Image Processing: HTML5 Canvas
Authentication: Cookies (for managing sessions)
Installation
Prerequisites
Node.js and npm installed
MongoDB installed and running
Git installed
Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install dependencies
Navigate to both the frontend and backend directories to install dependencies:

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
Set up environment variables
Create a .env file in the backend directory with the following content:

MONGO_URI=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret
Run the application
To start the application, run the following commands:

# Run the backend server
cd backend
npm run dev

# Run the frontend server
cd ../frontend
npm start
The application should now be running on http://localhost:3000 for the frontend and http://localhost:8000 for the backend.

API Endpoints
User Routes
POST /api/register: Register a new user.
POST /api/login: Log in a user.
POST /api/logout: Log out the current user.
Image Routes
POST /api/upload: Upload an image for the logged-in user.
GET /api/user-images/:userId: Get all images for the logged-in user.
Example Requests

Register User

POST /api/register
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}

Upload Image

POST /api/upload
Form Data:
- image: [image file]
- userId: [logged-in user's id]
Apply Filters
After uploading, filters can be applied through the frontend interface. Available filters include:

grayscale(100%)
sepia(100%)
blur(5px)
brightness(1.5)
Usage
Sign Up: Create an account using the registration form.
Login: Log in with your credentials.
Upload Image: Select an image to upload from your local storage.
Apply Filters: Choose from the available filters (grayscale, sepia, blur, brightness) and apply them to the image.
Download Image: Once you’re happy with the applied filter, download the filtered image.
Future Enhancements
Add more advanced image filters (e.g., contrast, invert colors).
Implement social sharing features for filtered images.
Allow users to store and manage collections of filtered images.
