import ResourceItem from '@/components/item-cards/ResourceItem'
import {render, screen} from '@testing-library/react'

const mockResource = {
  id: '1',
  title: 'Test Resource',
  description: 'Test Description',
  content: 'Test Content',
  authorUsername: 'test',
  unitId: '1',
}
describe('ResourceItem', () => {
  it('should have a title', () => {
    render(<ResourceItem resource={mockResource} />)

    const titleElem = screen.getByText('Test Resource')

    expect(titleElem).toBeInTheDocument()
  })

  it('should have a pointer cursor if onclick defined', () => {
    render(<ResourceItem resource={mockResource} onClick={() => {}}/>)

    const item = screen.getByRole('listitem')
    
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })

  describe('should have a view button which', () => {
    it('renders correctly', () => {
      render(<ResourceItem resource={mockResource} />)

      const viewButton = screen.getAllByRole('link')[0]
      const viewIcon = screen.getByRole('view-icon')
    
      expect(viewButton).toBeInTheDocument()
      expect(viewButton).toHaveClass('bg-transparent')
      expect(viewIcon).toBeInTheDocument()
    })

    it('has a href matching "/view/resources/[resource_id]', () => {

      render(<ResourceItem resource={mockResource}/>)

      const viewButton = screen.getAllByRole('link')[0]

      expect(viewButton).toHaveAttribute('href', '/view/resources/1')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<ResourceItem resource={mockResource} onClick={onClick}/>)

      const viewButton = screen.getAllByRole('link')[0]
      viewButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have an edit button which', () => {
    it('renders correctly', () => {
      render(<ResourceItem resource={mockResource} editable/>)

      const editButton = screen.getAllByRole('link')[1]
      const editIcon = screen.getByRole('view-icon')
    
      expect(editButton).toBeInTheDocument()
      expect(editButton).toHaveClass('bg-secondary')
      expect(editIcon).toBeInTheDocument()
    })

    it('has a href matching "/manage/resources/[resource_id]', () => {
      render(<ResourceItem resource={mockResource} editable/>)

      const editButton = screen.getAllByRole('link')[1]

      expect(editButton).toHaveAttribute('href', '/manage/resources/1')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<ResourceItem resource={mockResource} editable onClick={onClick}/>)

      const editButton = screen.getAllByRole('link')[1]
      editButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have a delete button which', () => {
    it('renders correctly', () => {
      render(<ResourceItem resource={mockResource} onDelete={async () => {}}/>)

      const removeButton = screen.getByRole('button')
      const removeIcon = screen.getByRole('view-icon')
    
      expect(removeButton).toBeInTheDocument()
      expect(removeButton).toHaveClass('bg-destructive')
      expect(removeIcon).toBeInTheDocument()
    })

    it('calls onDelete when clicked', () => {
      const onDelete = jest.fn(async () => {})
      render(<ResourceItem resource={mockResource} onDelete={onDelete}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onDelete).toHaveBeenCalled()
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<ResourceItem resource={mockResource} onDelete={async () => {}} onClick={onClick}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})