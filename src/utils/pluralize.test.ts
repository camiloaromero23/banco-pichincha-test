import { pluralize } from './pluralize';

describe('Pluralize', () => {
  let value: number;
  const singular = 'Resultado';
  const plural = 'Resultados';

  beforeEach(() => {
    value = 0;
  });

  it('should return "0 Resultados" when value is 0', () => {
    expect(pluralize(value, singular, plural)).toBe('0 Resultados');
  });

  it('should return "1 Resultado" when value is 1', () => {
    value = 1;
    expect(pluralize(value, singular, plural)).toBe('1 Resultado');
  });

  it('should return "2 Resultados" when value is greater than 1', () => {
    value = 2;
    expect(pluralize(value, singular, plural)).toBe('2 Resultados');
  });
});
