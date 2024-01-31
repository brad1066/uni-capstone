import UploadItem from '@/components/item-cards/UploadItem'
import { render, screen } from '@testing-library/react'

it('should render correctly', () => {
  render(<UploadItem upload={{
    id: '1',
    title: 'Test Upload',
    publicURL: 'https://example.com',
    path: 'test',
    resourceId: '1',
  }}/>)

  const titleElem = screen.getByText('Test Upload')

  expect(titleElem).toBeInTheDocument()
})

describe('should have a download button', () => {
  it('which renders correctly', () => {
    render(<UploadItem upload={{
      id: '1',
      title: 'Test Upload',
      publicURL: 'https://example.com',
      path: 'test',
      resourceId: '1',
    }}/>)

    const viewButton = screen.getAllByRole('link')[0]
    const viewIcon = screen.getByRole('download-icon')
    
    expect(viewButton).toBeInTheDocument()
    expect(viewButton).toHaveClass('bg-transparent')
    expect(viewIcon).toBeInTheDocument()
  })

  it('which has a href matching "upload.publicUrl"?download ', () => {
    render(<UploadItem upload={{
      id: '1',
      title: 'Test Upload',
      publicURL: 'https://example.com',
      path: 'test',
      resourceId: '1',
    }}/>)

    const viewButton = screen.getAllByRole('link')[0]

    expect(viewButton).toHaveAttribute('href', 'https://example.com?download')
  })
})

describe('should have a delete button', () => {
  it('which renders correctly', () => {
    render(
      <UploadItem upload={{
        id: '1',
        title: 'Test Upload',
        description: 'Test Description',
        unitId: '1',
      }} onDelete={async () => {}}/>
    )

    const removeButton = screen.getByRole('button')
    const removeIcon = screen.getByRole('remove-icon')
    
    expect(removeButton).toBeInTheDocument()
    expect(removeButton).toHaveClass('bg-destructive')
    expect(removeIcon).toBeInTheDocument()
  })

  it('which calls onDelete when clicked', () => {
    const onDelete = jest.fn(async () => {})
    render(
      <UploadItem upload={{
        id: '1',
        title: 'Test Upload',
        description: 'Test Description',
        unitId: '1',
      }} onDelete={onDelete}/>
    )

    const removeButton = screen.getByRole('button')
    removeButton.click()
    
    expect(onDelete).toHaveBeenCalled()
  })
})

