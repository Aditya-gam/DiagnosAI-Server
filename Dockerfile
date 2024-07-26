# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy the rest of your app's source code
COPY . .

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Define environment variable
ENV NODE_ENV production

# Run app.js when the container launches
CMD ["node", "src/app.js"]
