# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY infrastructure/package.json infrastructure/package-lock.json* ./
RUN npm install
COPY domain/ ./domain/
COPY application/ ./application/
COPY infrastructure/ ./infrastructure/
WORKDIR /app/infrastructure
RUN npm run build

# Development stage
FROM node:20-alpine AS development
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY infrastructure/package.json infrastructure/package-lock.json* ./infrastructure/
WORKDIR /app/infrastructure
RUN npm install

WORKDIR /app
COPY domain/ ./domain/
COPY application/ ./application/
COPY infrastructure/ ./infrastructure/

WORKDIR /app/infrastructure
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1
CMD ["npm", "run", "start:dev"]

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
COPY infrastructure/package.json infrastructure/package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/infrastructure/dist ./dist
COPY --from=builder /app/domain ./domain
COPY --from=builder /app/application ./application
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001
RUN chown -R nestjs:nodejs /app
USER nestjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1
CMD ["node", "dist/infrastructure/src/main.js"]
