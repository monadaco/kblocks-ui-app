# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code to the working directory
ADD src ./src
ADD public ./public
ADD eslint.*.js ./
ADD index.html ./
ADD postcss.config.js ./
ADD tailwind.config.js ./
ADD tsconfig.app.json ./
ADD tsconfig.json ./
ADD tsconfig.node.json ./
ADD vite.config.ts ./

ADD .env ./

# Expose a port to communicate with the React app
EXPOSE 5175

RUN npx vite build

# Start your React app
CMD ["npx", "vite", "preview"]
