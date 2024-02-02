import { createAssignment } from '@/actions/assignmentActions'
import { prismaMock } from '../../prismaMock'
import { UserRole } from '@prisma/client'

describe('assignmentActions', () => {
  // #region Create Actions
  /**
   * Create Assignment:
   *  1. 
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

    it('should create an assignment', async () => {
      prismaMock.assignment.create.mockResolvedValue(assignment)

      await expect(createAssignment(assignment)).resolves.toEqual(assignment)
    })

    it('should return null if the user is not an admin or teacher', async () => {
      prismaMock.userSession.findUnique.mockResolvedValue({ user: { role: UserRole.student } })
      await expect(createAssignment(assignment)).resolves.toEqual(undefined)
    })
  })
  // #endregion

  // #region Read Actions
  // #endregion

  // #region Update Actions
  // #endregion

  // #region Delete Actions
  // #endregion
})