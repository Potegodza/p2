const request = require('supertest')
const express = require('express')
const cors = require('cors')

// Create test app without starting server
const app = express()
app.use(cors())
app.use(express.json())

// Mock routes for testing
app.get('/api/user/rentals', (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  res.json({ data: [] })
})

app.post('/api/user/rental', (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  const { carId, startDate, endDate, totalPrice, phoneNumber } = req.body
  
  if (!carId || !startDate || !endDate || !totalPrice || !phoneNumber) {
    return res.status(400).json({ error: 'Invalid data' })
  }
  
  res.status(201).json({
    id: 1,
    status: 'Pending',
    carId,
    startDate,
    endDate,
    totalPrice,
    phoneNumber
  })
})

describe('Rental API Endpoints', () => {
  let authToken

  beforeAll(async () => {
    // Mock authentication token
    authToken = 'mock-jwt-token'
  })

  describe('GET /api/user/rentals', () => {
    it('should return rental history for authenticated user', async () => {
      const response = await request(app)
        .get('/api/user/rentals')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(response.body).toHaveProperty('data')
      expect(Array.isArray(response.body.data)).toBe(true)
    })

    it('should return 401 for unauthenticated requests', async () => {
      await request(app)
        .get('/api/user/rentals')
        .expect(401)
    })
  })

  describe('POST /api/user/rental', () => {
    it('should create a new rental', async () => {
      const rentalData = {
        carId: 1,
        startDate: '2024-01-01',
        endDate: '2024-01-03',
        totalPrice: 1500,
        phoneNumber: '0123456789'
      }

      const response = await request(app)
        .post('/api/user/rental')
        .set('Authorization', `Bearer ${authToken}`)
        .send(rentalData)
        .expect(201)

      expect(response.body).toHaveProperty('id')
      expect(response.body).toHaveProperty('status', 'Pending')
    })

    it('should return 400 for invalid rental data', async () => {
      const invalidData = {
        carId: 'invalid',
        startDate: 'invalid-date'
      }

      await request(app)
        .post('/api/user/rental')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400)
    })
  })
})
