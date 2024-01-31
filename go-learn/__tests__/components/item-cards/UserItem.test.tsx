import UserItem from '@/components/item-cards/UserItem'
import { render, screen } from '@testing-library/react'

const mockUser = {
  id: '1',
  username: 'test',
  title: 'Mr',
  forename: 'Test',
  surname: 'User',
  emergencyContactId: '1',
  termAddressId: '1',
  homeAddressId: '1',
  courseId: '1',
}

describe('UserItem', () => {
  it('should have a title', () => {
    render(<UserItem user={mockUser}/>)

    const titleElem = screen.getByText('Mr Test User')

    expect(titleElem).toBeInTheDocument()
  })

  it('should have a point cursor if onclick defined', () => {
    render(<UserItem user={mockUser} onClick={() => {}}/>)

    const item = screen.getByRole('listitem')
    
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })

  describe('should have a view button which', () => {
    it('renders correctly', () => {
      render(<UserItem user={mockUser}/>)

      const viewButton = screen.getAllByRole('link')[0]
      const viewIcon = screen.getByRole('view-icon')
    
      expect(viewButton).toBeInTheDocument()
      expect(viewButton).toHaveClass('bg-transparent')
      expect(viewIcon).toBeInTheDocument()
    })

    it('has a href matching "/profile/[user_id]', () => {
      render(<UserItem user={mockUser}/>)

      const viewButton = screen.getAllByRole('link')[0]

      expect(viewButton).toHaveAttribute('href', '/profile/test')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<UserItem user={mockUser} onClick={onClick}/>)

      const viewButton = screen.getAllByRole('link')[0]
      viewButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have an edit button which', () => {
    it('renders correctly', () => {
      render(<UserItem user={mockUser} editable/>)

      const editButton = screen.getAllByRole('link')[1]
      const editIcon = screen.getByRole('view-icon')
    
      expect(editButton).toBeInTheDocument()
      expect(editButton).toHaveClass('bg-secondary')
      expect(editIcon).toBeInTheDocument()
    })

    it('has a href matching "/manage/users/[user_id]', () => {
      render(<UserItem user={mockUser} editable/>)

      const editButton = screen.getAllByRole('link')[1]

      expect(editButton).toHaveAttribute('href', '/manage/users/test')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<UserItem user={mockUser} editable onClick={onClick}/>)

      const editButton = screen.getAllByRole('link')[1]
      editButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have a delete button which', () => {
    it('renders correctly', () => {
      render(<UserItem user={mockUser} onDelete={async () => {}}/>)

      const removeButton = screen.getByRole('button')
      const removeIcon = screen.getByRole('view-icon')
    
      expect(removeButton).toBeInTheDocument()
      expect(removeButton).toHaveClass('bg-destructive')
      expect(removeIcon).toBeInTheDocument()
    })

    it('calls onDelete when clicked', () => {
      const onDelete = jest.fn(async () => {})
      render(<UserItem user={mockUser} onDelete={onDelete}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onDelete).toHaveBeenCalled()
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<UserItem user={mockUser} onDelete={async () => {}} onClick={onClick}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})