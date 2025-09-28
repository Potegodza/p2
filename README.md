# 🚗 Car Rental Website

## 📋 **Project Overview**

A modern, full-stack car rental website built with React, Node.js, and MySQL. Features include user management, car rental system, admin panel, payment integration, and responsive design.

## 🎯 **Features**

### **Frontend (React + Vite)**
- ✅ **User Authentication** - Login/Register
- ✅ **Car Browsing** - Search, filter, view cars
- ✅ **Rental System** - Book cars, view history
- ✅ **Admin Panel** - Manage cars, users, rentals
- ✅ **Payment Integration** - Stripe payment
- ✅ **Responsive Design** - Mobile-friendly
- ✅ **Modern UI** - Tailwind CSS + Framer Motion

### **Backend (Node.js + Express)**
- ✅ **REST API** - Complete API endpoints
- ✅ **Authentication** - JWT-based auth
- ✅ **Database** - MySQL with Prisma ORM
- ✅ **File Upload** - Cloudinary integration
- ✅ **Payment** - Stripe integration
- ✅ **Security** - Rate limiting, validation

### **Database (MySQL + Prisma)**
- ✅ **User Management** - Users, roles, authentication
- ✅ **Car Management** - Cars, images, availability
- ✅ **Rental System** - Bookings, history, status
- ✅ **Promotions** - Discount system
- ✅ **Images** - Car photos with Cloudinary

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+
- MySQL 8+
- npm or yarn

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/username/car-rental.git
cd car-rental
```

2. **Install dependencies**
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

3. **Setup environment variables**
```bash
# Backend (.env)
DATABASE_URL="mysql://username:password@localhost:3306/car_rental"
JWT_SECRET="your-super-secret-jwt-key"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
STRIPE_SECRET_KEY="your-stripe-secret-key"
PORT=5001
NODE_ENV=development

# Frontend (.env)
VITE_API_URL=http://localhost:5001
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. **Setup database**
```bash
cd server
npx prisma generate
npx prisma db push
```

5. **Run the application**
```bash
# Backend (Terminal 1)
cd server
npm start

# Frontend (Terminal 2)
cd client
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:5173
- Backend: http://localhost:5001
- Admin Panel: http://localhost:5173/admin

## 🎨 **Design System**

### **Colors**
- **Primary**: #2C3E50 (Dark Blue)
- **Secondary**: #E6B325 (Gold)
- **Background**: #F5F1EA (Beige)
- **Text**: #333 (Dark Gray)

### **Typography**
- **Font**: Poppins
- **Weights**: 400, 500, 600, 700

### **Components**
- **Buttons**: Rounded, hover effects
- **Cards**: Shadow, border radius
- **Forms**: Clean, validation
- **Navigation**: Sticky, responsive

## 📱 **Responsive Design**

- ✅ **Mobile First** - Optimized for mobile
- ✅ **Tablet** - Medium screen support
- ✅ **Desktop** - Large screen support
- ✅ **Touch Friendly** - Easy to use on touch devices

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/current-user` - Get current user

### **Cars**
- `GET /api/cars` - Get all cars
- `POST /api/cars` - Create car (Admin)
- `PUT /api/cars/:id` - Update car (Admin)
- `DELETE /api/cars/:id` - Delete car (Admin)

### **Rentals**
- `GET /api/user/rentals` - Get user rentals
- `POST /api/user/rental` - Create rental
- `PUT /api/admin/rentals/:id` - Update rental status (Admin)

### **Admin**
- `GET /api/admin/users` - Get all users
- `GET /api/admin/rentals` - Get all rentals
- `PUT /api/admin/users/:id` - Update user status

## 🗄️ **Database Schema**

### **Users**
- id, email, password, name, telephone, role, enabled

### **Cars**
- id, brand, model, year, licensePlate, pricePerDay, status, images

### **Rentals**
- id, startDate, endDate, totalPrice, status, phoneNumber
- promotionApplied, freeDays, originalPrice

### **Images**
- id, asset_id, public_id, url, secure_url, carId

## 🚀 **Deployment**

### **Frontend (Vercel/Netlify)**
```bash
# Build
cd client
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
# Drag & drop dist/ folder
```

### **Backend (Railway/Heroku)**
```bash
# Deploy to Railway
cd server
railway deploy

# Deploy to Heroku
cd server
heroku create your-app-name
git push heroku main
```

### **Database (PlanetScale/Supabase)**
- Create database
- Update DATABASE_URL
- Run migrations

## 📊 **Performance**

### **Frontend**
- ✅ **Vite** - Fast build tool
- ✅ **Code Splitting** - Lazy loading
- ✅ **Image Optimization** - WebP format
- ✅ **CDN** - Global distribution

### **Backend**
- ✅ **Express** - Fast server
- ✅ **Prisma** - Optimized queries
- ✅ **Caching** - Response caching
- ✅ **Rate Limiting** - API protection

## 🔒 **Security**

### **Authentication**
- ✅ **JWT Tokens** - Secure authentication
- ✅ **Password Hashing** - bcrypt
- ✅ **Role-based Access** - User/Admin roles

### **API Security**
- ✅ **Rate Limiting** - Prevent abuse
- ✅ **Input Validation** - Data sanitization
- ✅ **CORS** - Cross-origin protection
- ✅ **HTTPS** - Encrypted communication

## 🧪 **Testing**

### **Frontend Tests**
```bash
cd client
npm test
npm run test:coverage
```

### **Backend Tests**
```bash
cd server
npm test
npm run test:coverage
```

## 📚 **Documentation**

- ✅ **API Documentation** - Complete API reference
- ✅ **Component Documentation** - React components
- ✅ **Deployment Guide** - Step-by-step deployment
- ✅ **User Guide** - How to use the application

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 **License**

This project is licensed under the MIT License.

## 🎯 **Roadmap**

### **Phase 1: Core Features** ✅
- User authentication
- Car management
- Rental system
- Admin panel

### **Phase 2: Enhancements** 🚧
- Mobile app (React Native)
- Real-time notifications
- Advanced analytics
- Multi-language support

### **Phase 3: Advanced Features** 📋
- AI recommendations
- GPS tracking
- Insurance integration
- Fleet management

## 📞 **Support**

For support, email support@carrental.com or create an issue on GitHub.

---

**Built with ❤️ using React, Node.js, and MySQL**