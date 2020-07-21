export const getDate = function(days) {
  const date = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}