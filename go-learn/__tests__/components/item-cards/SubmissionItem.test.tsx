import SubmissionItem from '@/components/item-cards/SubmissionItem'
import { render, screen } from '@testing-library/react'

const mockSubmission = {
  id: '1',
  title: 'Test Submission',
  description: 'Test Description',
  unitId: '1',
}

describe('SubmissionItem', () => {
  it('should render correctly', () => {
    render(<SubmissionItem submission={mockSubmission}/>)

    const titleElem = screen.getByText('Test Submission')

    expect(titleElem).toBeInTheDocument()
  })

  it('should have a point cursor if onclick defined', () => {
    render(<SubmissionItem submission={mockSubmission} onClick={() => {}}/>)

    const item = screen.getByRole('listitem')
    
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('cursor-pointer')
  })

  describe('should have a view button which', () => {
    it('renders correctly', () => {
      render(<SubmissionItem submission={mockSubmission}/>)

      const viewButton = screen.getAllByRole('link')[0]
      const viewIcon = screen.getByRole('view-icon')
    
      expect(viewButton).toBeInTheDocument()
      expect(viewButton).toHaveClass('bg-transparent')
      expect(viewIcon).toBeInTheDocument()
    })

    it('has a href matching "/view/submissions/[submission_id]', () => {
      render(<SubmissionItem submission={mockSubmission}/>)

      const viewButton = screen.getAllByRole('link')[0]

      expect(viewButton).toHaveAttribute('href', '/view/submissions/1')
    })

    it('doesn\'t call onClick when clicked', () => {
      const onClick = jest.fn(() => {})
      render(<SubmissionItem submission={mockSubmission} onClick={onClick}/>)

      const viewButton = screen.getAllByRole('link')[0]
      viewButton.click()
    
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('should have a delete button which', () => {
    it('renders correctly', () => {
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

    it('calls onDelete when clicked', () => {
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

    it('doesn\'t call onClick when clicked', () => {
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

})