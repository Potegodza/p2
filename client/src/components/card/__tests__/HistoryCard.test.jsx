import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import HistoryCard from '../HistoryCard'
import useCarRentalStore from '../../../store/carRentalStore'
import { getRentalHistory } from '../../../api/user'

// Mock dependencies
vi.mock('../../../store/carRentalStore')
vi.mock('../../../api/user')
vi.mock('../../../utils/number', () => ({
  numberFormat: vi.fn((num) => new Intl.NumberFormat('en-US').format(num))
}))
vi.mock('../../../utils/dateformat', () => ({
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

describe('HistoryCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token'
    })
    
    getRentalHistory.mockResolvedValue({ data: mockRentals })

    renderWithRouter(<HistoryCard />)
    
    await waitFor(() => {
      expect(screen.getByText('Rental History')).toBeInTheDocument()
    })
  })

  it('renders rental history when data is loaded', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token'
    })
    
    getRentalHistory.mockResolvedValue({ data: mockRentals })

    renderWithRouter(<HistoryCard />)
    
    await waitFor(() => {
      expect(screen.getByText('Rental History')).toBeInTheDocument()
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
      expect(screen.getByText('License Plate: ABC-1234')).toBeInTheDocument()
    })
  })

  it('shows empty state when no rentals exist', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token'
    })
    
    getRentalHistory.mockResolvedValue({ data: [] })

    renderWithRouter(<HistoryCard />)
    
    await waitFor(() => {
      expect(screen.getByText('No Rental History Found')).toBeInTheDocument()
      expect(screen.getByText("You haven't rented any cars yet.")).toBeInTheDocument()
      expect(screen.getByText('Rent a Car Now')).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token'
    })
    
    getRentalHistory.mockRejectedValue(new Error('API Error'))

    renderWithRouter(<HistoryCard />)
    
    await waitFor(() => {
      expect(screen.getByText('No Rental History Found')).toBeInTheDocument()
    })
  })

  it('displays correct status with proper styling', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token'
    })
    
    getRentalHistory.mockResolvedValue({ data: mockRentals })

    renderWithRouter(<HistoryCard />)
    
    await waitFor(() => {
      expect(screen.getByText('Pending')).toBeInTheDocument()
    })
  })

  it('formats prices correctly with THB', async () => {
    useCarRentalStore.mockReturnValue({
      token: 'mock-token'
    })
    
    getRentalHistory.mockResolvedValue({ data: mockRentals })

    renderWithRouter(<HistoryCard />)
    
    await waitFor(() => {
      expect(screen.getByText(/1,500.*THB/)).toBeInTheDocument()
    })
  })

  it('handles missing car images gracefully', async () => {
    const rentalWithNoImages = {
      ...mockRentals[0],
      car: {
        ...mockRentals[0].car,
        images: []
      }
    }

    useCarRentalStore.mockReturnValue({
      token: 'mock-token'
    })
    
    getRentalHistory.mockResolvedValue({ data: [rentalWithNoImages] })

    renderWithRouter(<HistoryCard />)
    
    await waitFor(() => {
      const img = screen.getByAltText('Toyota Camry')
      expect(img).toHaveAttribute('src', '/car-placeholder.svg')
    })
  })
})
