export function getPriceStringWithSeparators(price: number): string {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
    }).format(price);
}

export function formatPhone(phone: string): string {
  // Убираем все символы, кроме цифр и "+"
  const digits = phone.replace(/[^\d+]/g, '');

  // Убираем "+"
  const num = digits.replace('+', '');

  // Разбиваем по шаблону: +7 (XXX) XXX-XX-XX
  return `+${num[0]} (${num.slice(1, 4)}) ${num.slice(4, 7)}-${num.slice(7, 9)}-${num.slice(9, 11)}`;
}

export * from './dates';
