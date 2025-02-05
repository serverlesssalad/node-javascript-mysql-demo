# Use the official lightweight Node.js image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Expose the application port
EXPOSE 3000

# Set the entry point
CMD ["node", "index.js"]