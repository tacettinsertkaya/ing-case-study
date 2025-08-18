import { expect } from '@open-wc/testing';
import { i18n, t } from '../src/utils/i18n.js';

describe('i18n', () => {
  it('switches language and reads keys', async () => {
    await i18n.setLang('en');
    await i18n.waitReady();
    expect(t('nav.employees')).to.equal('Employees');
    await i18n.setLang('tr');
    await i18n.waitReady();
    expect(t('nav.employees')).to.equal('Çalışanlar');
  });
});
