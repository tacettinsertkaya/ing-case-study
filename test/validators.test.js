import { expect } from '@open-wc/testing';
import { isEmail, isPhone, isPast, isEmploymentInRange, required } from '../src/utils/validators.js';

describe('validators', () => {
  it('email', () => {
    expect(isEmail('a@b.com')).to.be.true;
    expect(isEmail('bad')).to.be.false;
  });
  it('phone', () => {
    expect(isPhone('1234567')).to.be.true;
    expect(isPhone('123')).to.be.false;
  });
  it('required', () => {
    expect(required('x')).to.be.true;
    expect(required('')).to.be.false;
  });
  it('dates', () => {
    const past = '2000-01-01';
    const future = '2999-01-01';
    expect(isPast(past)).to.be.true;
    expect(isPast(future)).to.be.false;
    expect(isEmploymentInRange('2000-01-01', '2020-01-01')).to.be.true;
    expect(isEmploymentInRange('2020-01-01', '2000-01-01')).to.be.false;
  });
});
