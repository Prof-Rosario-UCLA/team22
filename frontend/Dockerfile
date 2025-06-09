# Use official Node.js image
FROM node:20

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