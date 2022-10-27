# Use an official Node runtime as a parent image
FROM node:15.5.1

# Set the working directory to /app
WORKDIR '/app/api'

# Copy package.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Make port 8000 available to the world outside this container
EXPOSE 3000

# Run index.js when the container launches
CMD ["npm", "start"]