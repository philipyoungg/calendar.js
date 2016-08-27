function Calendar(config) {

  var startDay,
  thisMonth,
  thisYear,
  askedDate,
  fullDateFormat,
  daysInMonth,
  firstDayInMonth

  initialize()

  return {
    data: generateCalendarMonthArray(firstDayInMonth, daysInMonth),
    dayNumber: generateDayNumber(startDay, 7),
    month: thisMonth,
    year: thisYear,
    startDay: startDay
  }

  function generateCalendarMonthArray(firstDayInMonth, daysInMonth) {
    // expected return: an array which contains week array
    var arrMonth = []
    var arrWeek = []
    var arrDate = 0
    // keep looping while date still not = total days in month
    while (arrDate !== daysInMonth) {
      // reset the week array on new loop
      arrWeek = []
      for (var i = 0; i < 7; i++) {
        if (arrDate === 0 && i < firstDayInMonth || arrDate >= daysInMonth) {
          arrWeek.push(0);
        } else {
          arrDate += 1
          arrWeek.push(arrDate)
        }
      }
      arrMonth.push(arrWeek)
    }
    return arrMonth
  }

  function generateDayNumber(startDay, threshold) {
    var dayInNumber = []
    for (var i = 0; i < 7; i++) {
      dayInNumber.push(absoluteThreshold(i + startDay, threshold))
    }
    return dayInNumber
  }

  function absoluteThreshold(day, threshold) {
    if (day < 0) {
      return (day % threshold) + threshold
    } else if (day >= threshold) {
      return day % threshold
    }
    return day
  }

  function initialize() {
    if (typeof config === 'undefined') {
      config = {}
    }

    if (typeof config.startDay === 'undefined') {
      config.startDay = 'Sun'
    }

    if (typeof config.startDay === 'string') {
      config.startDay = config.startDay.toUpperCase()
    }

    if (config.startDay === 'SUN' || config.startDay === 'SUNDAY') {
      config.startDay = 0
    }

    if (config.startDay === 'MON' || config.startDay === 'MONDAY') {
      config.startDay = 1
    }

    if (config.startDay === 'SAT' || config.startDay === 'SATURDAY') {
      config.startDay = 6
    }

    // if startDay is undefined, return startDay as Sunday
    startDay = config.startDay || 0,
    thisMonth = config.month || moment().format('MM'),
    thisYear = config.year || moment().format('YYYY'),
    askedDate = thisYear.concat(',').concat(thisMonth).concat(',').concat('01'),
    fullDateFormat = 'YYYY,MM,DD',
    daysInMonth = moment(askedDate, fullDateFormat).daysInMonth(),
    firstDayInMonth = absoluteThreshold(moment(askedDate, fullDateFormat).format('d') - startDay, 7)
  }
}