FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the frontend code
COPY . .

# Expose the port (if Vite or React default is 3000)
EXPOSE 3000

# Command to run the frontend (using npm run start)
CMD ["npm", "run", "dev"]
