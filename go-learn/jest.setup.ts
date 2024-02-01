import '@testing-library/jest-dom'

import { TextEncoder } from 'util'
import dotenv from 'dotenv'
import { prismaMock } from './prismaMock'

dotenv.config({ path: '.env.test' })

global.TextEncoder = TextEncoder
global.ArrayBuffer = ArrayBuffer

const OLD_ENV = process.env

jest.mock('next/headers', () => {
  return { // <-- this object gets returned by `import('next/headers')`
    cookies: () => {
      return {
        get: jest.fn(()=>({value: 'test'})),
      }
    },
  }
})

jest.mock('nodemailer', () => {
  return { // <-- this object gets returned by `import('nodemailer')`
    createTransport: () => {
      return {
        sendMail: jest.fn(() => Promise.resolve({accepted: true})),
      }
    },
  }
})

beforeEach(() => {
  jest.resetModules() // this is important - it clears the cache
  process.env = { ...OLD_ENV } // make a copy
  
  prismaMock.$transaction.mockImplementation(requests => requests)
  prismaMock.userSession.findFirst.mockResolvedValue({user: {
    username: 'test',
    role: 'admin',
  }})
})

afterEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  process.env = OLD_ENV // restore old env
})