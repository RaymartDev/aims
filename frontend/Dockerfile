# Frontend Dockerfile
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the frontend code
COPY . .

# Build the frontend for production
RUN npm run build

# Install a lightweight HTTP server to serve static files
RUN npm install -g serve

# Expose the port that the HTTP server will use
EXPOSE 3000

# Command to serve the frontend build
CMD ["serve", "-s", "dist", "-l", "3000"]
