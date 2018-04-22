export const isUrl = (url: string) => /^(https?:\/\/)/gi.test(url)

export function hasErrors(fieldsError: object) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

/*tslint:disable-next-line*/
export function reorder(list: any[], srcIdx: number, destIdx: number) {
  const items = Array.from(list)
  const [removed] = items.splice(srcIdx, 1)
  items.splice(destIdx, 0, removed)

  return items
}
