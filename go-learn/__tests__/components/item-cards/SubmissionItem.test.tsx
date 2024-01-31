import SubmissionItem from '@/components/item-cards/SubmissionItem'
import { render, screen } from '@testing-library/react'

it('should render correctly', () => {
  render(<SubmissionItem submission={{
    id: '1',
    title: 'Test Submission',
    description: 'Test Description',
    unitId: '1',
  }}/>)

  const titleElem = screen.getByText('Test Submission')

  expect(titleElem).toBeInTheDocument()
})

it('should have a point cursor if onclick defined', () => {
  render(<SubmissionItem submission={{
    id: '1',
    title: 'Test Submission',
    description: 'Test Description',
    unitId: '1',
  }} onClick={() => {}}/>)

  const item = screen.getByRole('listitem')
    
  expect(item).toBeInTheDocument()
  expect(item).toHaveClass('cursor-pointer')
})

describe('should have a view button', () => {
  it('which renders correctly', () => {
    render(<SubmissionItem submission={{
      id: '1',
      title: 'Test Submission',
      description: 'Test Description',
      unitId: '1',
    }}/>)

    const viewButton = screen.getAllByRole('link')[0]
    const viewIcon = screen.getByRole('view-icon')
    
    expect(viewButton).toBeInTheDocument()
    expect(viewButton).toHaveClass('bg-transparent')
    expect(viewIcon).toBeInTheDocument()
  })

  it('which has a href matching "/view/submissions/[submission_id]', () => {
    render(<SubmissionItem submission={{
      id: '1',
      title: 'Test Submission',
      description: 'Test Description',
      unitId: '1',
    }}/>)

    const viewButton = screen.getAllByRole('link')[0]

    expect(viewButton).toHaveAttribute('href', '/view/submissions/1')
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(<SubmissionItem submission={{
      id: '1',
      title: 'Test Submission',
      description: 'Test Description',
      unitId: '1',
    }} onClick={onClick}/>)

    const viewButton = screen.getAllByRole('link')[0]
    viewButton.click()
    
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('should have a delete button', () => {
  it('which renders correctly', () => {
    render(
      <SubmissionItem submission={{
        id: '1',
        title: 'Test Submission',
        description: 'Test Description',
        unitId: '1',
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
      <SubmissionItem submission={{
        id: '1',
        title: 'Test Submission',
        description: 'Test Description',
        unitId: '1',
      }} onDelete={onDelete}/>
    )

    const removeButton = screen.getByRole('button')
    removeButton.click()
    
    expect(onDelete).toHaveBeenCalled()
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <SubmissionItem submission={{
        id: '1',
        title: 'Test Submission',
        authorUsername: 'test',
        assignmentId: '1',
        uploadId: '1',
      }} onDelete={async () => {}} onClick={onClick}/>
    )

    const removeButton = screen.getByRole('button')
    removeButton.click()
    
    expect(onClick).not.toHaveBeenCalled()
  })
})

