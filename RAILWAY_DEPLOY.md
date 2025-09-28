# 🚀 Railway Deployment Guide

## 📋 **Railway Configuration**

โปรเจคนี้ถูกตั้งค่าให้ deploy ไป Railway โดยใช้:

### **1. Root Configuration**
- `railway.json` - ตั้งค่า Railway deployment
- `nixpacks.toml` - ตั้งค่า build process
- `package.json` - Root package สำหรับจัดการ monorepo

### **2. Backend Configuration**
- `server/railway.json` - Backend specific config
- `server/package.json` - Backend dependencies

### **3. Frontend Configuration**
- `client/railway.json` - Frontend specific config
- `client/package.json` - Frontend dependencies

## 🚀 **Deployment Steps**

### **Option 1: Deploy Backend Only (Recommended)**

1. **ไปที่ [railway.app](https://railway.app)**
2. **Sign up/Login with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Connect your GitHub repository**
5. **Railway จะ auto-detect และ deploy backend**

### **Option 2: Deploy Both Frontend & Backend**

#### **Backend Service:**
1. **Create new service** ใน Railway
2. **Connect GitHub repo**
3. **Set configuration:**
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build:all`
   - **Start Command**: `npm start`

#### **Frontend Service:**
1. **Create another service** ใน Railway
2. **Connect same GitHub repo**
3. **Set configuration:**
   - **Root Directory**: `./client`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run preview`

## 🔧 **Environment Variables**

### **Backend Environment Variables:**
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

### **Frontend Environment Variables:**
```env
VITE_API_URL=https://your-backend-url.railway.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
PORT=3000
```

## 📊 **Monitoring**

### **Railway Dashboard:**
- **Logs**: Real-time logs
- **Metrics**: CPU, Memory, Network
- **Deployments**: Deployment history
- **Environment**: Environment variables

### **Health Checks:**
- **Backend**: `https://your-backend-url.railway.app/api/health`
- **Frontend**: `https://your-frontend-url.railway.app`

## 🛠️ **Troubleshooting**

### **Common Issues:**

1. **Build Failures:**
   ```bash
   # Check logs in Railway dashboard
   # Verify environment variables
   ```

2. **Database Connection:**
   ```bash
   # Ensure DATABASE_URL is correct
   # Check PlanetScale/Supabase connection
   ```

3. **Frontend Not Loading:**
   ```bash
   # Check VITE_API_URL is correct
   # Verify backend is running
   ```

## 🎯 **Recommended Setup**

สำหรับการ deploy ที่ง่ายที่สุด:

1. **Deploy Backend ไป Railway** (ใช้ root directory)
2. **Deploy Frontend ไป Vercel/Netlify** (ใช้ client directory)
3. **ใช้ PlanetScale สำหรับ Database**

## 📞 **Support**

หากมีปัญหา:
1. ตรวจสอบ Railway logs
2. ตรวจสอบ environment variables
3. ตรวจสอบ GitHub Actions workflow
4. ดูคู่มือใน `DEPLOYMENT.md`

---

**Happy Deploying! 🚀**
