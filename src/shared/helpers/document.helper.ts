class DocumentHelper {
  public removePunctuation(text: string): string {
    return text.replace(/[\s./-]*/gim, '');
  }

  public validateCpfOrCnpj(document: string): boolean {
    document = this.removePunctuation(document);
    if (document.length === 11) {
      return this.validateCpf(document);

    } else if (document.length === 14) {
      return this.validateCnpj(document);

    } else {
      return false;

    }
  }

  public validateCpf(cpf: string): boolean {
    cpf = this.removePunctuation(cpf);
    if (cpf.length !== 11) return false;

    for (let i = 0; i <= 9; i += 1) {
      const invalidCpf = `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`;
      if (cpf === invalidCpf) return false;
    }

    let sum = 0;
    let rest;

    for (let i = 1; i <= 9; i += 1) {
      sum += Number(cpf.substring(i - 1, i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== Number(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i += 1) {
      sum += Number(cpf.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== Number(cpf.substring(10, 11))) return false;

    return true;
  }

  public validateCnpj(cnpj: string): boolean {
    cnpj = this.removePunctuation(cnpj);
    if (cnpj.length !== 14) return false;

    for (let i = 0; i <= 9; i += 1) {
      const invalidCnpj = `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`;
      if (cnpj === invalidCnpj) return false;
    }

    const sequenceDigit1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sequenceDigit2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    let rest;

    for (let i = 0; i <= 11; i += 1) {
      sum += Number(cnpj[i]) * sequenceDigit1[i];
    }

    rest = sum % 11;
    rest = rest < 2 ? 0 : 11 - rest;
    if (rest !== Number(cnpj[12])) return false;

    sum = 0;
    rest = 0;
    for (let i = 0; i <= 12; i += 1) {
      sum += Number(cnpj[i]) * sequenceDigit2[i];
    }

    rest = sum % 11;
    rest = rest < 2 ? 0 : 11 - rest;
    if (rest !== Number(cnpj[13])) return false;

    return true;
  }
}

export default new DocumentHelper();
