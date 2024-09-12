# Use a Node.js base image
FROM node:20.12.2

# Set working directory
WORKDIR /MathSheetBackend

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
