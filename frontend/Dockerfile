# Use official Node.js image
FROM node:20

# Accept Firebase config as build arguments
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_DEV_BACKEND_URL
ARG VITE_PROD_BACKEND_URL

# Set environment variables for Vite
ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
ENV VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN
ENV VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID
ENV VITE_DEV_BACKEND_URL=$VITE_DEV_BACKEND_URL
ENV VITE_PROD_BACKEND_URL=$VITE_PROD_BACKEND_URL

# Install required system packages
RUN apt-get update && \
    apt-get install -y git cmake python3 curl && \
    rm -rf /var/lib/apt/lists/*

# Install and configure EMSDK
RUN git clone https://github.com/emscripten-core/emsdk.git /emsdk
WORKDIR /emsdk
RUN ./emsdk install latest && ./emsdk activate latest
ENV EMSDK=/emsdk
ENV PATH="/emsdk:/emsdk/upstream/emscripten:$PATH"

# Set up working directory
WORKDIR /app

# Copy app source
COPY . .

# Install dependencies and build
RUN npm install
RUN bash -c "source /emsdk/emsdk_env.sh && npm run build"

# Install serve to host the built app
RUN npm install -g serve
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "dist", "-l", "3000"]