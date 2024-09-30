ARG NODE_VERSION=20.1.0
# Stage 1: Build the TypeScript code
FROM node:${NODE_VERSION} AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Production Image
FROM node:${NODE_VERSION}-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy built files from the build stage
COPY --from=build /app/dist ./dist

# Expose port (default port is 3000)
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
