import StudentItem from '@/components/item-cards/StudentItem'
import { render, screen } from '@testing-library/react'

const mockStudent = {
  id: '1',
  username: 'test',
  title: 'Test Section',
  description: 'Test Description',
  courseId: '1'
}

describe('StudentItem', () => {
  it('should render correctly', () => {
    render(<StudentItem student={{
      ...mockStudent,
      user: {
        username: 'test',
        forename: 'Test',
        surname: 'Student',
      }
    }}/>)

    const titleElem = screen.getByText('Test Student')

    expect(titleElem).toBeInTheDocument()
  })

  it('should have a pointer cursor if onclick defined', () => {
    render(<StudentItem student={mockStudent} onClick={() => {}}/>)

    const item = screen.getByRole('listitem')
    
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })

  describe('should have a view button which', () => {
    it('renders correctly', () => {
      render(<StudentItem student={mockStudent}/>)

      const viewButton = screen.getAllByRole('link')[0]
      const viewIcon = screen.getByRole('view-icon')
    
      expect(viewButton).toBeInTheDocument()
      expect(viewButton).toHaveClass('bg-transparent')
      expect(viewIcon).toBeInTheDocument()
    })

    it('has a href matching "/profile/[user_id]', () => {
      render(<StudentItem student={mockStudent}/>)

      const viewButton = screen.getAllByRole('link')[0]

      expect(viewButton).toHaveAttribute('href', '/profile/test')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<StudentItem student={mockStudent} onClick={onClick}/>)

      const viewButton = screen.getAllByRole('link')[0]
      viewButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have an edit button which', () => {
    it('renders correctly', () => {
      render(<StudentItem student={mockStudent} editable/>)

      const editButton = screen.getAllByRole('link')[1]
      const editIcon = screen.getByRole('view-icon')
    
      expect(editButton).toBeInTheDocument()
      expect(editButton).toHaveClass('bg-secondary')
      expect(editIcon).toBeInTheDocument()
    })

    it('has a href matching "/manage/users/[user_id]', () => {
      render(<StudentItem student={mockStudent} editable/>)

      const editButton = screen.getAllByRole('link')[1]

      expect(editButton).toHaveAttribute('href', '/manage/users/test')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<StudentItem student={mockStudent} editable onClick={onClick}/>)

      const editButton = screen.getAllByRole('link')[1]
      editButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have a delete button which', () => {
    it('renders correctly', () => {
      render(<StudentItem student={mockStudent} onDelete={async () => {}}/>)

      const removeButton = screen.getByRole('button')
      const removeIcon = screen.getByRole('view-icon')
    
      expect(removeButton).toBeInTheDocument()
      expect(removeButton).toHaveClass('bg-destructive')
      expect(removeIcon).toBeInTheDocument()
    })

    it('calls onDelete when clicked', () => {
      const onDelete = jest.fn(async () => {})
      render(<StudentItem student={mockStudent} onDelete={onDelete}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onDelete).toHaveBeenCalled()
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<StudentItem student={mockStudent} onDelete={async () => {}} onClick={onClick}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

})