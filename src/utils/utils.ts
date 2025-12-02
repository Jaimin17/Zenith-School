export const convertObjToQueryString = (obj: any) => {
  return '?' + new URLSearchParams(obj).toString()
}