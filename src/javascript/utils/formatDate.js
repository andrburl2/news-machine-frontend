export const formatDate = function(date) {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const splitDate = date.match(/(\d{4})-(\d{2})-(\d{2})/);
  return `${splitDate[3]} ${months[splitDate[2] - 1]}, ${splitDate[1]}`;
}