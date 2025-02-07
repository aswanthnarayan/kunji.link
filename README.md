# Kunji.link

## Description
Developed a full-stack URL shortening application using React.js with user authentication, rate limiting (100 requests per 15 min), and click tracking. Built a responsive UI with Tailwind CSS and implemented a RESTful API with Node.js/Express, deployed on Vercel.

## Live Demo
Check out the live application at [Kunji.link Live](https://kunji-link.vercel.app/)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aswanthnarayan/kunji.link.git
   cd kunji.link
   ```
2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
3. Navigate to the frontend directory and install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```
4. Create a `.env` file in the server and client directories and add your environment variables.

## Usage
To run the application:
1. Start the backend server:
   ```bash
   npm run dev --prefix server
   ```
2. In another terminal, start the frontend:
   ```bash
   npm start --prefix client
   ```
3. Access the application at `http://localhost:3000`.

## Scripts
- **start**: Runs the backend server.
- **dev**: Uses nodemon to run the backend server with auto-reload.
- **client**: Runs the frontend server.
- **client:build**: Builds the frontend for production.

## Dependencies
- **bcryptjs**: For password hashing.
- **cors**: Middleware for enabling CORS.
- **dotenv**: For environment variable management.
- **express**: Web framework for Node.js.
- **express-rate-limit**: Middleware for rate limiting.
- **jsonwebtoken**: For implementing JWT authentication.
- **mongoose**: MongoDB object modeling tool.
- **nanoid**: For generating unique IDs.
