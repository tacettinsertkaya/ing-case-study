export function isEmail(v:string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
}
export function isPhone(v:string) {
  return /\d{7,}/.test(String(v).replace(/\D/g, ''));
}
export function isPast(dateStr:string) {
  const d:Date = new Date(dateStr);
  const today = new Date();
  return !isNaN(d.getTime()) && d < new Date(today.toDateString());
}
export function isEmploymentInRange(dobStr:string, doeStr:string) {
  const dob:Date = new Date(dobStr);
  const doe:Date = new Date(doeStr);
  const today:Date = new Date();
  if (isNaN(dob.getTime()) || isNaN(doe.getTime())) return false;
  return doe >= dob && doe <= new Date(today.toDateString());
}
export function required(v:string | null | undefined) {
  return !(v === undefined || v === null || String(v).trim() === '');
}
