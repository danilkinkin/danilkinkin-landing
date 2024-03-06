export default function getMyAge(now = new Date()) {
  const born = new Date("1999-02-13T22:30:00+0500");

  const correctiveMonth = now.getMonth() - born.getMonth() < 0;
  const correctiveDate =
    now.getMonth() === born.getMonth() && now.getDate() - born.getDate() < 0;
  const correctiveHours =
    now.getDate() === born.getDate() && now.getHours() - born.getHours() < 0;
  const correctiveMinutes =
    now.getHours() === born.getHours() &&
    now.getMinutes() - born.getMinutes() < 0;
  const corrective =
    correctiveMonth || correctiveDate || correctiveHours || correctiveMinutes
      ? -1
      : 0;

  return now.getFullYear() - born.getFullYear() + corrective;
}
