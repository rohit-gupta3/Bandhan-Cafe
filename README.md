# Bandhan Cafe 🍽️

A full-stack React and Express application for managing a cafe's operations with TypeScript, Postgres with Supabase, and JWT authentication.

## 🚀 Features

- **Frontend**: React-based responsive user interface
- **Backend**: Express.js REST API with TypeScript
- **Database**: Postgres DB with Supabase
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
NODE_ENV=development
PORT=9000

VITE_SUPABASE_URL=supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_key
```

### Deploy to Production

```bash
# Build the application
yarn build

# Start the production server
yarn start
```

### Cloud Deployment Options

#### Vercel

1. Connect your GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

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

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript, Webpack
- **Backend**: Express.js, TypeScript, Node.js
- **Database**: Postgres with Supabase
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
