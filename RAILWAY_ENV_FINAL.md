# Railway Environment Variables - Final Setup

## 🔧 **Environment Variables ที่ต้องตั้งใน Railway Dashboard:**

### **1. Frontend API URL (สำคัญมาก!):**
```env
VITE_API_URL=https://web-production-bf4ac.up.railway.app
```

### **2. Backend CORS Configuration:**
```env
FRONTEND_URL=https://web-production-bf4ac.up.railway.app
```

### **3. Database Configuration:**
```env
DATABASE_URL=mysql://username:password@host:port/database
```

### **4. JWT Authentication:**
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### **5. Server Configuration:**
```env
PORT=5001
NODE_ENV=production
```

## 🚀 **วิธีตั้งค่าใน Railway:**

### **1. ไปที่ Railway Dashboard:**
1. เข้าไปที่ project ของคุณ
2. คลิกที่ **Variables** tab
3. เพิ่ม environment variables ตามด้านบน

### **2. หรือใช้ Railway CLI:**
```bash
# Frontend API URL (สำคัญมาก!)
railway variables set VITE_API_URL="https://web-production-bf4ac.up.railway.app"

# Backend CORS
railway variables set FRONTEND_URL="https://web-production-bf4ac.up.railway.app"

# Database
railway variables set DATABASE_URL="mysql://username:password@host:port/database"

# JWT Secret
railway variables set JWT_SECRET="your-super-secret-jwt-key"

# Server
railway variables set PORT="5001"
railway variables set NODE_ENV="production"
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
- **VITE_API_URL** ต้องตั้งค่าให้ถูกต้อง (สำคัญมาก!)
- **FRONTEND_URL** ต้องตั้งค่าให้ถูกต้อง (สำหรับ CORS)
- เปลี่ยน JWT_SECRET เป็นค่าที่ปลอดภัย
- ตั้งค่า database connection string ให้ถูกต้อง
- หลังจากตั้งค่าแล้วต้อง redeploy

## 🔄 **ขั้นตอนการแก้ไข:**

1. **ตั้งค่า Environment Variables** ใน Railway Dashboard
2. **Redeploy** application
3. **ตรวจสอบ** ว่า CORS ทำงานได้แล้ว
4. **ตรวจสอบ** ว่า API calls ทำงานได้แล้ว

## 🎉 **ผลลัพธ์ที่คาดหวัง:**

### **✅ CORS จะทำงานได้:**
- Frontend สามารถเรียก API ได้
- ไม่มี CORS error อีกต่อไป

### **✅ API Calls จะทำงานได้:**
- Best seller cars จะโหลดได้
- New cars จะโหลดได้
- Search filters จะทำงานได้

### **✅ Authentication จะทำงานได้:**
- Login จะทำงานได้
- JWT tokens จะทำงานได้
