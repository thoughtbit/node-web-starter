import { expect } from 'chai'

/**
 * 同步测试
 */
describe('test add', () => {
  it('1 + 1 should be equal to 2', () => {
    expect(1+1).to.equal(2);
  })
})

/**
 * 异步测试
 */
describe('test async add', () => {
  it('2 + 2 should be equal to 4', (done) => {
    setTimeout(() => {
      expect(2+2).to.equal(4);
      done()
    }, 2000)
  })
})
