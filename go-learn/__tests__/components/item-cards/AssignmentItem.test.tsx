import AssignmentItem from '@/components/item-cards/AssignmentItem'
import {render, screen} from '@testing-library/react'

const mockAssignment = {
  id: 1,
  title: 'Test Assignment',
  description: 'Test Description',
  dueDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('AssignmentItem', () => {
  it('renders correctly', () => {
    render(<AssignmentItem assignment={mockAssignment} />)

    const titleElem = screen.getByText('Test Assignment')

    expect(titleElem).toBeInTheDocument()
  })

  it('has a pointer cursor when onClick is defined', () => {
    render(<AssignmentItem assignment={mockAssignment} onClick={() => {}}/>)

    const item = screen.getByRole('listitem')
    
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })

  describe('has a view button which', () => {
    it('renders correctly', () => {
      render(<AssignmentItem assignment={mockAssignment} />)

      const viewButton = screen.getAllByRole('link')[0]
      const viewIcon = screen.getByRole('view-icon')
    
      expect(viewButton).toBeInTheDocument()
      expect(viewButton).toHaveClass('bg-transparent')
      expect(viewIcon).toBeInTheDocument()
    })

    it('has a href matching "/view/assignments/[assignment_id]', () => {
      render(<AssignmentItem assignment={mockAssignment} />)

      const viewButton = screen.getAllByRole('link')[0]

      expect(viewButton).toHaveAttribute('href', '/view/assignments/1')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<AssignmentItem assignment={mockAssignment} onClick={onClick}/>)

      const viewButton = screen.getAllByRole('link')[0]
      viewButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('has an edit button which', () => {
    it('renders correctly', () => {
      render(<AssignmentItem assignment={mockAssignment} editable/>)
  
      const editButton = screen.getAllByRole('link')[1]
      const editIcon = screen.getByRole('view-icon')
      
      expect(editButton).toBeInTheDocument()
      expect(editButton).toHaveClass('bg-secondary')
      expect(editIcon).toBeInTheDocument()
    })
  
    it('has a href matching "/manage/assignments/[assignment_id]', () => {
      render(<AssignmentItem assignment={mockAssignment} editable/>)
  
      const editButton = screen.getAllByRole('link')[1]
  
      expect(editButton).toHaveAttribute('href', '/manage/assignments/1')
    })
  
    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<AssignmentItem assignment={mockAssignment} editable onClick={onClick}/>)
  
      const editButton = screen.getAllByRole('link')[1]
      editButton.click()
      
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('has a delete button which', () => {
    it('whh renders correctly', () => {
      render(<AssignmentItem assignment={mockAssignment} onDelete={async () => {}}/>)

      const removeButton = screen.getByRole('button')
      const removeIcon = screen.getByRole('view-icon')
    
      expect(removeButton).toBeInTheDocument()
      expect(removeButton).toHaveClass('bg-destructive')
      expect(removeIcon).toBeInTheDocument()
    })

    it('calls onDelete when clicked', () => {
      const onDelete = jest.fn(async () => {})
      render(<AssignmentItem assignment={mockAssignment} onDelete={onDelete}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onDelete).toHaveBeenCalled()
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<AssignmentItem assignment={mockAssignment} onDelete={async () => {}} onClick={onClick}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})