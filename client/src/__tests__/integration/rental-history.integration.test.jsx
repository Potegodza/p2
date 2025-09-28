import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import RentalHistory from '../../pages/user/RentalHistory'
import useCarRentalStore from '../../store/carRentalStore'
import { getRentalHistory } from '../../api/user'

// Mock dependencies
vi.mock('../../store/carRentalStore')
vi.mock('../../api/user')
vi.mock('../../utils/number', () => ({
  numberFormat: vi.fn((num) => new Intl.NumberFormat('en-US').format(num))
}))
vi.mock('../../utils/dateformat', () => ({
  dateFormat: vi.fn((date) => new Date(date).toLocaleDateString('en-US'))
}))

const mockRentals = [
  {
    id: 1,
    status: 'Pending',
    totalPrice: 1500,
    startDate: '2024-01-01',
    endDate: '2024-01-03',
    phoneNumber: '0123456789',
    createdAt: '2023-12-30',
    car: {
      brand: 'Toyota',
      model: 'Camry',
      licensePlate: 'ABC-1234',
      images: [{ url: 'https://example.com/car1.jpg' }]
    }
  }
]

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Rental History Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render complete rental history flow', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token',
      user: { name: 'Test User' }
    })
    
    getRentalHistory.mockResolvedValue({ data: mockRentals })

    renderWithRouter(<RentalHistory />)
    
    // Check header
    await waitFor(() => {
      expect(screen.getByText('Rental History')).toBeInTheDocument()
      expect(screen.getByText('View all your car rental history')).toBeInTheDocument()
    })

    // Check stats cards - use getAllByText for multiple elements
    expect(screen.getAllByText('Pending')).toHaveLength(2) // One in stats, one in rental item
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('Cancelled')).toBeInTheDocument()

    // Check rental item
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('License: ABC-1234')).toBeInTheDocument()
  })

  it('should handle empty state correctly', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token',
      user: { name: 'Test User' }
    })
    
    getRentalHistory.mockResolvedValue({ data: [] })

    renderWithRouter(<RentalHistory />)
    
    await waitFor(() => {
      expect(screen.getByText('No Rentals Yet')).toBeInTheDocument()
      expect(screen.getByText("You don't have any car rentals yet")).toBeInTheDocument()
      expect(screen.getByText('Start Renting')).toBeInTheDocument()
    })
  })

  it('should handle API errors gracefully', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token',
      user: { name: 'Test User' }
    })
    
    getRentalHistory.mockRejectedValue(new Error('API Error'))

    renderWithRouter(<RentalHistory />)
    
    // Should still render the component structure
    await waitFor(() => {
      expect(screen.getByText('Rental History')).toBeInTheDocument()
    })
  })
})
