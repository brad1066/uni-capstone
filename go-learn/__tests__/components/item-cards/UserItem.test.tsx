import UserItem from '@/components/item-cards/UserItem'
import { render, screen } from '@testing-library/react'

it('should render correctly', () => {
  render(<UserItem user={{
    username: 'test',
    password: 'test',
    title: 'Mr',
    forename: 'Test',
    middleNames: 'Test',
    surname: 'User',
    letters: 'Mr Test User',
    role: 'student',
    contactId: '1',
  }}/>)

  const titleElem = screen.getByText('Mr Test User')

  expect(titleElem).toBeInTheDocument()
})

it('should have a point cursor if onclick defined', () => {
  render(<UserItem user={{
    username: 'test',
    password: 'test',
    title: 'Mr',
    forename: 'Test',
    middleNames: 'Test',
    surname: 'User',
    letters: 'Mr Test User',
    role: 'student',
    contactId: '1',
  }} onClick={() => {}}/>)

  const item = screen.getByRole('listitem')
    
  expect(item).toBeInTheDocument()
  expect(item).toHaveClass('cursor-pointer')
})

describe('should have a view button', () => {
  it('which renders correctly', () => {
    render(<UserItem user={{
      username: 'test',
      password: 'test',
      title: 'Mr',
      forename: 'Test',
      middleNames: 'Test',
      surname: 'User',
      letters: 'Mr Test User',
      role: 'student',
      contactId: '1',
    }}/>)

    const viewButton = screen.getAllByRole('link')[0]
    const viewIcon = screen.getByRole('view-icon')
    
    expect(viewButton).toBeInTheDocument()
    expect(viewButton).toHaveClass('bg-transparent')
    expect(viewIcon).toBeInTheDocument()
  })

  it('which has a href matching "/profile/[user_id]', () => {
    render(<UserItem user={{
      username: 'test',
      password: 'test',
      title: 'Mr',
      forename: 'Test',
      middleNames: 'Test',
      surname: 'User',
      letters: 'Mr Test User',
      role: 'student',
      contactId: '1',
    }}/>)

    const viewButton = screen.getAllByRole('link')[0]

    expect(viewButton).toHaveAttribute('href', '/profile/test')
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(<UserItem user={{
      username: 'test',
      password: 'test',
      title: 'Mr',
      forename: 'Test',
      middleNames: 'Test',
      surname: 'User',
      letters: 'Mr Test User',
      role: 'student',
      contactId: '1',
    }} onClick={onClick}/>)

    const viewButton = screen.getAllByRole('link')[0]
    viewButton.click()
    
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('should have an edit button', () => {
  it('which renders correctly', () => {
    render(
      <UserItem user={{
        id: '1',
        username: 'test',
        emergencyContactId: '1',
        termAddressId: '1',
        homeAddressId: '1',
        courseId: '1',
      }} editable/>
    )

    const editButton = screen.getAllByRole('link')[1]
    const editIcon = screen.getByRole('view-icon')
    
    expect(editButton).toBeInTheDocument()
    expect(editButton).toHaveClass('bg-secondary')
    expect(editIcon).toBeInTheDocument()
  })

  it('which has a href matching "/manage/users/[user_id]', () => {
    render(
      <UserItem user={{
        id: '1',
        username: 'test',
        emergencyContactId: '1',
        termAddressId: '1',
        homeAddressId: '1',
        courseId: '1',
      }} editable/>
    )

    const editButton = screen.getAllByRole('link')[1]

    expect(editButton).toHaveAttribute('href', '/manage/users/test')
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <UserItem user={{
        id: '1',
        username: 'test',
        emergencyContactId: '1',
        termAddressId: '1',
        homeAddressId: '1',
        courseId: '1',
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
      <UserItem user={{
        id: '1',
        username: 'test',
        emergencyContactId: '1',
        termAddressId: '1',
        homeAddressId: '1',
        courseId: '1',
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
      <UserItem user={{
        id: '1',
        username: 'test',
        emergencyContactId: '1',
        termAddressId: '1',
        homeAddressId: '1',
        courseId: '1',
      }} onDelete={onDelete}/>
    )

    const removeButton = screen.getByRole('button')
    removeButton.click()
    
    expect(onDelete).toHaveBeenCalled()
  })

  it('which doesn\'t call onClick when clicked', () => {
    const onClick = jest.fn(() => {})
    render(
      <UserItem user={{
        id: '1',
        username: 'test',
        emergencyContactId: '1',
        termAddressId: '1',
        homeAddressId: '1',
        courseId: '1',
      }} onDelete={async () => {}} onClick={onClick}/>
    )

    const removeButton = screen.getByRole('button')
    removeButton.click()
    
    expect(onClick).not.toHaveBeenCalled()
  })
})

