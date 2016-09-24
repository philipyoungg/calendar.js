function calendar(config) {

  var startDay,
  today,
  month,
  year,
  daysInMonth,
  firstDayInMonth,
  initSuccess

  initialize()

  return {
    data: generateMonthArray(newDateOffset(newDate(year, month, 1), startDay), month),
    // add index so January = 1
    month: month + 1,
    year: year,
    startDay: startDay,
    dayNumber: generateDayNumber(startDay),
  }

  function resetDate(date) {
    return new Date(date.getTime())
  }

  function newDate(year, month, day) {
    return new Date(year, month, day)
  }

  function newDateOffset(date, offset) {
    // get the offset date in week (month view)
    var extra = (date.getDay() + 7 - offset) % 7
    date.setDate(date.getDate() - extra)
    return date
  }

  function generateDayInMonthView(date, month) {
    var date = resetDate(date)
    if (date.getMonth() !== month ) {
      return 0
    }
    return date.getDate()
  }

  function generateWeekInMonthView(date, month) {
    var date = resetDate(date)
    var arrWeek = []
    for (var i = 0; i < 7; i++) {
      arrWeek.push(generateDayInMonthView(date, month))
      date.setDate(date.getDate() + 1)
    }
    return arrWeek
  }

  // function generateWeekInMonthView(arr, date, month) {
  //   var date = resetDate(date)
  //   var newArr = arr.concat(generateDayInMonthView(date, month))
  //   date.setDate(date.getDate() + 1)
  //   if (arr.length === 7) {
  //     return newArr
  //   } else {
  //     return generateWeekInMonthView(newArr, date, month)
  //   }
  // }

  function generateMonthArray(date, month) {
    var date = resetDate(date)
    var arrMonth = []
    for (var i = 0; i < 6; i++) {
      arrMonth.push(generateWeekInMonthView(date, month))
      date.setDate(date.getDate() + 7)
    }
    return arrMonth
  }

  function generateDayNumber(sd) {
    var dayInNumber = []
    for (var i = 0; i < 7; i++) {
      dayInNumber.push((sd + i) % 7)
    }
    return dayInNumber
  }

  function initialize() {
    // if (typeof config === 'undefined') {
    //   config = {}
    // }
    config || {}

    config.startDay || config.startDay = 'Mon'

    // if (typeof config.startDay === 'undefined') {
    //   config.startDay = 'Mon'
    // }

    config.startDay.toUpperCase()

    // if (typeof config.startDay === 'string') {
    //   config.startDay = config.startDay.toUpperCase()
    // }

    config.startDay === 'SUN' || config.startDay === 'SUNDAY' ? config.startDay = 0

    // if (config.startDay === 'SUN' || config.startDay === 'SUNDAY') {
    //   config.startDay = 0
    // }

    if (config.startDay === 'MON' || config.startDay === 'MONDAY') {
      config.startDay = 1
    }

    if (config.startDay === 'SAT' || config.startDay === 'SATURDAY') {
      config.startDay = 6
    }

    // if startDay is undefined, return startDay as Sunday
    today = new Date()
    startDay = Number(config.startDay) || 0
    month = config.month - 1
    year = config.year || today.getFullYear()

    if (typeof config.month === 'undefined') {
      month = today.getMonth()
    }

    // all initialization data was success
    initSuccess = true
  }
}
