import { expect } from '@open-wc/testing';
import { addEmployee, updateEmployee, deleteEmployee, setEmployees, getState } from '../src/store.js';

describe('store', () => {
  beforeEach(() => {
    setEmployees([]);
  });
  it('adds employee and enforces unique email/phone', () => {
    const a = addEmployee({ firstName:'A', lastName:'B', dob:'2000-01-01', doe:'2020-01-01', phone:'1234567', email:'a@a.com', department:'Tech', position:'Junior' });
    expect(getState().employees[0].id).to.exist;
    expect(() => addEmployee({ firstName:'X', lastName:'Y', dob:'2000-01-01', doe:'2020-01-01', phone:'1234567', email:'x@x.com', department:'Tech', position:'Junior' })).to.throw();
    expect(() => addEmployee({ firstName:'X', lastName:'Y', dob:'2000-01-01', doe:'2020-01-01', phone:'7654321', email:'a@a.com', department:'Tech', position:'Junior' })).to.throw();
  });
  it('updates employee and keeps uniqueness', () => {
    const a = addEmployee({ firstName:'A', lastName:'B', dob:'2000-01-01', doe:'2020-01-01', phone:'1111111', email:'a@a.com', department:'Tech', position:'Junior' });
    const b = addEmployee({ firstName:'C', lastName:'D', dob:'2000-01-01', doe:'2020-01-01', phone:'2222222', email:'b@b.com', department:'Tech', position:'Junior' });
    expect(() => updateEmployee(a.id, { email:'b@b.com' })).to.throw();
    const u = updateEmployee(a.id, { phone:'3333333' });
    expect(u.phone).to.equal('3333333');
  });
  it('deletes employee', () => {
    const a = addEmployee({ firstName:'A', lastName:'B', dob:'2000-01-01', doe:'2020-01-01', phone:'1111111', email:'a@a.com', department:'Tech', position:'Junior' });
    deleteEmployee(a.id);
    expect(getState().employees.length).to.equal(0);
  });
});
