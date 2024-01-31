import { EMPTY_ADDRESS, EMPTY_CONTACT, cn, genRandomPassword, genRandomString, genVerificationCode } from '@/lib/utils'

describe('utils.cn', () => {
  it('should merge two classnames', () => {
    const class1 = 'foo'
    const class2 = 'bar'

    expect(cn(class1, class2)).toEqual('foo bar')
  })

  it('should merge two classnames with a conditional', () => {
    const class1 = 'foo'
    const class2 = 'bar'
    const conditional = true
    const merged = cn(class1, conditional && class2)

    expect(merged).toEqual('foo bar')
  })
})

describe('utils.genRandomPassword', () => {
  it('should generate a password with 8 characters', () => {
    const password = genRandomPassword()
    expect(password).toHaveLength(8)
  })
})

describe('utils.genVerificationCode', () => {
  it('should generate a code with 16 characters', () => {
    const code = genVerificationCode()
    expect(code).toHaveLength(16)
  })
})

describe('utils.genRandomString', () => {
  it('should generate a random string with 8 characters', () => {
    const string = genRandomString(8)
    expect(string).toHaveLength(8)
  })
})

describe('utils.ts Constants', () => {
  it('should have an EMPTY_ADDRESS constant', () => {
    expect(EMPTY_ADDRESS).toEqual({
      id: '',
      addressLine1: '',
      addressLine2: '',
      town: '',
      stateCounty: '',
      zipPostCode: ''
    })
  })

  it('should have an EMPTY_CONTACT constant', () => {
    expect(EMPTY_CONTACT).toEqual({
      id: '',
      label: 'primary',
      email: '',
      mobile: ''
    })
  })
})