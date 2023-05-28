export function saveLocal(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function readLocal(key: string): any {
  return JSON.parse(localStorage.getItem(key) || '{}');
}

export function removeLocal(key: string) {
  localStorage.removeItem(key);
}
