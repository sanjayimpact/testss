FROM ghcr.io/puppeteer/puppeteer:24.8.0

# Skip downloading Chromium again (already in base image)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 10000

CMD ["node", "index.js"]
