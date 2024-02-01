import { User } from '@prisma/client'
import { prismaMock } from '../../prismaMock'
import { changePassword, checkLoginCredentials, createUser, getUser, getUsers, getUsersByRole, updateUser } from '@/actions/userActions'

describe('createUser', () => {
  it('should create a new user', async () => {
    const user = {
      forename: 'Test',
      surname: 'User',
      role: 'admin',
    }

    prismaMock.user.create.mockResolvedValue({
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      middleNames: '',
      letters: '',
      role: 'admin',
      password: 'hashedPassword'
    })

    await expect(createUser(user)).resolves.toEqual({
      ...user,
      username: 'tu12345',
      middleNames: '',
      letters: '',
      password: 'hashedPassword',
    })
  })

  it('should create a new user with contact details', async () => {
    const user = {
      forename: 'Test',
      surname: 'User',
      role: 'admin',
      contactDetails: {
        email: 'test@test.com',
        mobile: '01234567890',
      },
    }

    // Initial user creation
    prismaMock.user.create.mockResolvedValue({
      username: 'tu12345',
      title: 'Mr',
      forename: 'Test',
      surname: 'User',
      middleNames: '',
      letters: '',
      role: 'admin',
      password: 'hashedPassword'
    })
    
    // Contact creation
    prismaMock.contact.create.mockResolvedValue({
      id: 'contactId',
      email: 'test@test.com',
      mobile: '01234567890',
      label: 'primary',
    })

    // User update after user creation
    prismaMock.user.update.mockResolvedValue({
      username: 'tu12345',
      title: 'Mr',
      forename: 'Test',
      surname: 'User',
      middleNames: '',
      letters: '',
      role: 'admin',
      password: 'hashedPassword',
      contactId: 'contactId',
    })

    // Verification creation as contact is created
    prismaMock.userVerification.create.mockResolvedValue({
      username: 'tu12345',
      verificationCode: 'verificationCode',
    })

    await expect(createUser(user)).resolves.toEqual({
      username: 'tu12345',
      password: 'hashedPassword',
      title: 'Mr',
      forename: 'Test',
      middleNames: '',
      surname: 'User',
      letters: '',
      role: 'admin',
      contactId: 'contactId',
    })
  })
  
  it('should create a new student if the role is student', async () => {
    const user = {
      forename: 'Test',
      surname: 'User',
      role: 'student',
    }

    // Initial user creation
    prismaMock.user.create.mockResolvedValue({
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      middleNames: '',
      letters: '',
      role: 'student',
      password: 'hashedPassword'
    })

    // Student creation
    prismaMock.student.create.mockResolvedValue({
      id: 'studentId',
      username: 'tu12345',
      user: {
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        middleNames: '',
        letters: '',
        role: 'student',
        password: 'hashedPassword'
      }
    })

    await expect(createUser(user)).resolves.toEqual({
      ...user,
      username: 'tu12345',
      middleNames: '',
      letters: '',
      role: 'student',
      password: 'hashedPassword',
    })
  })
  
  it('should create a new teacher if the role is teacher', async () => {
    const user = {
      forename: 'Test',
      surname: 'User',
      role: 'teacher',
    }

    // Initial user creation
    prismaMock.user.create.mockResolvedValue({
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      middleNames: '',
      letters: '',
      role: 'teacher',
      password: 'hashedPassword'
    })

    // Student creation
    prismaMock.teacher.create.mockResolvedValue({
      id: 'teacherId',
      username: 'tu12345',
      user: {
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        middleNames: '',
        letters: '',
        role: 'teacher',
        password: 'hashedPassword'
      }
    })

    await expect(createUser(user)).resolves.toEqual({
      ...user,
      username: 'tu12345',
      middleNames: '',
      letters: '',
      role: 'teacher',
      password: 'hashedPassword',
    })
  })

  it('should throw an error if the user already exists', async () => {
    const user: User = {
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      role: 'admin',
    } as User

    prismaMock.user.create.mockRejectedValue(new Error('User already exists'))

    await expect(createUser(user)).rejects.toThrow('User already exists')
  })
})

describe('getUsers', () => {
  const users = [
    {
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      role: 'admin',
    },
    {
      username: 'tu12346',
      forename: 'Test',
      surname: 'User',
      role: 'admin',
    },
  ]
  it('should return all users', async () => {
    prismaMock.user.findMany.mockResolvedValue(users)

    await expect(getUsers()).resolves.toEqual(users)
  })

  it('should return all users if current user has specific role', async () => {
    prismaMock.user.findMany.mockResolvedValue(users)

    await expect(getUsers(['admin'])).resolves.toEqual(users)
  })

  it('should return no users if current user does not have specific role', async () => {
    prismaMock.user.findMany.mockResolvedValue(users)

    await expect(getUsers(['teacher'])).resolves.toEqual([])
  })
})

describe('getUserByRole', () => {
  const users = [
    {
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      role: 'teacher',
    },
    {
      username: 'tu12346',
      forename: 'Test',
      surname: 'User',
      role: 'student',
    },
    {
      username: 'admin',
      forename: 'Test',
      surname: 'User',
      role: 'admin',
    },
  ]
  it('should return all users if no role is specified', async () => {
    prismaMock.user.findMany.mockResolvedValueOnce(users.filter(user => user.role === 'admin'))
    prismaMock.user.findMany.mockResolvedValueOnce(users.filter(user => user.role === 'teacher'))
    prismaMock.user.findMany.mockResolvedValueOnce(users.filter(user => user.role === 'student'))

    await expect(getUsersByRole()).resolves.toEqual(expect.arrayContaining(users))
  })

  it('should return all users of the selected type', async () => {
    const users = [
      {
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        role: 'admin',
      },
      {
        username: 'tu12346',
        forename: 'Test',
        surname: 'User',
        role: 'admin',
      },
    ]
    prismaMock.user.findMany.mockResolvedValueOnce(users)

    await expect(getUsersByRole(['admin'])).resolves.toEqual(users)
  })
})

describe('getUser', () => {
  const user = {
    username: 'tu12345',
    forename: 'Test',
    surname: 'User',
    role: 'admin',
  }

  it('should return a user', async () => {

    prismaMock.user.findUnique.mockResolvedValue(user)

    await expect(getUser('tu12345')).resolves.toEqual(user)
  })

  it('should return a user when the current user has the correct role', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user)

    await expect(getUser('tu12345', [], ['admin'])).resolves.toEqual(user)
  })

  it('should return undefined when the current user does not have the correct role', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user)

    await expect(getUser('tu12345', [], ['teacher'])).resolves.toBeUndefined()
  })
})

describe('checkLoginCredentials', () => {
  it('should return a user if the credentials are correct', async () => {
    const user = {
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      role: 'admin',
    }

    prismaMock.user.findFirst.mockResolvedValue(user)

    await expect(checkLoginCredentials('tu12345', 'password')).resolves.toEqual(user)
  })

  it('should return undefined if the credentials are incorrect', async () => {
    prismaMock.user.findFirst.mockResolvedValue(undefined)

    await expect(checkLoginCredentials('tu12345', 'incorrectPassword')).resolves.toBeUndefined()
  })
})

describe('updateUser', () => {
  it('should update a user', async () => {
    const user = {
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      role: 'admin',
    }

    prismaMock.user.update.mockResolvedValue(user)

    await expect(updateUser(user)).resolves.toEqual(user)
  })

  it ('should return undefined if no username is passed', async () => {
    await expect(updateUser({} as User)).resolves.toBeUndefined()
  })

  it ('should return undefined if the current user does not have the correct role or username', async () => {
    const user = {
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      role: 'admin',
    }
    prismaMock.userSession.findFirst.mockResolvedValue(undefined)
    prismaMock.user.update.mockResolvedValue(user)

    await expect(updateUser(user)).resolves.toBeUndefined()
  })

  it('should update the user if the current user does not have the correct role, but is has the same username as the user being updated', async () => {
    const user = {
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      role: 'teacher',
    }

    prismaMock.userSession.findFirst.mockResolvedValue({user: {
      username: 'tu12345',
      role: 'teacher',
    }})
    prismaMock.user.update.mockResolvedValue(user)

    await expect(updateUser(user)).resolves.toEqual(user)
  })
})

describe('changePassword', () => {
  it('should change a user\'s password', async () => {
    const user = {
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      role: 'admin',
      password: 'newHashedPassword',
    }

    prismaMock.user.update.mockResolvedValue(user)

    await expect(changePassword(user.username, 'newPassword')).resolves.toEqual(user)
  })

  it('should return undefined if no username is passed', async () => {
    await expect(changePassword('', 'newPassword')).resolves.toBeUndefined()
  })

  it('should return undefined if the current user does not have the correct role and username', async () => {
    const user = {
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      role: 'admin',
      password: 'newHashedPassword',
    }

    prismaMock.userSession.findFirst.mockResolvedValue(undefined)
    prismaMock.user.update.mockResolvedValue(user)

    await expect(changePassword(user.username, 'newPassword')).resolves.toBeUndefined()
  })
})