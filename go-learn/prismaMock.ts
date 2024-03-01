// Comment out to allow for building

// import { PrismaClient } from './../../prisma/generated/client'
// import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

// import prisma from '@/lib/db'

// jest.mock('./src/lib/db', () => ({
//   __esModule: true,
//   default: mockDeep<PrismaClient>(),
// }))

// beforeEach(() => {
//   mockReset(prismaMock)
// })

// export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>