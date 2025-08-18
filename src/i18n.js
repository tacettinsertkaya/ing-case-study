const dictionaries = {
  en: {
    nav: { employees: 'Employees', addEmployee: 'Add Employee' },
    list: {
      title: 'Employee List',
      search: 'Search',
      view: 'View',
      view_list: 'List',
      view_table: 'Table',
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      actions: 'Actions',
      confirmDelete: 'Delete this employee? This cannot be undone.',
      noResults: 'No employees found.',
      page: 'Page',
      of: 'of'
    },
    form: {
      title_new: 'Create Employee',
      title_edit: 'Edit Employee',
      firstName: 'First Name',
      lastName: 'Last Name',
      dob: 'Date of Birth',
      doe: 'Date of Employment',
      phone: 'Phone Number',
      email: 'Email Address',
      department: 'Department',
      position: 'Position',
      departments: { Analytics: 'Analytics', Tech: 'Tech' },
      positions: { Junior: 'Junior', Medior: 'Medior', Senior: 'Senior' },
      cancel: 'Cancel',
      save: 'Save',
      create: 'Create',
      confirmSave: 'Apply these changes?',
      confirmCreate: 'Create this employee?',
      validation: {
        required: 'This field is required.',
        email: 'Enter a valid email.',
        phone: 'Enter a valid phone (min 7 digits).',
        dobPast: 'Birth date must be in the past.',
        doeRange: 'Employment date must be after birth and not in the future.',
        uniqueEmail: 'This email already exists.',
        uniquePhone: 'This phone already exists.'
      }
    },
    fields: {
      fullName: 'Full Name',
      department: 'Department',
      position: 'Position',
      email: 'Email',
      phone: 'Phone',
      dob: 'Birth',
      doe: 'Date of Employment',

    }
  },
  tr: {
    nav: { employees: 'Çalışanlar', addEmployee: 'Çalışan Ekle' },
    list: {
      title: 'Çalışan Kayıtları',
      search: 'Ara',
      view: 'Görünüm',
      view_list: 'Liste',
      view_table: 'Tablo',
      add: 'Ekle',
      edit: 'Düzenle',
      delete: 'Sil',
      confirmDelete: 'Bu çalışan silinsin mi? Geri alınamaz.',
      noResults: 'Kayıt bulunamadı.',
      page: 'Sayfa',
      of: '/'
    },
    form: {
      title_new: 'Çalışan Oluştur',
      title_edit: 'Çalışanı Düzenle',
      firstName: 'Ad',
      lastName: 'Soyad',
      dob: 'Doğum Tarihi',
      doe: 'İşe Başlama',
      phone: 'Telefon',
      email: 'E-posta',
      department: 'Departman',
      position: 'Pozisyon',
      departments: { Analytics: 'Analitik', Tech: 'Teknoloji' },
      positions: { Junior: 'Junior', Medior: 'Medior', Senior: 'Senior' },
      cancel: 'İptal',
      save: 'Kaydet',
      create: 'Oluştur',
      confirmSave: 'Bu değişiklikler uygulansın mı?',
      confirmCreate: 'Bu çalışan oluşturulsun mu?',
      validation: {
        required: 'Bu alan zorunludur.',
        email: 'Geçerli bir e-posta girin.',
        phone: 'Geçerli bir telefon girin (en az 7 rakam).',
        dobPast: 'Doğum tarihi geçmişte olmalı.',
        doeRange: 'İşe başlama tarihi doğumdan sonra ve gelecekte olmamalı.',
        uniqueEmail: 'Bu e-posta zaten var.',
        uniquePhone: 'Bu telefon zaten var.'
      }
    },
    fields: {
      fullName: 'Ad Soyad',
      department: 'Departman',
      position: 'Pozisyon',
      email: 'E-posta',
      phone: 'Telefon',
      dob: 'Doğum',
      doe: 'İşe Başlama'
    }
  }
};

function getLang() {
  const el = document.documentElement;
  const lang = (el.getAttribute('lang') || '').toLowerCase();
  return lang === 'tr' ? 'tr' : 'en';
}

class I18n {
  constructor() {
    this._lang = getLang();
  }
  get lang() { return this._lang; }
  setLang(lang) {
    const newLang = (lang || '').toLowerCase() === 'tr' ? 'tr' : 'en';
    if (newLang !== this._lang) {
      this._lang = newLang;
      document.documentElement.setAttribute('lang', newLang);
      document.dispatchEvent(new CustomEvent('i18n-changed', { detail: { lang: newLang } }));
    }
  }
  t(path) {
    const parts = path.split('.');
    let node = dictionaries[this._lang];
    for (const p of parts) node = node?.[p];
    return node ?? path;
  }
}

export const i18n = new I18n();
export const t = (key) => i18n.t(key);
