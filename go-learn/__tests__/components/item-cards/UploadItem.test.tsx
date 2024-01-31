import UploadItem from '@/components/item-cards/UploadItem'
import { render, screen } from '@testing-library/react'

const mockUpload = {
  id: '1',
  title: 'Test Upload',
  description: 'Test Description',
  publicURL: 'https://example.com',
}

describe('UploadItem', () => {
  it('should render correctly', () => {
    render(<UploadItem upload={mockUpload}/>)

    const titleElem = screen.getByText('Test Upload')

    expect(titleElem).toBeInTheDocument()
  })

  describe('should have a download button which', () => {
    it('renders correctly', () => {
      render(<UploadItem upload={mockUpload}/>)

      const viewButton = screen.getAllByRole('link')[0]
      const viewIcon = screen.getByRole('download-icon')
    
      expect(viewButton).toBeInTheDocument()
      expect(viewButton).toHaveClass('bg-transparent')
      expect(viewIcon).toBeInTheDocument()
    })

    it('has a href matching "upload.publicUrl"?download ', () => {
      render(<UploadItem upload={mockUpload}/>)

      const viewButton = screen.getAllByRole('link')[0]

      expect(viewButton).toHaveAttribute('href', 'https://example.com?download')
    })
  })

  describe('should have a delete button which', () => {
    it('renders correctly', () => {
      render(<UploadItem upload={mockUpload} onDelete={async () => {}}/>)

      const removeButton = screen.getByRole('button')
      const removeIcon = screen.getByRole('remove-icon')
    
      expect(removeButton).toBeInTheDocument()
      expect(removeButton).toHaveClass('bg-destructive')
      expect(removeIcon).toBeInTheDocument()
    })

    it('calls onDelete when clicked', () => {
      const onDelete = jest.fn(async () => {})
      render(<UploadItem upload={mockUpload} onDelete={onDelete}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onDelete).toHaveBeenCalled()
    })
  })

})