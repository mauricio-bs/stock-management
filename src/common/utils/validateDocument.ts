// FIXME: Fix document validation scripts
export class ValidateDocument {
  validate(document: string): boolean {
    const document_numbers = document.replace(/\D/g, '');

    if (document_numbers.length === 14)
      return this.validateCnpj(document_numbers);
    else if (document_numbers.length === 11)
      return this.validateCpf(document_numbers);

    return false;
  }

  private validateCpf(cpf: string): boolean {
    if (cpf.length !== 11) return false;

    // Validate repeating numbers
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    return remainder === parseInt(cpf.substring(10, 11));
  }

  private validateCnpj(cnpj: string): boolean {
    if (/^(\d)\1{14}$/.test(cnpj)) {
      return false;
    }

    const numbers = cnpj.slice(0, -2); // Get first 12 digits
    const digits = cnpj.slice(-2); // Get last 2 digits

    let sum = 0;
    let pos = numbers.length - 7;

    for (let i = 0; i < numbers.length; i++) {
      sum += parseInt(numbers.charAt(i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) {
      return false;
    }

    sum = 0;
    pos = numbers.length - 7;

    for (let i = 0; i < numbers.length + 1; i++) {
      sum += parseInt(cnpj.charAt(i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
  }

  defaultMessage(): string {
    return 'Invalid cpf/cnpj';
  }
}
