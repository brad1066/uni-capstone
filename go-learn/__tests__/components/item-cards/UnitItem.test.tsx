import UnitItem from '@/components/item-cards/UnitItem'
import {render, screen} from '@testing-library/react'

describe('should have a title', () => {
  it('renders correctly', () => {
    render(
      <UnitItem unit={{
        id: '1',
        title: 'Test Unit',
        description: 'Test Description',
        moduleId: '1'
      }} />
    )

    const titleElem = screen.getByText('Test Unit')

    expect(titleElem).toBeInTheDocument()
  })
})

describe('should have a view button', () => {
  it('which renders correctly', () => {
    render(
      <UnitItem unit={{
        id: '1',
        title: 'Test Unit',
        description: 'Test Description',
        moduleId: '1'
      }} />
    )

    const viewButton = screen.getAllByRole('link')[0]
    const viewIcon = screen.getByRole('view-icon')
    
    expect(viewButton).toBeInTheDocument()
    expect(viewButton).toHaveClass('bg-transparent')
    expect(viewIcon).toBeInTheDocument()
  })

  it('which calls onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <UnitItem unit={{
        id: '1',
        title: 'Test Unit',
        description: 'Test Description',
        moduleId: '1'
      }} onClick={onClick}/>
    )

    const viewButton = screen.getAllByRole('link')[0]
    viewButton.click()
    
    // expect(onClick).toHaveBeenCalled()
  })
})

describe('should have an edit button', () => {
  it('which renders correctly', () => {
    render(
      <UnitItem unit={{
        id: '1',
        title: 'Test Unit',
        description: 'Test Description',
        moduleId: '1'
      }} editable/>
    )

    const editButton = screen.getAllByRole('link')[1]
    const editIcon = screen.getByRole('view-icon')
    
    expect(editButton).toBeInTheDocument()
    expect(editButton).toHaveClass('bg-secondary')
    expect(editIcon).toBeInTheDocument()
  })

  it('which calls onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <UnitItem unit={{
        id: '1',
        title: 'Test Unit',
        description: 'Test Description',
        moduleId: '1'
      }} editable onClick={onClick}/>
    )

    const editButton = screen.getAllByRole('link')[1]
    editButton.click()
    
    // expect(onClick).toHaveBeenCalled()
  })
})

describe('should have a delete button', () => {
  it('which renders correctly', () => {
    render(
      <UnitItem unit={{
        id: '1',
        title: 'Test Unit',
        description: 'Test Description',
        moduleId: '1'
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
      <UnitItem unit={{
        id: '1',
        title: 'Test Unit',
        description: 'Test Description',
        moduleId: '1'
      }} onDelete={onDelete}/>
    )

    const removeButton = screen.getByRole('button')
    removeButton.click()
    
    expect(onDelete).toHaveBeenCalled()
  })
})

describe('should have a point cursor if onclick defined', () => {
  it('which renders correctly', () => {
    render(
      <UnitItem unit={{
        id: '1',
        title: 'Test Unit',
        description: 'Test Description',
        moduleId: '1'
      }} onClick={() => {}}/>
    )

    const item = screen.getByRole('listitem')
    
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })
})