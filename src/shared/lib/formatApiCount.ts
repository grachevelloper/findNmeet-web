type LongLike = {
  low: number
  high: number
  unsigned?: boolean
}

function isLongLike(value: unknown): value is LongLike {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Partial<LongLike>).low === 'number' &&
    typeof (value as Partial<LongLike>).high === 'number'
  )
}

export function formatApiCount(value: unknown): string | number | undefined {
  if (typeof value === 'number' || typeof value === 'string') {
    return value
  }

  if (!isLongLike(value)) {
    return undefined
  }

  const low = BigInt(value.low >>> 0)
  const high = BigInt(value.unsigned ? value.high >>> 0 : value.high)

  return ((high << 32n) + low).toString()
}
