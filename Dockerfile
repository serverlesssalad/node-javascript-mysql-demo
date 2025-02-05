# Use the official Node.js image as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the application port
EXPOSE 3000

# Set the environment variables (these can be overwritten when running the container)
ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=password
ENV DB_NAME=word_database
ENV PORT=3000

# Command to run the application
CMD ["node", "index.js"]
   docker build -t saladify .
   docker run -d -p 3000:3000 --env-file .env --name saladify-container saladify