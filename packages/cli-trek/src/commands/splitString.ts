export default function splitString(str: string, separator?: string, limit?: number): string[] {
  if (!separator) return [str]
  if (separator && !limit) return str.split(separator)
  return str.split(separator, limit)
}
