export const pluralize = (count: number, singular: string, plural: string) => {
  const pluralRules = new Intl.PluralRules('en-US');

  const gramaticalNumber = pluralRules.select(count);
  switch (gramaticalNumber) {
    case 'one':
      return `${count} ${singular}`;
    default:
      return `${count} ${plural}`;
  }
};
