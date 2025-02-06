# Use a lighter version of Node.js as base image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install --only=production

# Copy the rest of the project files
COPY . .

# Expose the port
EXPOSE 3000

# Set the entrypoint
CMD ["node", "index.js"]