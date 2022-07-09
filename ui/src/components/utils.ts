export function displayFloat(value: string, decimalsToDisplay: number): string {
  const [integral, fractional] = value.split('.')
  return `${integral}.${fractional.substring(0, decimalsToDisplay)}`
}
