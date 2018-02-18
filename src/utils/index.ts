/* tslint:disable:no-any */

export const isUrl = (url: string): boolean => /^(https?:\/\/)/gi.test(url)

export function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}
