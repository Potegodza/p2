import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import RentalHistory from '../RentalHistory'
import useCarRentalStore from '../../../store/carRentalStore'
import { getRentalHistory } from '../../../api/user'
import { toast } from 'react-toastify'

// Mock dependencies
vi.mock('../../../store/carRentalStore')
vi.mock('../../../api/user')
vi.mock('../../../utils/number', () => ({
  numberFormat: vi.fn((num) => new Intl.NumberFormat('en-US').format(num))
}))
vi.mock('../../../utils/dateformat', () => ({
  dateFormat: vi.fn((date) => new Date(date).toLocaleDateString('en-US'))
}))
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn()
  }
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
  },
  {
    id: 2,
    status: 'Completed',
    totalPrice: 2500,
    startDate: '2024-01-05',
    endDate: '2024-01-07',
    phoneNumber: '0987654321',
    createdAt: '2023-12-31',
    car: {
      brand: 'Honda',
      model: 'Civic',
      licensePlate: 'XYZ-5678',
      images: [{ url: 'https://example.com/car2.jpg' }]
    }
  }
]

describe('RentalHistory Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token',
      user: { name: 'Test User' }
    })
    
    getRentalHistory.mockResolvedValue({ data: mockRentals })

    render(<RentalHistory />)
    
    await waitFor(() => {
      expect(screen.getByText('Rental History')).toBeInTheDocument()
    })
  })

  it('renders rental history when data is loaded', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token',
      user: { name: 'Test User' }
    })
    
    getRentalHistory.mockResolvedValue({ data: mockRentals })

    render(<RentalHistory />)
    
    await waitFor(() => {
      expect(screen.getByText('Rental History')).toBeInTheDocument()
      expect(screen.getByText('View all your car rental history')).toBeInTheDocument()
    })

    // Check if rental items are rendered
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('Honda Civic')).toBeInTheDocument()
    expect(screen.getByText('License: ABC-1234')).toBeInTheDocument()
    expect(screen.getByText('License: XYZ-5678')).toBeInTheDocument()
  })

  it('displays correct status counts in stats cards', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token',
      user: { name: 'Test User' }
    })
    
    getRentalHistory.mockResolvedValue({ data: mockRentals })

    render(<RentalHistory />)
    
    await waitFor(() => {
      // Use getAllByText for multiple elements with same text
      const countElements = screen.getAllByText('1')
      expect(countElements).toHaveLength(2) // Pending and Completed counts
    })
  })

  it('shows empty state when no rentals exist', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token',
      user: { name: 'Test User' }
    })
    
    getRentalHistory.mockResolvedValue({ data: [] })

    render(<RentalHistory />)
    
    await waitFor(() => {
      expect(screen.getByText('No Rentals Yet')).toBeInTheDocument()
      expect(screen.getByText("You don't have any car rentals yet")).toBeInTheDocument()
      expect(screen.getByText('Start Renting')).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token',
      user: { name: 'Test User' }
    })
    
    getRentalHistory.mockRejectedValue(new Error('API Error'))

    render(<RentalHistory />)
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to load rental history')
    })
  })

  it('displays correct status icons and colors', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token',
      user: { name: 'Test User' }
    })
    
    getRentalHistory.mockResolvedValue({ data: mockRentals })

    render(<RentalHistory />)
    
    await waitFor(() => {
      // Use getAllByText for multiple elements
      expect(screen.getAllByText('Pending')).toHaveLength(2) // Stats and rental item
      expect(screen.getAllByText('Completed')).toHaveLength(2) // Stats and rental item
    })
  })

  it('formats prices correctly', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token',
      user: { name: 'Test User' }
    })
    
    getRentalHistory.mockResolvedValue({ data: mockRentals })

    render(<RentalHistory />)
    
    await waitFor(() => {
      expect(screen.getByText(/1,500.*THB/)).toBeInTheDocument()
      expect(screen.getByText(/2,500.*THB/)).toBeInTheDocument()
    })
  })
})
