// export function formateDateToIso(unformattedDate: string) {
//   const date = new Date(unformattedDate);
//   const iso = date.toISOString();
//   return iso;
// }

export function formatLocalDate(
  isoDate: string
) {
  return new Intl.DateTimeFormat(
    'en-GB',
    {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }
  ).format(new Date(isoDate));
}

export function formatDateTimeLocal(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}