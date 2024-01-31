import ModuleItem from '@/components/item-cards/ModuleItem'
import {render, screen} from '@testing-library/react'

const mockModule = {
  id: '1',
  title: 'Test Module',
  description: 'Test Description',
  websiteURL: null,
  courseId: '1'
}

describe('ModuleItem', () => {
  it('renders correctly', () => {
    render(<ModuleItem module={mockModule} />)

    const titleElem = screen.getByText('Test Module')

    expect(titleElem).toBeInTheDocument()
  })

  it('should have a point cursor if onclick defined', () => {
    render(<ModuleItem module={mockModule} onClick={() => {}}/>)

    const item = screen.getByRole('listitem')
    
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })

  describe('should have a website-url button which', () => {
    it('renders correctly', () => {
      render(<ModuleItem module={{...mockModule, websiteURL: 'https://example.com'}} />)

      const websiteURLButton = screen.getAllByRole('link')[0]
      const websiteURLIcon = screen.getByRole('external-view-icon')
    
      expect(websiteURLButton).toBeInTheDocument()
      expect(websiteURLIcon).toBeInTheDocument()
    })

    it('has a href matching module.websiteURL', () => {
      render(<ModuleItem module={{...mockModule, websiteURL: 'https://example.com'}} />)
  
      const websiteURLButton = screen.getAllByRole('link')[0]
  
      expect(websiteURLButton).toHaveAttribute('href', 'https://example.com')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<ModuleItem module={{...mockModule, websiteURL: 'https://example.com'}} onClick={onClick}/>)

      const websiteURLButton = screen.getAllByRole('link')[0]
      websiteURLButton.click()
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have a view button which', () => {
    it('renders correctly', () => {
      render(<ModuleItem module={mockModule} />)

      const viewButton = screen.getAllByRole('link')[0]
      const viewIcon = screen.getByRole('view-icon')
    
      expect(viewButton).toBeInTheDocument()
      expect(viewButton).toHaveClass('bg-transparent')
      expect(viewIcon).toBeInTheDocument()
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<ModuleItem module={mockModule} onClick={onClick}/>)

      const viewButton = screen.getAllByRole('link')[0]
      viewButton.click()

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have an edit button which', () => {
    it('renders correctly', () => {
      render(<ModuleItem module={mockModule} editable/>)

      const editButton = screen.getAllByRole('link')[1]
      const editIcon = screen.getByRole('view-icon')
    
      expect(editButton).toBeInTheDocument()
      expect(editButton).toHaveClass('bg-secondary')
      expect(editIcon).toBeInTheDocument()
    })

    it('has a href matching "/manage/modules/[module_id]', () => {
      render(
        <ModuleItem module={mockModule} editable/>
      )
  
      const editButton = screen.getAllByRole('link')[1]
  
      expect(editButton).toHaveAttribute('href', '/manage/modules/1')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<ModuleItem module={mockModule} editable onClick={onClick}/>)

      const editButton = screen.getAllByRole('link')[1]
      editButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have a delete button which', () => {
    it('renders correctly', () => {
      render(<ModuleItem module={mockModule} onDelete={async () => {}}/>)

      const removeButton = screen.getByRole('button')
      const removeIcon = screen.getByRole('view-icon')
    
      expect(removeButton).toBeInTheDocument()
      expect(removeButton).toHaveClass('bg-destructive')
      expect(removeIcon).toBeInTheDocument()
    })

    it('calls onDelete when clicked', () => {
      const onDelete = jest.fn(async () => {})
      render(<ModuleItem module={mockModule} onDelete={onDelete}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onDelete).toHaveBeenCalled()
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<ModuleItem module={mockModule} onDelete={async () => {}} onClick={onClick}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})