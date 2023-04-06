FROM node:18.15.0-bullseye-slim as builder
ENV NODE_ENV=development
COPY . /app
WORKDIR /app
RUN npm ci && npm run build

FROM gcr.io/distroless/nodejs18-debian11:nonroot
ENV NODE_ENV=production
COPY --from=builder --chown=nonroot /app/.next/standalone /app
WORKDIR /app
CMD ["/app/server.js"]
