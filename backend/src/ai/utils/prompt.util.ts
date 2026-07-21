export function replacePlaceholders(
  template: string,
  values: Record<string, string>,
): string {
  const result = template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    return values[key.trim()] || match;
  });

  return result;
}
