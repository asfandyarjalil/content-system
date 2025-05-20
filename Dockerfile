# Use lightweight Node.js image
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy rest of the application
COPY . .

# Expose your app port (default 3000)
EXPOSE 5000

# Start the app using server.js
CMD ["node", "server.js"]
