export class LocalStorage {
  static setItem = (key: string, data: object | string) => localStorage.setItem(key, JSON.stringify(data))

  static getItem = (key: string) => JSON.parse(localStorage.getItem(key) || '{}')

  static removeItem = (key: string) => localStorage.removeItem(key)
}