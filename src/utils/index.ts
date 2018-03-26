export const isUrl = (url: string) => /^(https?:\/\/)/gi.test(url)

export function hasErrors(fieldsError: object) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

export const ItemTypes = { 
  CARD: 'card',
  LIST: 'list'
}
