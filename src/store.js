const STORAGE_KEY = 'ing-management-panel:employees';

let _state = {
  employees: [],
};
const listeners = new Set();

export function getState() {
  return _state;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  for (const fn of listeners) fn(_state);
}

export function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      _state = { employees: parsed };
      emit();
    }
  } catch {}
}

export function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(_state.employees));
}

export function setEmployees(list) {
  _state = { employees: [...list] };
  saveToStorage(); emit();
}

export function addEmployee(emp) {
  const now = Date.now();
  const id = now + '-' + Math.random().toString(36).slice(2, 7);
  const item = { id, ...emp };
  // unique email/phone
  if (_state.employees.some(e => e.email.toLowerCase() === item.email.toLowerCase())) {
    const err = new Error('uniqueEmail');
    err.code = 'uniqueEmail'; throw err;
  }
  if (_state.employees.some(e => e.phone === item.phone)) {
    const err = new Error('uniquePhone');
    err.code = 'uniquePhone'; throw err;
  }
  _state.employees.unshift(item);
  saveToStorage(); emit();
  return item;
}

export function updateEmployee(id, patch) {
  const idx = _state.employees.findIndex(e => e.id === id);
  if (idx === -1) throw new Error('notFound');
  const merged = { ..._state.employees[idx], ...patch };
  // unique email/phone excluding self
  if (_state.employees.some(e => e.id !== id && e.email.toLowerCase() === merged.email.toLowerCase())) {
    const err = new Error('uniqueEmail');
    err.code = 'uniqueEmail'; throw err;
  }
  if (_state.employees.some(e => e.id !== id && e.phone === merged.phone)) {
    const err = new Error('uniquePhone');
    err.code = 'uniquePhone'; throw err;
  }
  _state.employees[idx] = merged;
  saveToStorage(); emit();
  return merged;
}

export function deleteEmployee(id) {
  const before = _state.employees.length;
  _state.employees = _state.employees.filter(e => e.id !== id);
  if (_state.employees.length === before) throw new Error('notFound');
  saveToStorage(); emit();
}

export function getEmployee(id) {
  return _state.employees.find(e => e.id === id) || null;
}

// Initialize from storage
loadFromStorage();
