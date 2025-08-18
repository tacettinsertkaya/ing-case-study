export function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
}
export function isPhone(v) {
  return /\d{7,}/.test(String(v).replace(/\D/g, ''));
}
export function isPast(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  return !isNaN(d) && d < new Date(today.toDateString());
}
export function isEmploymentInRange(dobStr, doeStr) {
  const dob = new Date(dobStr);
  const doe = new Date(doeStr);
  const today = new Date();
  if (isNaN(dob) || isNaN(doe)) return false;
  return doe >= dob && doe <= new Date(today.toDateString());
}
export function required(v) {
  return !(v === undefined || v === null || String(v).trim() === '');
}
