export function formatCredits(names) {
  if (!names?.length) return '';
  if (names.length === 1) return names[0];
  if (names.length === 2) return names[0] + ' & ' + names[1];
  return names.slice(0, -1).join(', ') + ' & ' + names[names.length - 1];
}
