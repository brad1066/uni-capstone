import { Contact, User, UserRole, UserVerification } from '~/prisma/generated/client'
import { prismaMock } from '../../prismaMock'
import { changePassword, checkLoginCredentials, createUser, deleteUser, getUser, getUsers, getUsersByRole, updatePasswordWithCode, updateUser } from '@/actions/userActions'

describe('userActions', () => {
  // #region Creation Action Tests
  /**
   * Creation Action Tests:
   *   1. createUser
   */
  describe('createUser', () => {
    /**
       * it: should create a new user
       * it: should create a new user with contact details
       * it: should create a new student if the role is student
       * it: should create a new teacher if the role is teacher
       * it: should throw an error if the user already exists
       */
    it('should create a new user', async () => {
      const user = {
        forename: 'Test',
        surname: 'User',
        role: UserRole.admin,
      } as User

      prismaMock.user.create.mockResolvedValue({
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        middleNames: '',
        letters: '',
        role: UserRole.admin,
        password: 'hashedPassword'
      } as User)

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
        role: UserRole.admin,
        contactDetails: {
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
        role: UserRole.admin,
        password: 'hashedPassword'
      } as User)
    
      // Contact creation
      prismaMock.contact.create.mockResolvedValue({
        id: 'contactId',
        email: '',
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
        role: UserRole.admin,
        password: 'hashedPassword',
        contactId: 'contactId',
      })

      // Verification creation as contact is created
      prismaMock.userVerification.create.mockResolvedValue({
        username: 'tu12345',
        verificationCode: 'verificationCode',
      } as UserVerification)

      await expect(createUser(user as User & {contactDetails: Contact})).resolves.toEqual({
        username: 'tu12345',
        password: 'hashedPassword',
        title: 'Mr',
        forename: 'Test',
        middleNames: '',
        surname: 'User',
        letters: '',
        role: UserRole.admin,
        contactId: 'contactId',
      })
    })
  
    it('should create a new student if the role is student', async () => {
      const user = {
        forename: 'Test',
        surname: 'User',
        role: UserRole.student,
      } as User

      // Initial user creation
      prismaMock.user.create.mockResolvedValue({
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        middleNames: '',
        letters: '',
        role: UserRole.student,
        password: 'hashedPassword'
      } as User)

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
          role: UserRole.student,
          password: 'hashedPassword'
        }
      })

      await expect(createUser(user)).resolves.toEqual({
        ...user,
        username: 'tu12345',
        middleNames: '',
        letters: '',
        role: UserRole.student,
        password: 'hashedPassword',
      })
    })
  
    it('should create a new teacher if the role is teacher', async () => {
      const user = {
        forename: 'Test',
        surname: 'User',
        role: UserRole.teacher,
      } as User

      // Initial user creation
      prismaMock.user.create.mockResolvedValue({
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        middleNames: '',
        letters: '',
        role: UserRole.teacher,
        password: 'hashedPassword'
      } as User)

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
          role: UserRole.teacher,
          password: 'hashedPassword'
        }
      })

      await expect(createUser(user)).resolves.toEqual({
        ...user,
        username: 'tu12345',
        middleNames: '',
        letters: '',
        role: UserRole.teacher,
        password: 'hashedPassword',
      })
    })

    it('should throw an error if the user already exists', async () => {
      const user: User = {
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        role: UserRole.admin,
      } as User

      prismaMock.user.create.mockRejectedValue(new Error('User already exists'))

      await expect(createUser(user)).rejects.toThrow('User already exists')
    })
  })
  //#endregion
  // #region Read Action Tests
  /**
   * Read Action Tests:
   *  1. getUser
   *  2. getUsers
   *  3. getUsersByRole
   *  4. checkLoginCredentials
   */
  describe('getUser', () => {
    /**
       * it: should return a user
       * it: should return a user when the current user has the correct role
       * it: should return undefined when the current user does not have the correct role
       */
    const user = {
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      role: UserRole.admin,
    } as User

    it('should return a user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user)
      prismaMock.$transaction.mockResolvedValue([{user, cookieValue: 'cookie'}, {...user}])

      await expect(getUser('tu12345')).resolves.toEqual(user)
    })

    it('should return a user when the current user has the correct role', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user)
      prismaMock.$transaction.mockResolvedValue([{user, cookieValue: 'cookie'}, {...user}])

      await expect(getUser('tu12345', [], [UserRole.admin])).resolves.toEqual(user)
    })

    it('should return undefined when the current user does not have the correct role', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user)

      prismaMock.$transaction.mockResolvedValue([{user, cookieValue: 'cookie'}, {...user}])

      await expect(getUser('tu12345', [], [UserRole.teacher])).resolves.toBeUndefined()
    })
  })

  describe('getUsers', () => {
    /**
       * it: should return all users
       * it: should return all users if current user has specific role
       * it: should return no users if current user does not have specific role
       */
    const users = [
      {
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        role: UserRole.admin,
      },
      {
        username: 'tu12346',
        forename: 'Test',
        surname: 'User',
        role: UserRole.admin,
      },
    ] as User[]
    it('should return all users', async () => {
      prismaMock.user.findMany.mockResolvedValue(users)
      prismaMock.$transaction.mockResolvedValue([{user: users[0], cookieValue: 'cookie'}, users])

      await expect(getUsers()).resolves.toEqual(users)
    })

    it('should return all users if current user has specific role', async () => {
      prismaMock.user.findMany.mockResolvedValue(users)
      prismaMock.$transaction.mockResolvedValue([{user: users[0], cookieValue: 'cookie'}, users])

      await expect(getUsers([UserRole.admin])).resolves.toEqual(users)
    })

    it('should return no users if current user does not have specific role', async () => {
      prismaMock.user.findMany.mockResolvedValue(users)
      prismaMock.$transaction.mockResolvedValue([{user: users[0], cookieValue: 'cookie'}, users])

      await expect(getUsers([UserRole.teacher])).resolves.toEqual([])
    })
  })

  describe('getUsersByRole', () => {
    /**
       * it: should return all users if no role is specified
       * it: should return all admin when requests
       * it: should return all teachers when requests
       * it: should return all students when requests
       * it: should return [] if the user is not signed in
       */
    const users = [
      {
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        role: UserRole.teacher,
      },
      {
        username: 'tu12346',
        forename: 'Test',
        surname: 'User',
        role: UserRole.student,
      },
      {
        username: UserRole.admin,
        forename: 'Test',
        surname: 'User',
        role: UserRole.admin,
      },
    ]

    beforeEach(() => {
      prismaMock.$transaction.mockResolvedValue([
        { user: users[0], cookieValue: 'cookie' },
        users.filter(user => user.role == UserRole.admin),
        users.filter(user => user.role == UserRole.teacher),
        users.filter(user => user.role == UserRole.student),
      ])
    })

    it('should return all users if no role is specified', async () => {
      await expect(getUsersByRole()).resolves.toEqual(expect.arrayContaining(users))
    })

    it('should return all admin when requests', async () => {
      await expect(getUsersByRole([UserRole.admin])).resolves.toEqual(expect.arrayContaining(users.filter(user => user.role == UserRole.admin)))
    })

    it('should return all teachers when requests', async () => {
      await expect(getUsersByRole([UserRole.teacher])).resolves.toEqual(expect.arrayContaining(users.filter(user => user.role == UserRole.teacher)))
    })

    it('should return all students when requests', async () => {
      await expect(getUsersByRole([UserRole.student])).resolves.toEqual(expect.arrayContaining(users.filter(user => user.role == UserRole.student)))
    })

    it('should return [] if the user is not signed in', async () => {
      prismaMock.$transaction.mockResolvedValue([null, [], [], []])

      await expect(getUsersByRole()).resolves.toEqual([])
    })
  })

  describe('checkLoginCredentials', () => {
    /**
       * it: should return a user if the credentials are correct
       * it: should return undefined if the credentials are incorrect
       */
    it('should return a user if the credentials are correct', async () => {
      const user = {
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        role: UserRole.admin,
      } as User

      prismaMock.user.findFirst.mockResolvedValue(user)

      await expect(checkLoginCredentials('tu12345', 'password')).resolves.toEqual(user)
    })

    it('should return undefined if the credentials are incorrect', async () => {
      prismaMock.user.findFirst.mockResolvedValue(null)

      await expect(checkLoginCredentials('tu12345', 'incorrectPassword')).resolves.toBeNull()
    })
  })
  //#endregion
  // #region Update Action Tests
  /**
   * Update Action Tests:
   *  1. updateUser
   *  2. changePassword
   *  3. updatePasswordWithCode
   */
  describe('updateUser', () => {
    /**
       * it: should update a user
       * it: should return undefined if no username is passed
       * it: should return undefined if the current user does not have the correct role or username
       * it: should update the user if the current user does not have the correct role, but is has the same username as the user being updated
       */
    it('should update a user', async () => {
      const user = {
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        role: UserRole.admin,
      } as User

      prismaMock.user.update.mockResolvedValue(user)

      await expect(updateUser(user)).resolves.toEqual(user)
    })

    it ('should return undefined if no username is passed', async () => {
      await expect(updateUser({} as User)).resolves.toBeNull()
    })

    it ('should return undefined if the current user does not have the correct role or username', async () => {
      const user = {
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        role: UserRole.admin,
      } as User
      prismaMock.userSession.findFirst.mockResolvedValue({user: {
        username: 'tu12346',
        role: UserRole.teacher,
      }})
      prismaMock.user.update.mockResolvedValue(null)

      await expect(updateUser(user)).resolves.toBeNull()
    })

    it('should update the user if the current user does not have the correct role, but is has the same username as the user being updated', async () => {
      const user = {
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        role: UserRole.teacher,
      } as User

      prismaMock.userSession.findFirst.mockResolvedValue({user: {
        username: 'tu12345',
        role: UserRole.teacher,
      }})
      prismaMock.user.update.mockResolvedValue(user)

      await expect(updateUser(user)).resolves.toEqual(user)
    })
  })

  describe('changePassword', () => {
    /**
       * it: should change a user's password
       * it: should return undefined if no username is passed
       * it: should return undefined if the current user does not have the correct role and username
       */
    it('should change a user\'s password', async () => {
      const user = {
        username: 'tu12345',
        forename: 'Test',
        surname: 'User',
        role: UserRole.admin,
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
        role: UserRole.admin,
        password: 'newHashedPassword',
      } as User

      prismaMock.userSession.findFirst.mockResolvedValue(null)
      prismaMock.user.update.mockResolvedValue(user)

      await expect(changePassword(user.username, 'newPassword')).resolves.toBeNull()
    })
  })

  describe('updatePasswordWithCode', () => {
    /**
       * it: should update a user's password with a verification code
       * it: should return undefined if the verification code is invalid
       * it: should return undefined if the password cannot be updated
       */
    const user = {
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      role: UserRole.admin,
      password: 'newHashedPassword',
    }

    it('should update a user\'s password with a verification code', async () => {
      prismaMock.userVerification.update.mockResolvedValue({used: true})
      prismaMock.user.update.mockResolvedValue(user)

      await expect(updatePasswordWithCode('authKey', 'authVal', 'newPassword')).resolves.toEqual({success: true, message: 'Password updated successfully'})
    })

    it('should return undefined if the verification code is invalid', async () => {
      prismaMock.userVerification.update.mockRejectedValue(undefined)

      await expect(updatePasswordWithCode('authKey', 'authVal', 'newPassword')).resolves.toEqual({success: false, message: 'Invalid verification code'})
    })

    it('should return undefined if the password cannot be updated', async () => {
      prismaMock.userVerification.update.mockResolvedValue({used: true})
      prismaMock.user.update.mockResolvedValue(undefined)

      await expect(updatePasswordWithCode('authKey', 'authVal', 'newPassword')).resolves.toEqual({success: false, message: 'Failed to update password'})
    })
  })
  //#endregion
  // #region Delete Action Tests
  /**
   * Delete Action Tests:
   *  1. deleteUser
   */
  describe('deleteUser', () => {
    /**
       * it: should delete a user
       * it: should return undefined if the current user does not have the correct role
       */
    const user = {
      username: 'tu12345',
      forename: 'Test',
      surname: 'User',
      role: UserRole.admin,
    }
    it('should delete a user', async () => {

      prismaMock.$transaction.mockResolvedValue([{count: 0}, {...user}])

      await expect(deleteUser(user.username)).resolves.toEqual([{count: 0}, {...user}])
    })

    it('should return undefined if the current user does not have the correct role', async () => {

      prismaMock.userSession.findFirst.mockResolvedValue({user: {
        username: 'tu12345',
        role: UserRole.teacher,
      }})

      await expect(deleteUser(user.username)).resolves.toBeUndefined()
    })
  })
  
  //#endregion
})