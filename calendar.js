(function(window) {
  'use strict';

  function calendar(config) {

    var startDay,
    today,
    month,
    year,
    date,
    extra,
    daysInMonth,
    firstDayInMonth,
    initSuccess

    initialize()

    if (initSuccess) {
      return {
        data: generateCalendarMonthArray(year, month, startDay),
        // add index so January = 1
        month: month + 1,
        year: year,
        startDay: startDay,
        dayNumber: generateDayNumber(startDay),
      }
    }

    function generateCalendarMonthArray(y, m, sd) {
      console.log(y)
      date = new Date(y, m, 1)
      // get the offset date in week (month view)
      extra = (date.getDay() + 7 - sd) % 7
      date.setDate(date.getDate() - extra)

      var arrMonth = []
      var arrWeek = []
      // keep looping until next month comes
      while (true) {
        // reset the week array on new loop
        arrWeek = []
        for (var i = 0; i < 7; i++) {
          if (date.getMonth() !== month ) {
            arrWeek.push(0)
          } else {
            arrWeek.push(date.getDate())
          }
          date.setDate(date.getDate() + 1)
        }
        arrMonth.push(arrWeek)
        // stop looping if the last week array contains next month date
        if (date.getMonth() !== month ) {
          break
        }
      }
      return arrMonth
    }

    function generateDayNumber(sd) {
      var dayInNumber = []
      var _startDay = sd
      for (var i = 0; i < 7; i++) {
        if(_startDay > 7) {
          _startDay = 0
        }
        dayInNumber.push(_startDay)
        _startDay += 1
      }
      return dayInNumber
    }

    function initialize() {
      if (typeof config === 'undefined') {
        config = {}
      }

      if (typeof config.startDay === 'undefined') {
        config.startDay = 'Mon'
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
      startDay = Number(config.startDay) || 0

      today = new Date()
      month = config.month - 1
      year = config.year || today.getFullYear()

      if (typeof config.month === 'undefined') {
        month = today.getMonth()
      }

      // all initialization data was success
      initSuccess = true
    }
  }

  window.calendar = calendar

})(window)
