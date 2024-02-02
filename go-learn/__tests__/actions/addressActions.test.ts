import { Address } from '@prisma/client'
import { prismaMock } from '../../prismaMock'
import { createStudentAddress, createTeacherAddress, updateAddress, updateAddresses } from '@/actions/addressActions'

describe('addressActions', () => {
  // #region Create Action Tests
  /**
   * Create Action Tests
   *  1. createTeacherAddress
   *  2. createStudentAddress
   */
  describe('createTeacherAddress', () => {
    /**
     * it: should create an address
     * it: should return undefined if the user is not logged in
     * it: should return undefined if the user is not an admin
     * it: should return undefined if the address is not created
     */
    const address: Address = {
      addressLine1: '123 Fake Street',
      addressLine2: 'Apartment 4',
      town: 'Fake Town',
      stateCounty: 'Fake State',
      zipPostCode: '12345',
    }

    it('should create an address', async () => {
      prismaMock.address.create.mockResolvedValueOnce({
        ...address,
        id: 'addressId',
      })

      prismaMock.teacher.update.mockResolvedValueOnce({
        id: 'teacherId',
        username: 'test',
        addressId: 'addressId',
      })

      await expect(createTeacherAddress('teacherId', address)).resolves.toEqual({
        id: 'teacherId',
        username: 'test',
        addressId: 'addressId',
      })
    })

    it('should return undefined if the user is not logged in', async () => {
      prismaMock.userSession.findFirst.mockResolvedValueOnce(null)    
      await expect(createTeacherAddress('teacherId', address, ['admin'])).resolves.toBeUndefined()
    })

    it('should return undefined if the user is not an admin', async () => {
      prismaMock.userSession.findFirst.mockResolvedValueOnce({
        user: {
          username: 'test',
          role: 'student',
        }
      })    
      await expect(createTeacherAddress('teacherId', address, ['admin'])).resolves.toBeUndefined()
    })

    it('should return undefined if the address is not created', async () => {
      prismaMock.address.create.mockResolvedValueOnce(null)
      await expect(createTeacherAddress('teacherId', address)).resolves.toBeUndefined()
    })
  })

  describe('createStudentAddress', () => {
    /**
     * it: should create a home address by default
     * it: should create a term address if specified
     * it: should return undefined if the user is not logged in
     * it: should return undefined if the user is not an admin
     * it: should return undefined if the address is not created
     */
    const address: Address = {
      addressLine1: '123 Fake Street',
      addressLine2: 'Apartment 4',
      town: 'Fake Town',
      stateCounty: 'Fake State',
      zipPostCode: '12345',
    }

    it('should create a home address by default', async () => {
      prismaMock.address.create.mockResolvedValueOnce({
        ...address,
        id: 'addressId',
      })

      prismaMock.student.update.mockResolvedValueOnce({
        id: 'studentId',
        username: 'test',
        homeAddressId: 'addressId',
      })

      await expect(createStudentAddress('studentId', address)).resolves.toEqual({
        id: 'studentId',
        username: 'test',
        homeAddressId: 'addressId',
      })
    })

    it('should create a term address if specified', async () => {
      prismaMock.address.create.mockResolvedValueOnce({
        ...address,
        id: 'addressId',
      })
    
      prismaMock.student.update.mockResolvedValueOnce({
        id: 'studentId',
        username: 'test',
        termAddressId: 'addressId',
      })
    
      await expect(createStudentAddress('studentId', address, false)).resolves.toEqual({
        id: 'studentId',
        username: 'test',
        termAddressId: 'addressId',
      })
    })

    it('should return undefined if the user is not logged in', async () => {
      prismaMock.userSession.findFirst.mockResolvedValueOnce(null)    
      await expect(createStudentAddress('studentId', address, true, ['admin'])).resolves.toBeUndefined()
    })

    it('should return undefined if the user is not an admin', async () => {
      prismaMock.userSession.findFirst.mockResolvedValueOnce({
        user: {
          username: 'test',
          role: 'student',
        }
      })    
      await expect(createStudentAddress('studentId', address, true, ['admin'])).resolves.toBeUndefined()
    })

    it('should return undefined if the address is not created', async () => {
      prismaMock.address.create.mockResolvedValueOnce(null)
      await expect(createStudentAddress('studentId', address)).resolves.toBeUndefined()
    })
  })
  // #endregion
  // #region Read Action Tests
  /**
   * Read Action Tests
   *  1. 
   */
  // #endregion
  // #region Update Action Tests
  /**
   * Update Action Tests
   *  1. updateAddress
   *  2. updateAddresses
   */
  describe('updateAddress', () => {
    /**
     * it: should update an address
     * it: should return undefined if the user is not logged in
     * it: should return undefined if the user is not an admin
     * it: should return undefined if the address is not updated
     */
    const address: Address = {
      id: 'addressId',
      addressLine1: '123 Fake Street',
      addressLine2: 'Apartment 4',
      town: 'Fake Town',
      stateCounty: 'Fake State',
      zipPostCode: '12345'
    }

    it('should update an address', async () => {
      prismaMock.address.update.mockResolvedValueOnce(address)
      await expect(updateAddress(address)).resolves.toEqual(address)
    })

    it('should return undefined if the user is not logged in', async () => {
      prismaMock.userSession.findFirst.mockResolvedValueOnce(null)    
      await expect(updateAddress(address, ['admin'])).resolves.toBeUndefined()
    })

    it('should return undefined if the user is not an admin', async () => { 
      await expect(updateAddress(address, ['admin'])).resolves.toBeUndefined()
    })

    it('should return undefined if the address is not updated', async () => {
      prismaMock.address.update.mockResolvedValueOnce(undefined)
      await expect(updateAddress(address)).resolves.toBeUndefined()
    })
  })
  describe('updateAddresses', () => {
    /**
     * it: should update multiple addresses
     * it: should return undefined if the user is not logged in
     * it: should return undefined if the user is not an admin
     * it: should return undefined if the addresses are not updated
     */

    const addresses: Address[] = [
      {
        id: 'addressId1',
        addressLine1: '123 Fake Street',
        addressLine2: 'Apartment 4',
        town: 'Fake Town',
        stateCounty: 'Fake State',
        zipPostCode: '12345'
      },
      {
        id: 'addressId2',
        addressLine1: '456 Fake Street',
        addressLine2: 'Apartment 4',
        town: 'Fake Town',
        stateCounty: 'Fake State',
        zipPostCode: '12345'
      }
    ]

    it('should update multiple addresses', async () => {
      prismaMock.$transaction.mockResolvedValueOnce(addresses)
      await expect(updateAddresses(addresses)).resolves.toEqual(addresses)
    })

    it('should return undefined if the user is not logged in', async () => {
      prismaMock.userSession.findFirst.mockResolvedValueOnce(null)    
      await expect(updateAddresses(addresses, ['admin'])).resolves.toBeUndefined()
    })

    it('should return undefined if the user is not an admin', async () => {
      prismaMock.userSession.findFirst.mockResolvedValueOnce({
        user: {
          username: 'test',
          role: 'student',
        }
      })    
      await expect(updateAddresses(addresses, ['admin'])).resolves.toBeUndefined()
    })

    it('should return undefined if the addresses are not updated', async () => {
      prismaMock.$transaction.mockResolvedValueOnce(undefined)
      await expect(updateAddresses(addresses)).resolves.toBeUndefined()
    })
  })
  // #endregion
  // #region Delete Action Tests
  /**
   * Delete Action Tests
   *  1. 
   */
  // #endregion
})