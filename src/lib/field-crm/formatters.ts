export function moneyLabel(value: number | string) {
  return `${Number(value || 0).toLocaleString("fr-FR")} DH`;
}
