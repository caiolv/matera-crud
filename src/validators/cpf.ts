/* eslint-disable no-plusplus */
export function isCpfValid(cpf: string): boolean {
  const cpfToValidate = cpf.replace(/[^\d]+/g, '');
  if (cpfToValidate.length !== 11) return false;

  const digits = cpfToValidate.split('').map((digit) => parseInt(digit, 10));
  const allEqual = digits.every((digit) => digit === digits[0]);
  if (allEqual) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += (10 - i) * digits[i];
  }
  let digit1 = 11 - (sum % 11);
  if (digit1 > 9) digit1 = 0;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += (11 - i) * digits[i];
  }
  let digit2 = 11 - (sum % 11);
  if (digit2 > 9) digit2 = 0;

  return digit1 === digits[9] && digit2 === digits[10];
}
