###############################
# Base deps layer (Yarn)
###############################
FROM node:20-alpine AS deps
WORKDIR /app

# Ensure yarn classic available (Node 20 image may already include yarn via corepack)
RUN if ! command -v yarn >/dev/null 2>&1; then corepack enable && corepack prepare yarn@1.22.22 --activate; else yarn --version; fi

# Copy only files needed to install dependencies
COPY package.json yarn.lock ./

# Install dependencies (lockfile requires update due to recent package.json edits).
# NOTE: For now we allow yarn to update the lockfile in the image. To restore
# reproducible builds, regenerate and commit an updated yarn.lock locally, then
# switch this back to: `RUN yarn install --frozen-lockfile`.
RUN yarn install

###############################
# Build layer
###############################
FROM node:20-alpine AS build
WORKDIR /app

# Activate yarn classic in build stage
RUN if ! command -v yarn >/dev/null 2>&1; then corepack enable && corepack prepare yarn@1.22.22 --activate; else yarn --version; fi

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prevent Next.js telemetry in build containers
ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn build

###############################
# Production runtime layer
###############################
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Activate yarn classic for runtime scripts
RUN if ! command -v yarn >/dev/null 2>&1; then corepack enable && corepack prepare yarn@1.22.22 --activate; else yarn --version; fi

# Non-root execution (optional hardening)
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy required runtime artifacts
COPY --from=build /app/next.config.js ./next.config.js
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY package.json yarn.lock ./
COPY --from=deps /app/node_modules ./node_modules

# We reuse the node_modules from the deps layer to avoid a second install.
# (Optional) After migrating lockfile you can prune dev deps with: `yarn workspaces focus --production` (if using workspaces) or switch to npm prune strategy.

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["yarn", "serve"]
