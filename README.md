# Bandhan Cafe 🍽️

A full-stack React and Express application for managing a cafe's operations with TypeScript, MongoDB, and JWT authentication.

## 🚀 Features

- **Frontend**: React-based responsive user interface
- **Backend**: Express.js REST API with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based user authentication
- **Security**: Helmet, CORS, rate limiting
- **Production Ready**: Optimized for deployment on cloud platforms

## 📦 Installation

```bash
# Install dependencies with yarn
yarn install

# Copy environment variables
cp .env.example .env
# Edit .env with your actual values
```

## 🏃‍♂️ Development

```bash
# Start both client and server with hot reload
yarn dev

# Start only server
yarn dev:server

# Start only client
yarn dev:client
```

## 🏗️ Production Build

```bash
# Build both client and server
yarn build

# Build only client
yarn build:client

# Build only server
yarn build:server
```

## 🚀 Deployment

### Environment Variables

Create a `.env` file with the following variables:

```env
NODE_ENV=production
PORT=8000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bandhan-cafe
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CLIENT_URL=https://yourdomain.com
```

### Deploy to Production

```bash
# Build the application
yarn build

# Start the production server
yarn start
```

### Cloud Deployment Options

#### Vercel (Recommended for full-stack)

1. Connect your GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

#### Heroku

```bash
# Create heroku app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

#### Railway

1. Connect GitHub repo
2. Set environment variables
3. Deploy automatically

#### DigitalOcean App Platform

1. Connect repo
2. Configure build and run commands
3. Set environment variables
4. Deploy

## 📁 Project Structure

```
src/
├── client/              # React frontend
│   ├── index.html
│   ├── index.tsx
│   ├── components/
│   └── hooks/
├── server/              # Express backend
│   ├── index.ts         # Server configuration
│   ├── routes/          # API routes
│   ├── models/          # Database models
│   ├── middleware/      # Custom middleware
│   └── utils/           # Utility functions
└── index.ts             # Application entry point

public/                  # Built client assets
dist/                    # Compiled server code
```

## 🔧 Available Scripts

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `yarn dev`          | Start development with both client and server |
| `yarn dev:server`   | Start only Express server                     |
| `yarn dev:client`   | Start only React client                       |
| `yarn build`        | Build for production                          |
| `yarn build:client` | Build only client                             |
| `yarn build:server` | Build only server                             |
| `yarn start`        | Start production server                       |
| `yarn clean`        | Clean build files                             |
| `yarn type-check`   | Run TypeScript checks                         |

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Cafe Operations

- `GET /api/menu` - Get menu items
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript, Webpack
- **Backend**: Express.js, TypeScript, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, bcryptjs, express-rate-limit
- **Development**: Nodemon, Concurrently, Webpack Dev Server

## 📝 Environment Variables

| Variable         | Description               | Default               |
| ---------------- | ------------------------- | --------------------- |
| `NODE_ENV`       | Environment mode          | development           |
| `PORT`           | Server port               | 8000                  |
| `MONGODB_URI`    | MongoDB connection string | -                     |
| `JWT_SECRET`     | JWT signing secret        | -                     |
| `JWT_EXPIRES_IN` | JWT expiration time       | 7d                    |
| `CLIENT_URL`     | Frontend URL for CORS     | http://localhost:8000 |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checks
5. Submit a pull request

## 📄 License

ISC License

- `GET /api/health` - Health check
- `GET /api/cafe/menu` - Get menu items

## 🚀 Deployment

### Heroku

1. Create a Heroku app
2. Set build script in package.json:
   ```json
   "scripts": {
     "heroku-postbuild": "npm run build"
   }
   ```
3. Deploy:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`
3. For full-stack: Use Vercel's serverless functions

### Railway

1. Connect your GitHub repo
2. Railway auto-detects Node.js apps
3. Set build command: `npm run build`
4. Set start command: `npm start`

### DigitalOcean App Platform

1. Connect your repo
2. Set build command: `npm run build`
3. Set run command: `npm start`

### AWS

#### Elastic Beanstalk

1. Create EB environment
2. Use Node.js platform
3. Deploy with `eb deploy`

#### EC2

1. Launch EC2 instance
2. Install Node.js
3. Clone repo and run `npm install && npm run build && npm start`

## 🔒 Environment Variables

Create a `.env` file:

```env
NODE_ENV=production
PORT=8000
# Add your variables here
```

## 🛠️ Technologies

- **Frontend**: React, TypeScript
- **Backend**: Express.js, Node.js
- **Build**: Webpack, Babel
- **Security**: Helmet, CORS
- **Performance**: Compression

## 📝 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at:
# Frontend: http://localhost:3000 (webpack dev server)
# Backend API: http://localhost:8000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC License
