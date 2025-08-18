import { expect } from '@open-wc/testing';
import { i18n, t } from '../src/utils/i18n.js';

describe('i18n', () => {
  it('switches language and reads keys', () => {
    i18n.setLang('en');
    expect(t('nav.employees')).to.equal('Employees');
    i18n.setLang('tr');
    expect(t('nav.employees')).to.equal('Çalışanlar');
  });
});
