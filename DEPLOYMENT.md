# Deployment Guide

## Quick Start (Local Testing)

```bash
# Build the project
yarn build

# Start production server
yarn serve

# Visit http://localhost:3000
```

## Docker Deployment

### Option 1: Docker Compose (Recommended)

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 2: Docker Build & Run

```bash
# Build image
docker build -t mehdi-blog .

# Run container
docker run -d \
  --name mehdi-blog \
  -p 3000:3000 \
  --env-file .env \
  mehdi-blog

# View logs
docker logs -f mehdi-blog

# Stop container
docker stop mehdi-blog
docker rm mehdi-blog
```

## Environment Variables

The application requires environment variables from `.env` file:

```bash
# Required
BUTTONDOWN_API_KEY=your_api_key
NEXT_PUBLIC_FORMSPREE_KEY=your_formspree_key

# Optional
NEXT_UMAMI_ID=
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

See [.env.example](.env.example) for a complete template.

## Docker Networking Issues

If you encounter Docker networking errors like:

```
operation not supported
failed to add the host (veth...) <=> sandbox (veth...) pair interfaces
```

**Workaround 1: Use Docker BuildKit**

```bash
DOCKER_BUILDKIT=0 docker build -t mehdi-blog .
```

**Workaround 2: Use Podman (Docker alternative)**

```bash
podman build -t mehdi-blog .
podman run -d -p 3000:3000 --env-file .env mehdi-blog
```

**Workaround 3: Direct deployment without Docker**

```bash
yarn build
yarn serve
```

## Cloud Deployment

### Vercel (Easiest)

1. Push your code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### VPS/Cloud Server

```bash
# Clone repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Install dependencies
yarn install

# Create .env file
cp .env.example .env
# Edit .env with your API keys

# Build
yarn build

# Run with PM2 (process manager)
npm install -g pm2
pm2 start yarn --name "mehdi-blog" -- serve
pm2 save
pm2 startup
```

### Docker on VPS

```bash
# On your server
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Create .env file
nano .env  # Add your API keys

# Run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

## GitHub Pages (Static Export)

The project includes GitHub Actions workflow for automatic deployment:

1. Enable GitHub Pages in repository settings
2. Select "GitHub Actions" as source
3. Push to main branch
4. Site deploys automatically to `https://yourusername.github.io/repo-name`

**Note:** Static export doesn't support:

- Server-side API routes (newsletter/contact form)
- Dynamic server rendering

For full functionality, use Vercel, VPS, or Docker deployment.

## Monitoring & Health Checks

The Docker container includes a health check:

```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000"]
  interval: 30s
  timeout: 10s
  retries: 3
```

Check container health:

```bash
docker ps  # Look for "healthy" status
docker inspect mehdi-blog | grep Health
```

## Troubleshooting

### Port already in use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Build fails

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules
yarn install

# Rebuild
yarn build
```

### Environment variables not working

```bash
# Verify .env file exists
cat .env

# Check if variables are loaded in container
docker exec mehdi-blog env | grep BUTTONDOWN
```

## Performance Optimization

The build includes:

- Image optimization (WebP, AVIF)
- CSS optimization
- Code splitting
- Static page generation (722 pages)
- RSS feed generation

All static assets are cached for 1 year with immutable headers.

## Security

- Security headers configured (CSP, X-Frame-Options, etc.)
- HTTPS enforced via HSTS
- No sensitive data in code (use .env)
- Container runs as non-root user (nextjs)
