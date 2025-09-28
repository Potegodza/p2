# 🚀 Deployment Guide - Car Rental App

This guide will help you deploy your Car Rental application to production using modern cloud platforms.

## 📋 Prerequisites

- GitHub account
- Vercel account (for frontend)
- Railway account (for backend)
- Database service (PlanetScale/Supabase)
- Cloudinary account (for image storage)
- Stripe account (for payments)

## 🎯 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Vercel)      │◄──►│   (Railway)     │◄──►│   (PlanetScale) │
│   React + Vite  │    │   Node.js + API │    │   MySQL         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN           │    │   File Storage  │    │   Monitoring    │
│   (Vercel CDN)  │    │   (Cloudinary) │    │   (Railway)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🗄️ Database Setup

### Option 1: PlanetScale (Recommended)

1. **Create PlanetScale Account**
   - Go to [planetscale.com](https://planetscale.com)
   - Sign up for free account
   - Create new database: `car-rental-prod`

2. **Get Connection String**
   ```bash
   # Example connection string
   mysql://username:password@host:port/database?sslaccept=strict
   ```

3. **Run Migrations**
   ```bash
   cd server
   npx prisma db push
   ```

### Option 2: Supabase

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Get connection string from Settings > Database

2. **Update Prisma Schema**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

## 🎨 Frontend Deployment (Vercel)

### 1. Prepare Frontend

```bash
cd client
npm run build
```

### 2. Deploy to Vercel

#### Method A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Method B: GitHub Integration
1. Connect GitHub repo to Vercel
2. Set build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Environment Variables (Vercel)

Set these in Vercel dashboard:

```env
VITE_API_URL=https://your-backend-url.railway.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
```

## ⚙️ Backend Deployment (Railway)

### 1. Prepare Backend

```bash
cd server
npm install
```

### 2. Deploy to Railway

#### Method A: Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

#### Method B: GitHub Integration
1. Connect GitHub repo to Railway
2. Set service directory: `server`
3. Configure environment variables

### 3. Environment Variables (Railway)

Set these in Railway dashboard:

```env
DATABASE_URL=mysql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
STRIPE_SECRET_KEY=sk_live_your_stripe_secret
NODE_ENV=production
PORT=5001
```

## 🔧 Additional Services Setup

### Cloudinary (Image Storage)

1. **Create Cloudinary Account**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for free account
   - Get API credentials

2. **Configure in Backend**
   ```javascript
   // Already configured in your app
   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
   });
   ```

### Stripe (Payments)

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Get API keys from dashboard

2. **Configure Keys**
   - Frontend: `VITE_STRIPE_PUBLISHABLE_KEY`
   - Backend: `STRIPE_SECRET_KEY`

## 🚀 Automated Deployment

### GitHub Actions

The project includes GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. **Runs Tests** on every push/PR
2. **Deploys Frontend** to Vercel on main branch
3. **Deploys Backend** to Railway on main branch

### Manual Deployment Commands

```bash
# Frontend
cd client
npm run build
vercel --prod

# Backend
cd server
railway up
```

## 🔍 Health Checks

### Frontend Health Check
- URL: `https://your-app.vercel.app`
- Should return React app

### Backend Health Check
- URL: `https://your-backend.railway.app/api/health`
- Should return: `{"status": "ok"}`

## 📊 Monitoring

### Railway Monitoring
- Logs: Available in Railway dashboard
- Metrics: CPU, Memory, Network
- Alerts: Configure in Railway settings

### Vercel Monitoring
- Analytics: Available in Vercel dashboard
- Performance: Core Web Vitals
- Functions: Serverless function logs

## 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] Database connections encrypted
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] JWT secrets strong
- [ ] HTTPS enabled
- [ ] API endpoints protected

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check logs
   vercel logs
   railway logs
   ```

2. **Database Connection Issues**
   ```bash
   # Test connection
   npx prisma db push
   ```

3. **Environment Variables**
   ```bash
   # Verify in production
   echo $DATABASE_URL
   ```

### Debug Commands

```bash
# Frontend
cd client && npm run build
cd client && npm run preview

# Backend
cd server && npm start
cd server && npx prisma studio
```

## 📈 Performance Optimization

### Frontend
- Enable Vercel CDN
- Optimize images with Cloudinary
- Use React.lazy() for code splitting
- Enable gzip compression

### Backend
- Enable Railway caching
- Optimize database queries
- Use connection pooling
- Monitor memory usage

## 🔄 CI/CD Pipeline

The deployment pipeline includes:

1. **Code Push** → GitHub
2. **Tests Run** → GitHub Actions
3. **Frontend Deploy** → Vercel
4. **Backend Deploy** → Railway
5. **Database Migrate** → PlanetScale
6. **Health Check** → Automated

## 📞 Support

If you encounter issues:

1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check service status pages
5. Contact platform support

---

**Happy Deploying! 🚀**

Your Car Rental app should now be live and accessible to users worldwide.
