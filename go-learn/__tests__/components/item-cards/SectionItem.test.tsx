import SectionItem from '@/components/item-cards/SectionItem'
import { render, screen } from '@testing-library/react'

const mockSection = {
  id: '1',
  title: 'Test Section',
  description: 'Test Description',
  courseId: '1',
}

describe('SectionItem', () => {
  it('should have a title', () => {
    render(<SectionItem section={mockSection}/>)

    const titleElem = screen.getByText('Test Section')

    expect(titleElem).toBeInTheDocument()
  })

  it('should have a point cursor if onclick defined', () => {
    render(<SectionItem section={mockSection} onClick={() => {}}/>)

    const item = screen.getByRole('listitem')
    
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })

  describe('should have a view button which', () => {
    it('renders correctly', () => {
      render(<SectionItem section={mockSection}/>)

      const viewButton = screen.getAllByRole('link')[0]
      const viewIcon = screen.getByRole('view-icon')
    
      expect(viewButton).toBeInTheDocument()
      expect(viewButton).toHaveClass('bg-transparent')
      expect(viewIcon).toBeInTheDocument()
    })

    it('has a href matching "/view/sections/[section_id]', () => {
      render(<SectionItem section={mockSection}/>)

      const viewButton = screen.getAllByRole('link')[0]

      expect(viewButton).toHaveAttribute('href', '/view/sections/1')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<SectionItem section={mockSection} onClick={onClick}/>)

      const viewButton = screen.getAllByRole('link')[0]
      viewButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have an edit button which', () => {
    it('renders correctly', () => {
      render(<SectionItem section={mockSection} editable/>)

      const editButton = screen.getAllByRole('link')[1]
      const editIcon = screen.getByRole('view-icon')
    
      expect(editButton).toBeInTheDocument()
      expect(editButton).toHaveClass('bg-secondary')
      expect(editIcon).toBeInTheDocument()
    })

    it('has a href matching "/manage/sections/[section_id]', () => {
      render(<SectionItem section={mockSection} editable/>)

      const editButton = screen.getAllByRole('link')[1]

      expect(editButton).toHaveAttribute('href', '/manage/sections/1')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<SectionItem section={mockSection} editable onClick={onClick}/>)

      const editButton = screen.getAllByRole('link')[1]
      editButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have a delete button which', () => {
    it('renders correctly', () => {
      render(<SectionItem section={mockSection} onDelete={async () => {}}/>)

      const removeButton = screen.getByRole('button')
      const removeIcon = screen.getByRole('view-icon')
    
      expect(removeButton).toBeInTheDocument()
      expect(removeButton).toHaveClass('bg-destructive')
      expect(removeIcon).toBeInTheDocument()
    })

    it('calls onDelete when clicked', () => {
      const onDelete = jest.fn(async () => {})
      render(<SectionItem section={mockSection} onDelete={onDelete}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onDelete).toHaveBeenCalled()
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<SectionItem section={mockSection} onDelete={async () => {}} onClick={onClick}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

})