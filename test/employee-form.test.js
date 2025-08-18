import { expect, fixture, html as litHtml, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/widgets/employee-form.js';
import { setEmployees } from '../src/store.js';

describe('<employee-form>', () => {
  beforeEach(() => setEmployees([]));

  it('validates and creates employee', async () => {
    const el = await fixture(litHtml`<employee-form .mode=${'create'}></employee-form>`);
    const inputs = el.shadowRoot.querySelectorAll('input, select');
    // Fill minimal valid data
    el.firstName = 'John';
    el.lastName = 'Doe';
    el.dob = '2000-01-01';
    el.doe = '2020-01-01';
    el.phone = '1234567';
    el.email = 'john@example.com';
    el.department = 'Tech';
    el.position = 'Junior';
    const confirmStub = sinon.stub(window, 'confirm').returns(true);
    const ev = new Event('submit', { bubbles: true, cancelable: true });
    el.shadowRoot.querySelector('form').dispatchEvent(ev);
    expect(confirmStub.calledOnce).to.be.true;
    confirmStub.restore();
  });

  it('shows uniqueness errors', async () => {
    const el1 = await fixture(litHtml`<employee-form .mode=${'create'}></employee-form>`);
    el1.firstName = 'A'; el1.lastName='B'; el1.dob='2000-01-01'; el1.doe='2020-01-01'; el1.phone='1234567'; el1.email='a@a.com'; el1.department='Tech'; el1.position='Junior';
    sinon.stub(window, 'confirm').returns(true);
    el1.shadowRoot.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    const el2 = await fixture(litHtml`<employee-form .mode=${'create'}></employee-form>`);
    el2.firstName = 'C'; el2.lastName='D'; el2.dob='2000-01-01'; el2.doe='2020-01-01'; el2.phone='1234567'; el2.email='b@b.com'; el2.department='Tech'; el2.position='Junior';
    el2.shadowRoot.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(el2.errors.phone).to.exist;
    window.confirm.restore();
  });
});
