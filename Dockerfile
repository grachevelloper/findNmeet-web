FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_API_URL
ARG VITE_VK_APP_ID
ARG VITE_VK_REDIRECT_URL

ENV VITE_API_URL=$VITE_API_URL \
    VITE_VK_APP_ID=$VITE_VK_APP_ID \
    VITE_VK_REDIRECT_URL=$VITE_VK_REDIRECT_URL

RUN pnpm build

# ── Stage 2: раздача ──────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
