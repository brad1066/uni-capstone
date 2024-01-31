import UnitItem from '@/components/item-cards/UnitItem'
import {render, screen} from '@testing-library/react'

const mockUnit = {
  id: '1',
  title: 'Test Unit',
  description: 'Test Description',
  courseId: '1',
}

describe('UnitItem', () => {
  it('should have a title', () => {
    render(
      <UnitItem unit={mockUnit} />
    )

    const titleElem = screen.getByText('Test Unit')

    expect(titleElem).toBeInTheDocument()
  })

  it('should have a point cursor if onclick defined', () => {
    render(
      <UnitItem unit={mockUnit} onClick={() => {}}/>
    )

    const item = screen.getByRole('listitem')
    
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })

  describe('should have a view button which', () => {
    it('renders correctly', () => {
      render(
        <UnitItem unit={mockUnit} />
      )

      const viewButton = screen.getAllByRole('link')[0]
      const viewIcon = screen.getByRole('view-icon')
    
      expect(viewButton).toBeInTheDocument()
      expect(viewButton).toHaveClass('bg-transparent')
      expect(viewIcon).toBeInTheDocument()
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(
        <UnitItem unit={mockUnit} onClick={onClick}/>
      )

      const viewButton = screen.getAllByRole('link')[0]
      viewButton.click()

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have an edit button which', () => {
    it('renders correctly', () => {
      render(
        <UnitItem unit={mockUnit} editable/>
      )

      const editButton = screen.getAllByRole('link')[1]
      const editIcon = screen.getByRole('view-icon')
    
      expect(editButton).toBeInTheDocument()
      expect(editButton).toHaveClass('bg-secondary')
      expect(editIcon).toBeInTheDocument()
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(
        <UnitItem unit={mockUnit} editable onClick={onClick}/>
      )

      const editButton = screen.getAllByRole('link')[1]
      editButton.click()
      
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have a delete button which', () => {
    it('renders correctly', () => {
      render(
        <UnitItem unit={mockUnit} onDelete={async () => {}}/>
      )

      const removeButton = screen.getByRole('button')
      const removeIcon = screen.getByRole('view-icon')
    
      expect(removeButton).toBeInTheDocument()
      expect(removeButton).toHaveClass('bg-destructive')
      expect(removeIcon).toBeInTheDocument()
    })

    it('calls onDelete when clicked', () => {
      const onDelete = jest.fn(async () => {})
      render(
        <UnitItem unit={mockUnit} onDelete={onDelete}/>
      )

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onDelete).toHaveBeenCalled()
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(
        <UnitItem unit={mockUnit} onDelete={async () => {}} onClick={onClick}/>
      )

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})