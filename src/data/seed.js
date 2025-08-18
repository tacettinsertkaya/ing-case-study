import { getState, setEmployees } from '../store.js';

const SEED = [
  { id: 'e1', firstName: 'Ada', lastName: 'Lovelace', dob: '1990-12-10', doe: '2015-01-05', phone: '5551234567', email: 'ada@example.com', department: 'Tech', position: 'Senior', isSelected: false },
  { id: 'e2', firstName: 'Grace', lastName: 'Hopper', dob: '1985-01-12', doe: '2010-06-15', phone: '5559876543', email: 'grace@example.com', department: 'Analytics', position: 'Senior', isSelected: false },
  { id: 'e3', firstName: 'Alan', lastName: 'Turing', dob: '1992-06-23', doe: '2018-09-01', phone: '5552223333', email: 'alan@example.com', department: 'Tech', position: 'Medior', isSelected: false },
  { id: 'e4', firstName: 'Hedy', lastName: 'Lamarr', dob: '1993-11-09', doe: '2017-03-07', phone: '5557778888', email: 'hedy@example.com', department: 'Analytics', position: 'Junior', isSelected: false }
];

export function initSeed() {
  const cur = getState().employees;
  if (!cur || !cur.length) {
    setEmployees(SEED);
  }
}
