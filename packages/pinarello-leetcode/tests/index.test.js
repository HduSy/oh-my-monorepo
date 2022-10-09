import twoNumSum from '../src/random/twoNumSum'

describe('twoNumSum', () => {
  it('两数之和', () => {
    const result = twoNumSum([2, 5, 4, 1], 7)
    expect(result).toEqual([0, 1])
  })
})
