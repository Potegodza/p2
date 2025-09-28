import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { getRentalHistory, createRental } from '../user'

// Mock axios
vi.mock('axios')

describe('User API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getRentalHistory', () => {
    it('should fetch rental history with correct headers', async () => {
      const mockToken = 'test-token'
      const mockResponse = {
        data: [
          {
            id: 1,
            status: 'Pending',
            totalPrice: 1500,
            car: { brand: 'Toyota', model: 'Camry' }
          }
        ]
      }

      axios.get.mockResolvedValue(mockResponse)

      const result = await getRentalHistory(mockToken)

      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:5001/api/user/rentals',
        {
          headers: {
            Authorization: `Bearer ${mockToken}`
          }
        }
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle API errors', async () => {
      const mockToken = 'test-token'
      const mockError = new Error('Network Error')

      axios.get.mockRejectedValue(mockError)

      await expect(getRentalHistory(mockToken)).rejects.toThrow('Network Error')
    })
  })

  describe('createRental', () => {
    it('should create rental with correct data and headers', async () => {
      const mockToken = 'test-token'
      const mockRentalData = {
        carId: 1,
        startDate: '2024-01-01',
        endDate: '2024-01-03',
        totalPrice: 1500
      }
      const mockResponse = {
        data: { id: 1, status: 'Pending' }
      }

      axios.post.mockResolvedValue(mockResponse)

      const result = await createRental(mockToken, mockRentalData)

      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5001/api/user/rental',
        mockRentalData,
        {
          headers: {
            Authorization: `Bearer ${mockToken}`
          }
        }
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle creation errors', async () => {
      const mockToken = 'test-token'
      const mockRentalData = { carId: 1 }
      const mockError = new Error('Validation Error')

      axios.post.mockRejectedValue(mockError)

      await expect(createRental(mockToken, mockRentalData)).rejects.toThrow('Validation Error')
    })
  })
})





