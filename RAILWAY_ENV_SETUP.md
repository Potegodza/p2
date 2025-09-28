# Railway Environment Variables Setup

## 🔧 **Environment Variables ที่ต้องตั้งใน Railway Dashboard:**

### **1. Database Configuration:**
```env
DATABASE_URL=mysql://username:password@host:port/database
```

### **2. JWT Authentication:**
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### **3. Cloudinary (Image Storage):**
```env
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### **4. Stripe (Payments):**
```env
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
```

### **5. Server Configuration:**
```env
PORT=5001
NODE_ENV=production
```

### **6. Frontend Configuration:**
```env
VITE_API_URL=https://your-railway-app-name.up.railway.app
```

## 🚀 **วิธีตั้งค่าใน Railway:**

### **1. ไปที่ Railway Dashboard:**
1. เข้าไปที่ project ของคุณ
2. คลิกที่ **Variables** tab
3. เพิ่ม environment variables ตามด้านบน

### **2. หรือใช้ Railway CLI:**
```bash
# Database
railway variables set DATABASE_URL="mysql://username:password@host:port/database"

# JWT Secret
railway variables set JWT_SECRET="your-super-secret-jwt-key"

# Cloudinary
railway variables set CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
railway variables set CLOUDINARY_API_KEY="your-cloudinary-key"
railway variables set CLOUDINARY_API_SECRET="your-cloudinary-secret"

# Stripe
railway variables set STRIPE_SECRET_KEY="sk_live_your_stripe_secret"

# Server
railway variables set PORT="5001"
railway variables set NODE_ENV="production"

# Frontend
railway variables set VITE_API_URL="https://your-railway-app-name.up.railway.app"
```

## 🎯 **Database Options:**

### **Option 1: PlanetScale (Recommended)**
```env
DATABASE_URL=mysql://username:password@aws.connect.psdb.cloud/database?sslaccept=strict
```

### **Option 2: Supabase**
```env
DATABASE_URL=postgresql://username:password@host:port/database
```

### **Option 3: Railway MySQL**
```env
DATABASE_URL=mysql://username:password@host:port/database
```

## 🔑 **JWT Secret Generation:**
```bash
# Generate a strong JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📝 **Important Notes:**
- เปลี่ยน JWT_SECRET เป็นค่าที่ปลอดภัย
- ใช้ production Stripe keys สำหรับ production
- ตั้งค่า Cloudinary account สำหรับ image storage
- ตั้งค่า database connection string ให้ถูกต้อง
