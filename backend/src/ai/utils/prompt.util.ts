export function replacePlaceholders(
  template: string,
  values: Record<string, string>,
): string {
  const result = template.replace(
    /{ingredients}|{dietType}|{servings}|{language}/g,
    (matched) => values[matched],
  );
  return result;
}
