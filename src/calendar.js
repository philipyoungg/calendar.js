const calendar = (config = {}) => {
  let startDay;
  let today;
  let month;
  let year;

  function resetDate(date) {
    return new Date(date.getTime());
  }

  function newDate(y, m, d) {
    return new Date(y, m, d);
  }

  function newDateOffset(date, offset) {
    // get the offset date in week (month view)
    const extra = ((date.getDay() + 7) - offset) % 7;
    date.setDate(date.getDate() - extra);
    return date;
  }

  function generateDayInMonthView(date, m) {
    const resetedDate = resetDate(date);
    if (resetedDate.getMonth() !== m) {
      return 0;
    }
    return resetedDate.getDate();
  }

  function generateWeekInMonthView(date, m) {
    const resetedDate = resetDate(date);
    const arrWeek = [];
    for (let i = 0; i < 7; i++) {
      arrWeek.push(generateDayInMonthView(resetedDate, m));
      resetedDate.setDate(resetedDate.getDate() + 1);
    }
    return arrWeek;
  }

  function generateMonthArray(date, m) {
    const resetedDate = resetDate(date);
    const arrMonth = [];
    for (let i = 0; i < 6; i++) {
      arrMonth.push(generateWeekInMonthView(resetedDate, m));
      resetedDate.setDate(resetedDate.getDate() + 7);
    }
    return arrMonth;
  }

  function generateDayNumber(sd) {
    const dayInNumber = [];
    for (let i = 0; i < 7; i++) {
      dayInNumber.push((sd + i) % 7);
    }
    return dayInNumber;
  }

  const initialize = () => {
    if (!config.startDay) config.startDay = 'MON';
    if (typeof config.startDay === 'string') config.startDay.toUpperCase();

    if (config.startDay === 'SUN' || config.startDay === 'SUNDAY') {
      config.startDay = 0;
    }

    if (config.startDay === 'MON' || config.startDay === 'MONDAY') {
      config.startDay = 1;
    }

    if (config.startDay === 'SAT' || config.startDay === 'SATURDAY') {
      config.startDay = 6;
    }

    today = new Date();
    startDay = Number(config.startDay) || 0;
    month = config.month - 1;
    year = config.year || today.getFullYear();

    if (typeof config.month === 'undefined') {
      month = today.getMonth();
    }
  };

  initialize();

  return {
    data: generateMonthArray(newDateOffset(newDate(year, month, 1), startDay), month),
    // add index so January = 1
    month: month + 1,
    year,
    startDay,
    dayNumber: generateDayNumber(startDay),
  };
};

module.exports = calendar;
