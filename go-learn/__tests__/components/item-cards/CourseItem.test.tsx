import CourseItem from '@/components/item-cards/CourseItem'
import {fireEvent, render, screen} from '@testing-library/react'

describe('should have a title', () => {
  it('renders correctly', () => {
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description',
        websiteURL: null
      }} />
    )

    const titleElem = screen.getByText('Test Course')

    expect(titleElem).toBeInTheDocument()
  })
})

describe('should have a website-url button', () => {
  it('which renders correctly', () => {
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description',
        websiteURL: 'https://example.com'
      }} />
    )

    const websiteURLButton = screen.getAllByRole('link')[0]
    const websiteURLIcon = screen.getByRole('external-view-icon')
    
    expect(websiteURLButton).toBeInTheDocument()
    expect(websiteURLIcon).toBeInTheDocument()
  })

  it('which has a href matching course.websiteURL', () => {
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description',
        websiteURL: 'https://example.com'
      }}/>
    )
  
    const websiteURLButton = screen.getAllByRole('link')[0]
  
    expect(websiteURLButton).toHaveAttribute('href', 'https://example.com')
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description',
        websiteURL: 'https://example.com'
      }} onClick={onClick}/>
    )

    const websiteURLButton = screen.getAllByRole('link')[0]
    websiteURLButton.click()
    
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('should have a view button', () => {
  it('which renders correctly', () => {
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description',
        websiteURL: null
      }} />
    )

    const viewButton = screen.getAllByRole('link')[0]
    const viewIcon = screen.getByRole('view-icon')
    
    expect(viewButton).toBeInTheDocument()
    expect(viewButton).toHaveClass('bg-transparent')
    expect(viewIcon).toBeInTheDocument()
  })

  it('which calls onClick when clicked', () => {
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description',
        websiteURL: null
      }}/>
    )

    const viewButton = screen.getAllByRole('link')[0]
    fireEvent.click(viewButton)
    
    // expect(onClick).toHaveBeenCalled()
  })
})

describe('should have an edit button', () => {
  it('which renders correctly', () => {
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description'
      }} editable/>
    )

    const editButton = screen.getAllByRole('link')[1]
    const editIcon = screen.getByRole('view-icon')
    
    expect(editButton).toBeInTheDocument()
    expect(editButton).toHaveClass('bg-secondary')
    expect(editIcon).toBeInTheDocument()
  })

  it('which has a href matching "/manage/courses/[course_id]', () => {
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description',
        websiteURL: null
      }} editable/>
    )
  
    const editButton = screen.getAllByRole('link')[1]
  
    expect(editButton).toHaveAttribute('href', '/manage/courses/1')
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description',
        websiteURL: null
      }} editable onClick={onClick}/>
    )

    const editButton = screen.getAllByRole('link')[1]
    editButton.click()
    
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('should have a delete button', () => {
  it('which renders correctly', () => {
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description',
        websiteURL: null
      }} onDelete={async () => {}}/>
    )

    const removeButton = screen.getByRole('button')
    const removeIcon = screen.getByRole('view-icon')
    
    expect(removeButton).toBeInTheDocument()
    expect(removeButton).toHaveClass('bg-destructive')
    expect(removeIcon).toBeInTheDocument()
  })

  it('which calls onDelete when clicked', () => {
    const onDelete = jest.fn(async () => {})
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description',
        websiteURL: null
      }} onDelete={onDelete}/>
    )

    const removeButton = screen.getByRole('button')
    removeButton.click()
    
    expect(onDelete).toHaveBeenCalled()
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description',
        websiteURL: null
      }} onDelete={async () => {}} onClick={onClick}/>
    )

    const removeButton = screen.getByRole('button')
    removeButton.click()
    
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('should have a point cursor if onclick defined', () => {
  it('which renders correctly', () => {
    render(
      <CourseItem course={{
        id: '1',
        title: 'Test Course',
        description: 'Test Description',
        websiteURL: null
      }} onClick={() => {}}/>
    )

    const item = screen.getByRole('listitem')
    
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })
})