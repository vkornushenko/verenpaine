export function formatLocalDate(
  date: string,
  options: Intl.DateTimeFormatOptions,
) {
  const parsedDate = new Date(date);
  if (!Number.isFinite(parsedDate.getTime())) return '';

  return parsedDate.toLocaleString(undefined, options);
}

export function formatDateTimeLocal(date: Date) {
  if (!Number.isFinite(date.getTime())) return '';

  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}