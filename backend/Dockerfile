# Backend Dockerfile
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client (This will be executed at runtime)
RUN npx prisma generate

# Expose the backend server port
EXPOSE 5000

# Command to start the backend server
CMD ["npm", "run", "start"]