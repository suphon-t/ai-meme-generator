FROM node:lts-slim as base
WORKDIR /app
RUN npm i -g turbo@1.6.3 pnpm@7.19.0
############################################################

FROM base as pruner
COPY . .
RUN turbo prune --scope=meme-brain --docker

############################################################

FROM base as app
WORKDIR /app
# Copy package.json and yarn.lock
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# Install dependencies
RUN pnpm install --frozen-lockfile
# Build the project
COPY --from=pruner /app/out/full/ .
RUN turbo run build --filter=meme-brain

# Expose the port (http & https) and run application
EXPOSE 3000
CMD ["pnpm", "--filter=meme-brain", "start"]
