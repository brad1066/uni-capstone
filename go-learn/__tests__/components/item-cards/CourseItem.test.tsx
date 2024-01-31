import CourseItem from '@/components/item-cards/CourseItem'
import {render, screen} from '@testing-library/react'

const mockCourse = {
  id: '1',
  title: 'Test Course',
  description: 'Test Description',
  websiteURL: null
}

describe('CourseItem', () => {
  it('renders correctly', () => {
    render(<CourseItem course={mockCourse} />)

    const titleElem = screen.getByText('Test Course')

    expect(titleElem).toBeInTheDocument()
  })

  it('should have a point cursor if onclick defined', () => {
    render(<CourseItem course={mockCourse} onClick={() => {}}/>)
  
    const item = screen.getByRole('listitem')
      
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })

  describe('should have a website-url button which', () => {
    it('renders correctly', () => {
      render(<CourseItem course={{...mockCourse, websiteURL: 'https://example.com'}} />)

      const websiteURLButton = screen.getAllByRole('link')[0]
      const websiteURLIcon = screen.getByRole('external-view-icon')
    
      expect(websiteURLButton).toBeInTheDocument()
      expect(websiteURLIcon).toBeInTheDocument()
    })

    it('has a href matching course.websiteURL', () => {
      render(<CourseItem course={{...mockCourse, websiteURL: 'https://example.com'}} />)
  
      const websiteURLButton = screen.getAllByRole('link')[0]
  
      expect(websiteURLButton).toHaveAttribute('href', 'https://example.com')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<CourseItem course={{...mockCourse, websiteURL: 'https://example.com'}} onClick={onClick}/>)

      const websiteURLButton = screen.getAllByRole('link')[0]
      websiteURLButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have a view button which', () => {
    it('renders correctly', () => {
      render(<CourseItem course={mockCourse} />)

      const viewButton = screen.getAllByRole('link')[0]
      const viewIcon = screen.getByRole('view-icon')
    
      expect(viewButton).toBeInTheDocument()
      expect(viewButton).toHaveClass('bg-transparent')
      expect(viewIcon).toBeInTheDocument()
    })

    it('has a href matching "/view/courses/[course_id]', () => {
      render(<CourseItem course={mockCourse} />)

      const viewButton = screen.getAllByRole('link')[0]

      expect(viewButton).toHaveAttribute('href', '/view/courses/1')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<CourseItem course={mockCourse} onClick={onClick}/>)

      const viewButton = screen.getAllByRole('link')[0]
      viewButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have an edit button which', () => {
    it('renders correctly', () => {
      render(<CourseItem course={mockCourse} editable/>)

      const editButton = screen.getAllByRole('link')[1]
      const editIcon = screen.getByRole('view-icon')
    
      expect(editButton).toBeInTheDocument()
      expect(editButton).toHaveClass('bg-secondary')
      expect(editIcon).toBeInTheDocument()
    })

    it('has a href matching "/manage/courses/[course_id]', () => {
      render(<CourseItem course={mockCourse} editable/>)
  
      const editButton = screen.getAllByRole('link')[1]
  
      expect(editButton).toHaveAttribute('href', '/manage/courses/1')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<CourseItem course={mockCourse} editable onClick={onClick}/>)

      const editButton = screen.getAllByRole('link')[1]
      editButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have a delete button which', () => {
    it('renders correctly', () => {
      render(<CourseItem course={mockCourse} onDelete={async () => {}}/>)

      const removeButton = screen.getByRole('button')
      const removeIcon = screen.getByRole('view-icon')
    
      expect(removeButton).toBeInTheDocument()
      expect(removeButton).toHaveClass('bg-destructive')
      expect(removeIcon).toBeInTheDocument()
    })

    it('calls onDelete when clicked', () => {
      const onDelete = jest.fn(async () => {})
      render(<CourseItem course={mockCourse} onDelete={onDelete}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onDelete).toHaveBeenCalled()
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<CourseItem course={mockCourse} onDelete={async () => {}} onClick={onClick}/>)

      const removeButton = screen.getByRole('button')
      removeButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})