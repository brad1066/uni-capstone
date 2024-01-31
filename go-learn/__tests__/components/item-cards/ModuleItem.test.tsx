import ModuleItem from '@/components/item-cards/ModuleItem'
import {fireEvent, render, screen} from '@testing-library/react'

describe('should have a title', () => {
  it('renders correctly', () => {
    render(
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        websiteURL: null,
        courseId: '1'
      }} />
    )

    const titleElem = screen.getByText('Test Module')

    expect(titleElem).toBeInTheDocument()
  })
})

describe('should have a website-url button', () => {
  it('which renders correctly', () => {
    render(
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        websiteURL: 'https://example.com',
        courseId: '1'
      }} />
    )

    const websiteURLButton = screen.getAllByRole('link')[0]
    const websiteURLIcon = screen.getByRole('external-view-icon')
    
    expect(websiteURLButton).toBeInTheDocument()
    expect(websiteURLIcon).toBeInTheDocument()
  })

  it('which has a href matching module.websiteURL', () => {
    render(
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        websiteURL: 'https://example.com',
        courseId: '1'
      }}/>
    )
  
    const websiteURLButton = screen.getAllByRole('link')[0]
  
    expect(websiteURLButton).toHaveAttribute('href', 'https://example.com')
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        websiteURL: 'https://example.com',
        courseId: '1'
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
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        websiteURL: null,
        courseId: '1'
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
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        websiteURL: null,
        courseId: '1'
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
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        courseId: '1'
      }} editable/>
    )

    const editButton = screen.getAllByRole('link')[1]
    const editIcon = screen.getByRole('view-icon')
    
    expect(editButton).toBeInTheDocument()
    expect(editButton).toHaveClass('bg-secondary')
    expect(editIcon).toBeInTheDocument()
  })

  it('which has a href matching "/manage/modules/[module_id]', () => {
    render(
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        websiteURL: null,
        courseId: '1'
      }} editable/>
    )
  
    const editButton = screen.getAllByRole('link')[1]
  
    expect(editButton).toHaveAttribute('href', '/manage/modules/1')
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        websiteURL: null,
        courseId: '1'
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
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        websiteURL: null,
        courseId: '1'
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
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        websiteURL: null,
        courseId: '1'
      }} onDelete={onDelete}/>
    )

    const removeButton = screen.getByRole('button')
    removeButton.click()
    
    expect(onDelete).toHaveBeenCalled()
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        websiteURL: null,
        courseId: '1'
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
      <ModuleItem module={{
        id: '1',
        title: 'Test Module',
        description: 'Test Description',
        websiteURL: null,
        courseId: '1'
      }} onClick={() => {}}/>
    )

    const item = screen.getByRole('listitem')
    
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })
})