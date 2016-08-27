# calendar.js
*documentation still in development*

a function that returns chosen month in array

## Motivation
A bare minimum calendar that could be used to render UI from the array. I made this to create a bare bone month view for my personal project in React

*component coming soon*

## Dependencies 
- `moment.js` *likely you’ll would also use this module to your project*

## How to use 
```javascript
// if no arguments provided, the function defaults to current month and year
var config = {
	month: 8,
	year: 2016,
	startDay: 1 // equivalent to Monday
}
var cal = calendar(config);
console.log(cal)
// {
//  data: [
//    [1, 2, 3, 4, 5, 6, 7], 
//    [8, 9, 10, 11, 12, 13, 14], 
//    [15, 16, 17, 18, 19, 20, 21], 
//    [22, 23, 24, 25, 26, 27, 28], 
//    [29, 30, 31, 0, 0, 0, 0]
//  ],
//  dayNumber: [1, 2, 3, 4, 5, 6, 0],
//  month: 8,
//  startDay: 1,
//  year: 2016
// }
```

- `data` is an array which contains an array in week
- `dayNumber` is day in number format. 0 is Sunday. Used if you want to render the day header in month view
- `month` is the current month
- `year` is the current year
- `startDay` is the start day in number format

with `moment.js` you could convert numeral value to readable day format.

##### example 
```javascript
// cal.month = 08
moment(cal.month, 'M').format('MMMM') // August

// cal.dayNumber = [1, 2, 3, 4, 5, 6, 0]
var dayName = cal.dayNumber.map(function(day) {
	return moment(day, 'd').format('dddd')
})

console.log(dayName) // ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
```


## API
pass object to the function

##### month
```javascript
// Pass the month in number format
var cal = calendar({
	month: 1 // January.
});
```

##### year
```javascript
// Pass the year in number format
var cal = calendar({
	year: 2016
});
```

##### startDay
```javascript
// Pass the startDay in number format
var cal = calendar({
	startDay: 6 // month view start in Saturday
});
```

