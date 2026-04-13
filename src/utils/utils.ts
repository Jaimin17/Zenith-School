export const convertObjToQueryString = (obj: any) => {
  if (!obj || typeof obj !== 'object') {
    return ''
  }

  const filteredEntries = Object.entries(obj).filter(([_, value]) => {
    if (value === undefined || value === null) {
      return false
    }

    if (typeof value === 'string') {
      const trimmed = value.trim().toLowerCase()
      if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
        return false
      }
    }

    return true
  })

  if (!filteredEntries.length) {
    return ''
  }

  return '?' + new URLSearchParams(filteredEntries as [string, string][]).toString()
}