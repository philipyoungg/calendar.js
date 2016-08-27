(function(window) {
  'use strict';

  function calendar(config) {

    var startDay,
    thisMonth,
    thisYear,
    askedDate,
    fullDateFormat,
    daysInMonth,
    firstDayInMonth,
    initSuccess

    initialize()

    if (initSuccess) {
      return {
        data: generateCalendarMonthArray(firstDayInMonth, daysInMonth),
        dayNumber: generateDayNumber(startDay, 7),
        month: thisMonth,
        year: thisYear,
        startDay: startDay
      }
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

      if (config.month >= 13 || config.month <= 0) {
        return alert('specify month between 1 and 12')
      }

      if (config.year <= 0) {
        return alert('specify a valid year')
      }

      // if startDay is undefined, return startDay as Sunday
      startDay = Number(config.startDay) || 0,
      thisMonth = Number(config.month) || Number(moment().format('MM')),
      thisYear = Number(config.year) || Number(moment().format('YYYY').toNumber()),
      askedDate = thisYear.toString().concat(',').concat(thisMonth.toString()).concat(',').concat('01'),
      fullDateFormat = 'YYYY,MM,DD',
      daysInMonth = moment(askedDate, fullDateFormat).daysInMonth(),
      firstDayInMonth = absoluteThreshold(moment(askedDate, fullDateFormat).format('d') - startDay, 7)
      initSuccess = true
    }
  }

  window.calendar = calendar

})(window)
