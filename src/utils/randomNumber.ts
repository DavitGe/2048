export function randomNumber(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min));
}
