# Multi-stage: build then run production server on port 80
FROM node:20-alpine AS builder
WORKDIR /app

# install deps and build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# copy build output and necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
# copy next.config.js if you have one
COPY --from=builder /app/next.config.ts ./next.config.ts

# install only production deps
RUN npm ci --omit=dev

EXPOSE 3000

# run production server on port 80
CMD ["npm", "run", "start", "--", "-p", "3000", "-H", "0.0.0.0"]