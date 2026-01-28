# Multi-stage Dockerfile: build Next.js in a builder stage, then run a lean production image on port 80
FROM node:20-alpine AS builder

WORKDIR /app

# Install all deps and build
COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy only what is needed for running the app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next

# Install only production dependencies
RUN npm i 

EXPOSE 3000

# Start the Next.js production server on port 80
CMD ["npm", "run", "start", "--", "-p", "3000", "-H", "0.0.0.0"]