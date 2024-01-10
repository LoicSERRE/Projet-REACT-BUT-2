const now = require ("luxon").DateTime.local();

function getfirstdayofmonth(month, years) {
	return now.plus({months: month, years: years}).startOf('month').weekday;
}

function getdayinmonth(month, years) {
	return now.plus({months: month, years: years}).daysInMonth;
}

function gettodaydate() {
	return now.weekdayLong[0].toUpperCase() + now.weekdayLong.slice(1) + " " + now.day + " " + now.monthLong + " " + now.year;
}

function getmonthname(month, years) {
	return now.plus({months: month, years: years}).month + " " + now.plus({months: month, years: years}).year;
}

export {getfirstdayofmonth, getdayinmonth, gettodaydate, getmonthname};