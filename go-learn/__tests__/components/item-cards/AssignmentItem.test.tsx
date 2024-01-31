import AssignmentItem from '@/components/item-cards/AssignmentItem'
import {render, screen} from '@testing-library/react'

describe('should have a title', () => {
  it('renders correctly', () => {
    render(
      <AssignmentItem assignment={{
        id: 1,
        title: 'Test Assignment',
        description: 'Test Description',
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }} />
    )

    const titleElem = screen.getByText('Test Assignment')

    expect(titleElem).toBeInTheDocument()
  })
})

describe('should have a view button', () => {
  it('which renders correctly', () => {
    render(
      <AssignmentItem assignment={{
        id: 1,
        title: 'Test Assignment',
        description: 'Test Description',
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }} />
    )

    const viewButton = screen.getAllByRole('link')[0]
    const viewIcon = screen.getByRole('view-icon')
    
    expect(viewButton).toBeInTheDocument()
    expect(viewButton).toHaveClass('bg-transparent')
    expect(viewIcon).toBeInTheDocument()
  })

  it('which has a href matching "/view/assignments/[assignment_id]', () => {

    render(
      <AssignmentItem assignment={{
        id: 1,
        title: 'Test Assignment',
        description: 'Test Description',
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }}/>
    )

    const viewButton = screen.getAllByRole('link')[0]

    expect(viewButton).toHaveAttribute('href', '/view/assignments/1')
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <AssignmentItem assignment={{
        id: 1,
        title: 'Test Assignment',
        description: 'Test Description',
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }} onClick={onClick}/>
    )

    const viewButton = screen.getAllByRole('link')[0]
    viewButton.click()
    
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('should have an edit button', () => {
  it('which renders correctly', () => {
    render(
      <AssignmentItem assignment={{
        id: 1,
        title: 'Test Assignment',
        description: 'Test Description',
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }} editable/>
    )

    const editButton = screen.getAllByRole('link')[1]
    const editIcon = screen.getByRole('view-icon')
    
    expect(editButton).toBeInTheDocument()
    expect(editButton).toHaveClass('bg-secondary')
    expect(editIcon).toBeInTheDocument()
  })

  it('which has a href matching "/manage/assignments/[assignment_id]', () => {
    render(
      <AssignmentItem assignment={{
        id: 1,
        title: 'Test Assignment',
        description: 'Test Description',
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }} editable/>
    )

    const editButton = screen.getAllByRole('link')[1]

    expect(editButton).toHaveAttribute('href', '/manage/assignments/1')
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <AssignmentItem assignment={{
        id: 1,
        title: 'Test Assignment',
        description: 'Test Description',
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
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
      <AssignmentItem assignment={{
        id: 1,
        title: 'Test Assignment',
        description: 'Test Description',
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
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
      <AssignmentItem assignment={{
        id: 1,
        title: 'Test Assignment',
        description: 'Test Description',
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }} onDelete={onDelete}/>
    )

    const removeButton = screen.getByRole('button')
    removeButton.click()
    
    expect(onDelete).toHaveBeenCalled()
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <AssignmentItem assignment={{
        id: 1,
        title: 'Test Assignment',
        description: 'Test Description',
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
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
      <AssignmentItem assignment={{
        id: 1,
        title: 'Test Assignment',
        description: 'Test Description',
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }} onClick={() => {}}/>
    )

    const item = screen.getByRole('listitem')
    
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })
})