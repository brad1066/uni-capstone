import { createAssignment, getAssignment } from '@/actions/assignmentActions'
import { prismaMock } from '../../prismaMock'
import { Assignment, UserRole } from '@prisma/client'

describe('assignmentActions', () => {
  // #region Create Actions
  /**
   * Create Assignment:
   *  1. should create an assignment if the user is an admin
   *  2. should create a user if the user is a teacher
   *  3. should return null if the user is not an admin or teacher
   *  4. should return null if the user is not logged in
   */
  describe('createAssignment', () => {
    const assignment = {
      id: 'assignmentId',
      title: 'Test Assignment',
      description: 'This is a test assignment',
      moduleId: null,
      dueDate: new Date(),
      resources: [],
      submissions: []
    }

    it('should create an assignment if the user is an admin', async () => {
      prismaMock.assignment.create.mockResolvedValue(assignment)

      await expect(createAssignment(assignment)).resolves.toEqual(assignment)
    })

    it('should create a user if the user is a teacher', async () => {
      prismaMock.userSession.findFirst.mockResolvedValue({ user: { role: UserRole.teacher } }) // Specify known properties
      prismaMock.assignment.create.mockResolvedValue(assignment)

      await expect(createAssignment(assignment)).resolves.toEqual(assignment)
    })

    it('should return null if the user is not an admin or teacher', async () => {
      prismaMock.userSession.findFirst.mockResolvedValue({ user: { role: UserRole.student } }) // Specify known properties

      await expect(createAssignment(assignment)).resolves.toBeNull()
    })

    it('should return null if the user is not logged in', async () => {
      prismaMock.userSession.findFirst.mockResolvedValue(null)

      await expect(createAssignment(assignment)).resolves.toBeNull()
    })
  })
  // #endregion

  // #region Read Actions
  describe('getAssignment', () => {
    /**
     * Get Assignment:
     * 1. should return an assignment if the user is logged in
     * 2. should return null if the user is not logged in
     * 3. should return null if the user is logged in, but not with an allowed role
     * 4. should return an assignment if the user is logged in and has an allowed role
     */
    it('should return an assignment if the user is logged in', async () => {
      prismaMock.assignment.findUnique.mockResolvedValue({ id: 'assignmentId' } as Assignment)

      await expect(getAssignment('assignmentId')).resolves.toEqual({ id: 'assignmentId' })
    })

    it('should return null if the user is not logged in', async () => {
      prismaMock.userSession.findFirst.mockResolvedValue(null)

      await expect(getAssignment('assignmentId')).resolves.toBeNull()
    })

    it('should return null if the user is logged in, but not with an allowed role', async () => {
      prismaMock.userSession.findFirst.mockResolvedValue({ user: { role: UserRole.student } }) // Specify known properties

      await expect(getAssignment('assignmentId', [], [UserRole.admin, UserRole.teacher])).resolves.toBeNull()
    })

    it('should return an assignment if the user is logged in and has an allowed role', async () => {
      prismaMock.userSession.findFirst.mockResolvedValue({ user: { role: UserRole.teacher } }) // Specify known properties
      prismaMock.assignment.findUnique.mockResolvedValue({ id: 'assignmentId' } as Assignment)

      await expect(getAssignment('assignmentId', [], [UserRole.admin, UserRole.teacher])).resolves.toEqual({ id: 'assignmentId' })
    })
  
  })
  // #endregion

  // #region Update Actions
  // #endregion

  // #region Delete Actions
  // #endregion
})