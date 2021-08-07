/* eslint-disable */
import React, { memo, useMemo, useCallback, useState, useEffect, useRef } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * This weekday index-to-label map is what is used by the Date object
 */
var NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP = {
    0: 'Su',
    1: 'Mo',
    2: 'Tu',
    3: 'We',
    4: 'Th',
    5: 'Fr',
    6: 'Sa',
};
var NATIVE_INDEX_TO_LABEL_MONTHS_MAP = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
};

/**
 * Add number of days to a month.
 */
function addDays(date, numberOfDaysToAdd, options) {
    var daysLeftToAdd = numberOfDaysToAdd;
    var newDate = date;
    var limitReached = false;
    var loopControl = 0;
    while (daysLeftToAdd > 0) {
        if (loopControl === 1500) {
            limitReached = true;
            break;
        }
        var nextCouldBeDate = getNextDate(newDate);
        if (options.upperLimit && isEqual(options.upperLimit, nextCouldBeDate)) {
            limitReached = true;
            break;
        }
        newDate = nextCouldBeDate;
        if (options.skipDisabledDatesInRange) {
            if (options.skipDisabledDatesInRange && !options.isDisabled(nextCouldBeDate)) {
                // if skipping is enabled and date is not disabled then decrement
                daysLeftToAdd--;
            }
        }
        else {
            // if skipping is disabled then just decrement
            daysLeftToAdd--;
        }
        loopControl++;
    }
    return { endDate: newDate, limitReached: limitReached };
}
/**
 * Converts a date to string
 */
function toString(date) {
    return (date.getFullYear() < 10 ? '0' + date.getFullYear() : date.getFullYear()) + "_" + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + "_" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
}
/**
 * MAkes a date from a string
 */
function fromString(date) {
    return new Date(Number(date.substr(0, 4)), Number(date.substr(5, 2)), Number(date.substr(8, 2)));
}
/**
 * Returns true if toCheck date is before the date
 */
function isBefore(date, toCheckDate) {
    if (toCheckDate.getFullYear() < date.getFullYear()) {
        return true;
    }
    if (toCheckDate.getFullYear() === date.getFullYear()) {
        if (toCheckDate.getMonth() < date.getMonth()) {
            return true;
        }
        if (toCheckDate.getMonth() === date.getMonth()) {
            if (toCheckDate.getDate() < date.getDate()) {
                return true;
            }
        }
    }
    return false;
}
/**
 * Returns true if the given date is valid
 */
function isValid(date) {
    return typeof date !== 'undefined' && date !== null && date.getTime && !isNaN(date.getTime());
}
/**
 * Returns true if the given dates are equal
 */
function isEqual(first, second) {
    return (first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate());
}
/**
 * Returns true if the given date falls inside the range
 */
function isPartOfRange(rangeStart, rangeEnd, date) {
    var rangeStartYear = rangeStart.getFullYear();
    var rangeStartMonth = rangeStart.getMonth();
    var rangeStartDate = rangeStart.getDate();
    var rangeEndYear = rangeEnd.getFullYear();
    var rangeEndMonth = rangeEnd.getMonth();
    var rangeEndDate = rangeEnd.getDate();
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth();
    var dateDate = date.getDate();
    // if date lies in between the year
    if (rangeStartYear <= dateYear && dateYear <= rangeEndYear) {
        // if year is in-between range year start and year end
        if (rangeStartYear < dateYear && dateYear < rangeEndYear) {
            return true;
        }
        // if start year and end year are same
        if (rangeStartYear === rangeEndYear) {
            if (rangeStartMonth <= dateMonth && dateMonth <= rangeEndMonth) {
                // if month is in-between month start and and moth end
                if (rangeStartMonth < dateMonth && dateMonth < rangeEndMonth) {
                    return true;
                }
                // if month start and month end are same
                if (rangeStartMonth === rangeEndMonth) {
                    if (rangeStartDate <= dateDate && dateDate <= rangeEndDate && dateMonth === rangeEndMonth) {
                        return true;
                    }
                    return false;
                }
                // if date is in start month
                if (rangeStartMonth === dateMonth) {
                    if (rangeStartDate <= dateDate) {
                        return true;
                    }
                    return false;
                }
                // if date is in end month
                if (rangeEndMonth === dateMonth) {
                    if (dateDate <= rangeEndDate) {
                        return true;
                    }
                    return false;
                }
                return false;
            }
            return false;
        }
        // if year is same as start year
        if (rangeStartYear === dateYear) {
            // if month is greater than start month
            if (dateMonth > rangeStartMonth) {
                return true;
            }
            // if month is same as start month
            if (dateMonth === rangeStartMonth) {
                // if date is greater than range start date
                if (dateDate >= rangeStartDate) {
                    return true;
                }
            }
            return false;
        }
        // if year is same as end year
        if (rangeEndYear === dateYear) {
            // if month is smaller than end month
            if (dateMonth < rangeEndMonth) {
                return true;
            }
            // if month is same as end month
            if (dateMonth === rangeEndMonth) {
                // if date is smaller than range end date
                if (dateDate <= rangeEndDate) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }
    return false;
}
/**
 * Returns true if the given year is a leap year.
 * @param {number} year
 */
function isALeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
/**
 * Returns the number of days in the given month of the given year.
 * @param {number} year
 * @param {number} month
 */
function getNumberOfDaysInAMonth(year, month) {
    var map = {
        0: 31,
        1: isALeapYear(year) ? 29 : 28,
        2: 31,
        3: 30,
        4: 31,
        5: 30,
        6: 31,
        7: 31,
        8: 30,
        9: 31,
        10: 30,
        11: 31,
    };
    return map[month];
}
function isLastDayOfMonth(date) {
    return getNumberOfDaysInAMonth(date.getFullYear(), date.getMonth()) === date.getDate();
}
function isLastDayOfYear(date) {
    return date.getMonth() === 11 && isLastDayOfMonth(date);
}
function getPreviousMonth(month) {
    return month === 0 ? 11 : (month - 1);
}
function getNextMonth(month) {
    return month === 11 ? 0 : (month + 1);
}
function getPreviousYear(year) {
    return year === 1 ? 1 : year - 1;
}
function getNextYear(year) {
    return year + 1;
}
function getNextDate(date) {
    if (isLastDayOfYear(date)) {
        return new Date(date.getFullYear() + 1, 0, 1);
    }
    else if (isLastDayOfMonth(date)) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }
    else {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    }
}
function giveRangeDays(range) {
    if (!Array.isArray(range)) {
        return [];
    }
    var start = range[0], end = range[1];
    if (!isValid(start) || !isValid(end)) {
        return [];
    }
    var date = start;
    var dates = [];
    while (isBefore(end, date)) {
        dates.push(date);
        date = getNextDate(date);
    }
    dates.push(end);
    return dates;
}
// WEEKDAY UTILS
/**
 * Creates and return a new weekday index-label map as per the **start**
 * parameter. By default this will return the same weekday index-label map
 * used by the Date object.
 * 0 means Sun - if we follow the native Date convention
 * Now if someone wants to start their week from Mon, then 0 would mean Monday which is different from
 * the convention used by the Date methods.
 * @param startOfTheWeek index of the day to be considered as start of the week
 */
function getWeekDaysIndexToLabelMapForAStartOfTheWeek(startOfTheWeek) {
    if (startOfTheWeek === void 0) { startOfTheWeek = 0; }
    // we break [0,1,2,3,4,5,6] in two parts, startOfTheWeek = 3
    // [startOfTheWeek,4,5,6] and [0,1,2] and join them with their labels
    // this is just to re-order the label in the **correct order**
    // i.e 0 becomes Wed although in native order 0 is Sunday
    var order = Object.keys(NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP)
        .slice(startOfTheWeek, 7)
        .concat(Object.keys(NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP).slice(0, startOfTheWeek));
    var map = order.reduce(function (acc, weekdayIndex, index) {
        // acc[0] = DEFAULT_WEEKDAY_INDEX[3]
        acc[Number(index)] = NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP[Number(weekdayIndex)];
        return acc;
    }, {});
    return { map: map, order: order };
}
/**
 * So if the Date object says that some date has 3 day-of-the-week. No this 3 means Wednesday as per the native index for week days.
 * But if a calendar starts from Monday, then wednesday will not be at 3 but it will be at some other index which is according to a different index-label map.
 * So this method returns that index for wednesday.
 * @param weekdayAsPerNativeIndex day-of-the-week as per the Date object
 * @param startOfTheWeek index of the day to be considered as start of the week
 */
function getInfluencedWeekDayIndexAsPerAStartDay(weekdayAsPerNativeIndex, startOfTheWeek) {
    if (startOfTheWeek === void 0) { startOfTheWeek = 0; }
    return (weekdayAsPerNativeIndex >= startOfTheWeek
        ? weekdayAsPerNativeIndex - startOfTheWeek
        : 6 - startOfTheWeek + 1 + weekdayAsPerNativeIndex);
}
// {
//   0: 'Mo',
//   1: 'Tu',
//   2: 'We',
//   3: 'Th',
//   4: 'Fr',
//   5: 'Sa',
//   6: 'Su'
// };
// start = 1
// 6 - 1 = 5
// influencedIndex = 3 (Thu)
// 3 <= 5 so 3 + 1 = 4 (Thu) (native)
// influencedIndex = 2 (Wed)
// 2 <= 5 so 2 + 1 = 3 (Wed) (native)
// influencedIndex = 5 (Sa)
// 5 <= 5 so 5 + 1 = 6 (Sa) (native)
// influencedIndex = 6 (Su)
// 6 > 5 so ((6 - 5) - 1) = 0 (su) (native)
// {
//   0: 'Tu',
//   1: 'We',
//   2: 'Th',
//   3: 'Fr',
//   4: 'Sa',
//   5: 'Su',
//   6: 'Mo'
// };
// start = 2
// 6 - 2 = 4
// influencedIndex = 3 (Fr)
// 3 <= 4 so 3 + 2 = 5 (Fr) (native)
// influencedIndex = 2 (Th)
// 2 <= 4 so 2 + 2 = 4 (Th) (native)
// influencedIndex = 5 (Su)
// 5 > 4 so ((5 - 4) - 1) = 0 (Su) (native)
// influencedIndex = 6 (Mo)
// 6 > 4 so ((6 - 4) - 1) = 1 (Mo) (native)
function getNativeWeekDayIndexFromAStartDayInfluencedIndex(weekdayAsPerChangedIndex, startOfTheWeek) {
    var diversion = 6 - startOfTheWeek;
    return (weekdayAsPerChangedIndex <= diversion
        ? weekdayAsPerChangedIndex + startOfTheWeek
        : weekdayAsPerChangedIndex - diversion - 1);
}
/**
 * Gives the index of day-of-the-week on the 1st of the provided month-year.
 * @param year Specify a year
 * @param month Specify a month
 * @param startOfTheWeek index of the day to be considered as start of the week
 */
function getInfluencedWeekDayIndexOnFirstDateOfMonth(year, month, startOfTheWeek) {
    var date = new Date();
    date.setDate(1);
    date.setMonth(month);
    date.setFullYear(year);
    return getInfluencedWeekDayIndexAsPerAStartDay(date.getDay(), startOfTheWeek);
}
/**
 * Returns info about what indexes are weekend
 * @param startOfTheWeek index of the day to be considered as start of the week
 */
function getWeekendInfo(startOfTheWeek) {
    if (startOfTheWeek === 0) {
        return [6, 0];
    }
    else if (startOfTheWeek === 1) {
        return [5, 6];
    }
    else if (startOfTheWeek === 2) {
        return [4, 5];
    }
    else if (startOfTheWeek === 3) {
        return [3, 4];
    }
    else if (startOfTheWeek === 4) {
        return [2, 3];
    }
    else if (startOfTheWeek === 5) {
        return [1, 2];
    }
    else {
        return [0, 1];
    }
}
// 1 - 20 (20 years in one range block)
// 21 - 40
// so if you provide 3 then the start of raange for 3 would be
// 1 since it belongs to the 1-20 year range.
function getStartOfRangeForAYear(year) {
    // last cell will always be a perfect multiple of 20
    // take 2016 as an example
    if (year % 20 === 0) {
        return 20 * (year / 20 - 1) + 1;
    }
    // try with 2021, 1981, 1973, 3218
    return 20 * Number(Math.floor(year / 20)) + 1;
}
/**
 * Returns matrix for the month select view.
 * @param selectedMonth
 */
function getMonthViewMetrix(selectedMonth) {
    var months = Array.from({ length: 12 }, function (_v, k) {
        return {
            month: k,
            isCurrentMonth: new Date().getMonth() === k,
            isSelectedMonth: selectedMonth[k] === 1,
        };
    });
    return [months.slice(0, 3), months.slice(3, 6), months.slice(6, 9), months.slice(9, 12)];
}
function getPreviousRangeStartingYear(rangeStartYear) {
    if (rangeStartYear === 1) {
        return 1;
    }
    return getStartOfRangeForAYear(rangeStartYear - 1);
}
function getNextRangeStartingYear(rangeStartYear) {
    return getStartOfRangeForAYear(rangeStartYear + 20);
}
function getYearRangeLimits(rangeStartYear) {
    return [rangeStartYear, rangeStartYear + 19];
}
function getYearsViewMetrix(rangeStartYear, selectedYearMap) {
    var years = Array.from({ length: 20 }, function (_v, index) {
        return {
            year: rangeStartYear + index,
            isCurrentYear: new Date().getFullYear() === rangeStartYear + index,
            isSelectedYear: selectedYearMap[rangeStartYear + index] === 1,
        };
    });
    return [years.slice(0, 5), years.slice(5, 10), years.slice(10, 15), years.slice(15, 20)];
}
function validateAndReturnDateFormatter(format) {
    var partsMap = { YYYY: true, MM: true, DD: true };
    var parts = format.split('-');
    if (parts.length !== 3) {
        throw new Error('Date format is invalid.');
    }
    if (!parts.every(function (part) { return partsMap[part]; })) {
        throw new Error('Date format uses unknown parts.');
    }
    /**
     * Separator to be used when formatting the date string.
     * Default is '-' i.e 'DD-MM-YYYY'
     */
    return function (date, separator) {
        if (!isValid(date)) {
            return;
        }
        var string = '';
        parts.forEach(function (part, index) {
            if (part === 'YYYY') {
                string += date.getFullYear();
            }
            if (part === 'MM') {
                string += date.getMonth();
            }
            if (part === 'DD') {
                string += date.getDate();
            }
            if (index !== 2) {
                string += separator;
            }
        });
        return string;
    };
}
function checkIfWeekendHOF(weekends, startDayOfWeek) {
    var weekendMap = weekends.reduce(function (acc, curr) {
        acc[curr] = 1;
        return acc;
    }, {});
    return function checkIfWeekend(date) {
        return weekendMap[getInfluencedWeekDayIndexAsPerAStartDay(date.getDay(), startDayOfWeek)] === 1;
    };
}
function checkIfDateIsDisabledHOF(params) {
    var disablePast = params.disablePast, disableToday = params.disableToday, disableFuture = params.disableFuture, customDisabledCheck = params.customDisabledCheck, maxDate = params.maxDate, minDate = params.minDate, applyMax = params.applyMax, applyMin = params.applyMin;
    var today = new Date();
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth();
    var currDate = today.getDate();
    return function checkIfDateIsDisabled(dateToCheck) {
        if (disablePast) {
            if (dateToCheck.getFullYear() < currentYear) {
                return true;
            }
            if (dateToCheck.getFullYear() === currentYear && dateToCheck.getMonth() < currentMonth) {
                return true;
            }
            if (dateToCheck.getFullYear() === currentYear &&
                dateToCheck.getMonth() === currentMonth &&
                dateToCheck.getDate() < currDate) {
                return true;
            }
        }
        if (disableToday) {
            if (dateToCheck.getFullYear() === currentYear &&
                dateToCheck.getMonth() === currentMonth &&
                dateToCheck.getDate() === currDate) {
                return true;
            }
        }
        if (disableFuture) {
            if (dateToCheck.getFullYear() > currentYear) {
                return true;
            }
            if (dateToCheck.getFullYear() === currentYear && dateToCheck.getMonth() > currentMonth) {
                return true;
            }
            if (dateToCheck.getFullYear() === currentYear &&
                dateToCheck.getMonth() === currentMonth &&
                dateToCheck.getDate() > currDate) {
                return true;
            }
        }
        if (applyMax && maxDate) {
            if (isBefore(dateToCheck, maxDate)) {
                return true;
            }
        }
        if (applyMin && minDate) {
            if (isBefore(minDate, dateToCheck)) {
                return true;
            }
        }
        if (typeof customDisabledCheck === 'function') {
            return customDisabledCheck(dateToCheck);
        }
        return false;
    };
}
function getDaysOfMonthViewMetrix(params) {
    var isRangeSelectModeOn = params.isRangeSelectModeOn, isRangeView = params.isRangeView, selectedDate = params.selectedDate, selectedRangeStart = params.selectedRangeStart, selectedRangeEnd = params.selectedRangeEnd, highlightsMap = params.highlightsMap, newSelectedRangeStart = params.newSelectedRangeStart, newSelectedRangeEnd = params.newSelectedRangeEnd, isSelectMultiDate = params.isSelectMultiDate, selectedMultiDates = params.selectedMultiDates, yearInView = params.yearInView, monthInView = params.monthInView, startOfTheWeek = params.startOfTheWeek, isDisabled = params.isDisabled, checkIfWeekend = params.checkIfWeekend;
    var matrix = [[], [], [], [], [], []];
    var currentMonthDatesStartIndex = getInfluencedWeekDayIndexOnFirstDateOfMonth(yearInView, monthInView, startOfTheWeek);
    var today = new Date();
    var totalDaysInCurrentMonth = getNumberOfDaysInAMonth(yearInView, monthInView);
    var isPrevMonthFromLastYear = monthInView === 0;
    var isCurrentMonthLast = monthInView === 11;
    var totalDaysInPrevMonth = getNumberOfDaysInAMonth(isPrevMonthFromLastYear ? getPreviousYear(yearInView) : yearInView, getPreviousMonth(monthInView));
    // calendar has 6 rows (0 - 5)
    var row = 0;
    var weekColumn = 0;
    //  31 - (6 - 1) === 26
    var lastMonthDateStartFrom = totalDaysInPrevMonth - (currentMonthDatesStartIndex - 1);
    // first loop to fill cell values of last month
    for (var dayOfMonth_1 = lastMonthDateStartFrom; dayOfMonth_1 <= totalDaysInPrevMonth; dayOfMonth_1++) {
        if (weekColumn === 7) {
            weekColumn = 0;
            row++;
        }
        matrix[row].push(getCellValue({
            currDate: new Date(isPrevMonthFromLastYear ? getPreviousYear(yearInView) : yearInView, getPreviousMonth(monthInView), dayOfMonth_1),
            activeMonthInView: false,
            highlightsMap: highlightsMap,
            newSelectedRangeEnd: newSelectedRangeEnd,
            newSelectedRangeStart: newSelectedRangeStart,
            selectedDate: selectedDate,
            selectedRangeEnd: selectedRangeEnd,
            selectedRangeStart: selectedRangeStart,
            isDisabled: isDisabled,
            isRangeSelectModeOn: isRangeSelectModeOn,
            isRangeView: isRangeView,
            isSelectMultiDate: isSelectMultiDate,
            row: row,
            weekColumn: weekColumn,
            checkIfWeekend: checkIfWeekend,
            today: today,
            selectedMultiDates: selectedMultiDates,
            startOfTheWeek: startOfTheWeek,
        }));
        weekColumn++;
    }
    // second loop to fill cell values of current month
    for (var dayOfMonth_2 = 1; dayOfMonth_2 <= totalDaysInCurrentMonth; dayOfMonth_2++) {
        if (weekColumn === 7) {
            weekColumn = 0;
            row++;
        }
        matrix[row].push(getCellValue({
            currDate: new Date(yearInView, monthInView, dayOfMonth_2),
            activeMonthInView: true,
            highlightsMap: highlightsMap,
            newSelectedRangeEnd: newSelectedRangeEnd,
            newSelectedRangeStart: newSelectedRangeStart,
            selectedDate: selectedDate,
            selectedRangeEnd: selectedRangeEnd,
            selectedRangeStart: selectedRangeStart,
            isDisabled: isDisabled,
            isRangeSelectModeOn: isRangeSelectModeOn,
            isRangeView: isRangeView,
            isSelectMultiDate: isSelectMultiDate,
            row: row,
            weekColumn: weekColumn,
            checkIfWeekend: checkIfWeekend,
            today: today,
            selectedMultiDates: selectedMultiDates,
            startOfTheWeek: startOfTheWeek,
        }));
        weekColumn++;
    }
    var dayOfMonth = 1;
    // last loop to fill cell values of next month
    while (matrix[5].length < 7) {
        if (weekColumn === 7) {
            weekColumn = 0;
            row++;
        }
        matrix[row].push(getCellValue({
            currDate: new Date(isCurrentMonthLast ? yearInView + 1 : yearInView, getNextMonth(monthInView), dayOfMonth),
            activeMonthInView: false,
            highlightsMap: highlightsMap,
            newSelectedRangeEnd: newSelectedRangeEnd,
            newSelectedRangeStart: newSelectedRangeStart,
            selectedDate: selectedDate,
            selectedRangeEnd: selectedRangeEnd,
            selectedRangeStart: selectedRangeStart,
            isDisabled: isDisabled,
            isRangeSelectModeOn: isRangeSelectModeOn,
            isRangeView: isRangeView,
            isSelectMultiDate: isSelectMultiDate,
            row: row,
            weekColumn: weekColumn,
            checkIfWeekend: checkIfWeekend,
            today: today,
            selectedMultiDates: selectedMultiDates,
            startOfTheWeek: startOfTheWeek,
        }));
        weekColumn++;
        dayOfMonth++;
    }
    return matrix;
}
function getCellValue(_a) {
    var currDate = _a.currDate, activeMonthInView = _a.activeMonthInView, highlightsMap = _a.highlightsMap, newSelectedRangeEnd = _a.newSelectedRangeEnd, newSelectedRangeStart = _a.newSelectedRangeStart, selectedDate = _a.selectedDate, selectedRangeEnd = _a.selectedRangeEnd, selectedRangeStart = _a.selectedRangeStart, isDisabled = _a.isDisabled, isRangeSelectModeOn = _a.isRangeSelectModeOn, isRangeView = _a.isRangeView, isSelectMultiDate = _a.isSelectMultiDate, row = _a.row, weekColumn = _a.weekColumn, checkIfWeekend = _a.checkIfWeekend, today = _a.today, selectedMultiDates = _a.selectedMultiDates, startOfTheWeek = _a.startOfTheWeek;
    return {
        date: currDate,
        dayOfMonth: currDate.getDate(),
        month: currDate.getMonth(),
        activeMonthInView: activeMonthInView,
        isHighlight: highlightsMap[toString(currDate)] === 1,
        isInRange: isRangeView
            ? isRangeSelectModeOn
                ? isValid(newSelectedRangeStart) && isValid(newSelectedRangeEnd)
                    ? isBefore(newSelectedRangeEnd, newSelectedRangeStart)
                        ? isPartOfRange(newSelectedRangeStart, newSelectedRangeEnd, currDate)
                        : isPartOfRange(newSelectedRangeEnd, newSelectedRangeStart, currDate)
                    : false
                : !!selectedRangeStart && !!selectedRangeEnd && isPartOfRange(selectedRangeStart, selectedRangeEnd, currDate)
            : false,
        isRangeStart: isRangeView
            ? isRangeSelectModeOn
                ? isValid(newSelectedRangeStart)
                    ? isEqual(newSelectedRangeStart, currDate)
                    : false
                : !!selectedRangeStart && isEqual(selectedRangeStart, currDate)
            : false,
        isRangeEnd: isRangeView
            ? isRangeSelectModeOn
                ? false
                : !!selectedRangeEnd && isEqual(selectedRangeEnd, currDate)
            : false,
        year: currDate.getFullYear(),
        dayOfWeek: getNativeWeekDayIndexFromAStartDayInfluencedIndex(weekColumn, startOfTheWeek),
        isWeekend: checkIfWeekend(currDate),
        isToday: isEqual(currDate, today),
        isFirstRow: row === 0,
        isLastRow: row === 5,
        isFirsColumn: weekColumn === 0,
        isLastColumn: weekColumn === 6,
        isSelected: isSelectMultiDate
            ? !!selectedMultiDates[toString(currDate)]
            : isRangeView
                ? false
                : selectedDate
                    ? currDate.getMonth() === selectedDate.getMonth() &&
                        currDate.getFullYear() === selectedDate.getFullYear() &&
                        currDate.getDate() === selectedDate.getDate()
                    : false,
        isDisabled: isDisabled(currDate),
    };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
var header = {
    root: {
        height: '12%',
        padding: '1% 2%',
        display: 'flex',
        alignTtems: 'center',
        width: '100%',
    },
    arc_header_nav: { width: '10.14%', height: '100%', flex: '0 0 auto' },
    arch_header_label: {
        width: '65.21%',
        height: '100%',
        margin: '0 4.34%',
        flex: '1 1 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};
function HeaderComponent(_a) {
    var onClickPrev = _a.onClickPrev, onChangeViewType = _a.onChangeViewType, onClickNext = _a.onClickNext, viewType = _a.viewType, viewingMonth = _a.monthInView, viewingYear = _a.yearInView, yearMatrixEnd = _a.yearMatrixEnd, yearMatrixStart = _a.yearMatrixStart;
    return (React.createElement("header", { style: header.root, className: "arc_header" },
        React.createElement("button", { style: header.arc_header_nav, className: "arc_header_nav arc_header_nav-prev", onClick: onClickPrev },
            React.createElement("span", null, "\u2190")),
        viewType === 'month_dates' ? (React.createElement("button", { style: header.arch_header_label, className: "arc_header_label arc_header_label-days-of-month", onClick: function () { return onChangeViewType('years'); } },
            React.createElement("div", null,
                React.createElement("span", null, NATIVE_INDEX_TO_LABEL_MONTHS_MAP[viewingMonth])),
            React.createElement("div", null,
                React.createElement("span", null, viewingYear)))) : viewType === 'months' ? (React.createElement("button", { style: header.arch_header_label, className: "arc_header_label arc_header_label-months" },
            React.createElement("div", { onClick: function () { return onChangeViewType('years'); } },
                React.createElement("span", null, viewingYear)))) : (React.createElement("button", { style: header.arch_header_label, className: "arc_header_label arc_header_label-years", onClick: function () { return onChangeViewType('month_dates'); } },
            React.createElement("div", null,
                React.createElement("span", null,
                    yearMatrixStart,
                    "-",
                    yearMatrixEnd)))),
        React.createElement("button", { style: header.arc_header_nav, className: "arc_header_nav arc_header_nav-next", onClick: onClickNext },
            React.createElement("span", null, "\u2192"))));
}
var Header = memo(HeaderComponent);

var arc_view_cell_value$2 = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
var arc_view_cell_value_button$2 = {
    width: '95%',
    height: '45%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
function Component$3(_a) {
    var cell = _a.cell, onMonthClicked = _a.onMonthClicked;
    return (React.createElement("div", { style: arc_view_cell_value$2 },
        React.createElement("button", { style: arc_view_cell_value_button$2, onClick: function () {
                onMonthClicked(cell);
            } }, NATIVE_INDEX_TO_LABEL_MONTHS_MAP[cell.month])));
}
var Month = memo(Component$3);

var months = {
    root: { height: '100%' },
    arc_view_row: { height: '24.9%', display: 'flex', width: '100%' },
    arc_view_cell: {
        flexBasis: '33.33%',
        maxWidth: '33.33%',
        height: '100%',
    },
};
function MonthSelectorComponent(_a) {
    var onChangeViewingMonth = _a.onChangeViewingMonth, onChangeViewType = _a.onChangeViewType;
    var monthsViewMatrix = useMemo(function () {
        return getMonthViewMetrix({});
    }, []);
    return (React.createElement("div", { role: "grid", style: months.root, className: "arc_view-months" }, monthsViewMatrix.map(function (row, index) { return (React.createElement("div", { style: months.arc_view_row, className: "arc_view_row", key: index }, row.map(function (cell) { return (React.createElement("div", { style: months.arc_view_cell, className: "arc_view_cell" + (cell.isCurrentMonth ? ' arc_this_month' : ''), key: cell.month },
        React.createElement(Month, { cell: cell, onMonthClicked: function (cell) {
                onChangeViewingMonth(cell.month), onChangeViewType('month_dates');
            } }))); }))); })));
}
var MonthSelector = memo(MonthSelectorComponent);

var arc_view_cell_value$1 = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
var arc_view_cell_value_button$1 = {
    width: '95%',
    height: '45%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
function Component$2(_a) {
    var cell = _a.cell, onYearClicked = _a.onYearClicked;
    return (React.createElement("div", { style: arc_view_cell_value$1 },
        React.createElement("button", { style: arc_view_cell_value_button$1, onClick: function () {
                onYearClicked(cell);
            } }, cell.year)));
}
var Year = memo(Component$2);

var years = {
    root: { height: '100%' },
    arc_view_row: { height: '24.9%', display: 'flex', width: '100%' },
    arc_view_cell: {
        width: '20%',
        height: '100%',
    },
};
function YearSelectorComponent(_a) {
    var onChangeViewType = _a.onChangeViewType, onChangeViewingYear = _a.onChangeViewingYear, yearMatrixStart = _a.yearMatrixStart;
    // TODO add highlight slected dates years
    var yearsMatrix = useMemo(function () {
        return getYearsViewMetrix(yearMatrixStart, {});
    }, [yearMatrixStart]);
    return (React.createElement("div", { role: "grid", style: years.root, className: "arc_view-years" }, yearsMatrix.map(function (row, index) { return (React.createElement("div", { style: years.arc_view_row, className: "arc_view_row", key: index }, row.map(function (cell) { return (React.createElement("div", { style: years.arc_view_cell, className: "arc_view_cell" + (cell.isCurrentYear ? ' arc_this_year' : ''), key: cell.year },
        React.createElement(Year, { cell: cell, onYearClicked: function (cell) {
                onChangeViewingYear(cell.year), onChangeViewType('months');
            } }))); }))); })));
}
var YearSelector = memo(YearSelectorComponent);

var weekdaysRow = {
    arc_view_weekdays: {
        height: '15%',
        margin: '0',
        padding: 0,
        display: 'flex',
        width: '100%',
        listStyle: 'none',
    },
    arc_view_weekdays_cell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flexBasis: '14.286%',
        maxWidth: '14.286%',
    },
    arc_view_weekdays_cell_value: {
        width: '65.95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};
function WeekDaysRowComponent(_a) {
    var weekStartIndex = _a.startOfWeek, weekendIndices = _a.weekends;
    // week days as per the start day of the week
    var _b = useMemo(function () {
        return getWeekDaysIndexToLabelMapForAStartOfTheWeek(weekStartIndex);
    }, [weekStartIndex]), weekDayOrder = _b.order, weekDayMap = _b.map;
    var weekendIndicesMap = useMemo(function () {
        return weekendIndices.reduce(function (acc, curr) {
            acc[curr] = 1;
            return acc;
        }, {});
    }, [weekendIndices]);
    return (React.createElement("ul", { style: weekdaysRow.arc_view_weekdays, className: "arc_view_weekdays" }, weekDayOrder.map(function (weekDay, weekdayIndex) { return (React.createElement("li", { style: weekdaysRow.arc_view_weekdays_cell, key: weekDay, className: "arc_view_weekdays_cell" + (weekendIndicesMap[weekdayIndex] ? ' arc_wknd' : '') },
        React.createElement("div", { style: weekdaysRow.arc_view_weekdays_cell_value },
            React.createElement("span", null, weekDayMap[weekdayIndex])))); })));
}
var WeekDaysRow = memo(WeekDaysRowComponent);

var arc_view_cell = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
var arc_view_cell_value = {
    width: '69.80%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
var arc_view_cell_value_button = {
    width: '100%',
    height: '100%',
};
function Component$1(_a) {
    var cell = _a.cell, onDateClicked = _a.onDateClicked;
    return (React.createElement("div", { style: arc_view_cell },
        React.createElement("div", { style: arc_view_cell_value, className: "arc_view_cell_value" },
            React.createElement("button", { style: arc_view_cell_value_button, disabled: cell.isDisabled, tabIndex: cell.isDisabled ? -1 : 0, onClick: function () { return onDateClicked(cell); } }, cell.dayOfMonth))));
}
var DayOfMonth = memo(Component$1);

var dayOfMonthStyles = {
    'arc_view-days-of-month': {
        height: '85%',
    },
    arc_view_row: {
        height: '16.664%',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
    arc_view_cell: {
        flexBasis: '14.286%',
        maxWidth: '14.286%',
        height: '100%',
    },
};
function DayOfMonthSelectorComponent(_a) {
    var selectedDate = _a.selectedDate, selectedRangeStart = _a.selectedRangeStart, selectedRangeEnd = _a.selectedRangeEnd, newSelectedRangeStart = _a.newSelectedRangeStart, weekStartIndex = _a.startOfWeek, newSelectedRangeEnd = _a.newSelectedRangeEnd, isRangeSelectorView = _a.isRangeSelectorView, skipDisabledDatesInRange = _a.skipDisabledDatesInRange, setIsRangeSelectModeOn = _a.onChangeRangeSelectMode, fixedRangeLength = _a.fixedRange, isFixedRangeView = _a.isFixedRangeView, isRangeSelectModeOn = _a.isRangeSelectModeOn, isDisabled = _a.isDisabled, selectedMultiDates = _a.selectedMultiDates, isMultiSelectorView = _a.isMultiSelectorView, today = _a.today, viewingMonth = _a.monthInView, hideAdjacentDates = _a.hideAdjacentDates, onChangenNewSelectedRangeEnd = _a.onChangenNewSelectedRangeEnd, onChangenNewSelectedRangeStart = _a.onChangenNewSelectedRangeStart, weekendIndices = _a.weekends, onChange = _a.onChange, viewingYear = _a.yearInView, allowFewerDatesThanRange = _a.allowFewerDatesThanRange, disableFuture = _a.disableFuture, disablePast = _a.disablePast, lockView = _a.lockView, checkIfWeekend = _a.checkIfWeekend, onPartialRangeSelect = _a.onPartialRangeSelect, onEachMultiSelect = _a.onEachMultiSelect, highlightsMap = _a.highlightsMap, disableToday = _a.disableToday;
    var daysOfMMonthViewMatrix = useMemo(function () {
        return getDaysOfMonthViewMetrix({
            selectedDate: selectedDate,
            selectedRangeStart: selectedRangeStart,
            selectedRangeEnd: selectedRangeEnd,
            newSelectedRangeStart: newSelectedRangeStart,
            newSelectedRangeEnd: newSelectedRangeEnd,
            checkIfWeekend: checkIfWeekend,
            isRangeView: isRangeSelectorView || isFixedRangeView,
            isRangeSelectModeOn: isRangeSelectModeOn,
            weekendIndexes: weekendIndices,
            selectedMultiDates: selectedMultiDates,
            highlightsMap: highlightsMap,
            isSelectMultiDate: isMultiSelectorView,
            yearInView: viewingYear,
            monthInView: viewingMonth,
            startOfTheWeek: weekStartIndex,
            disableFuture: disableFuture,
            disablePast: disablePast,
            disableToday: disableToday,
            isDisabled: isDisabled,
        });
    }, [
        selectedDate,
        selectedRangeStart,
        selectedRangeEnd,
        newSelectedRangeStart,
        newSelectedRangeEnd,
        isRangeSelectorView,
        isFixedRangeView,
        isRangeSelectModeOn,
        checkIfWeekend,
        weekendIndices,
        selectedMultiDates,
        highlightsMap,
        isMultiSelectorView,
        viewingYear,
        viewingMonth,
        weekStartIndex,
        disableFuture,
        disablePast,
        disableToday,
        isDisabled,
    ]);
    var onDateClicked = useCallback(function (cell) {
        var clickedDate = cell.date;
        var cantSelectAsItsLocked = lockView && clickedDate.getMonth() !== viewingMonth;
        if (cantSelectAsItsLocked) {
            return;
        }
        if (isRangeSelectorView && !isFixedRangeView) {
            if (isRangeSelectModeOn && newSelectedRangeStart) {
                // check if it is the first click or seconds
                var previouslySelectedDate = new Date(newSelectedRangeStart.getFullYear(), newSelectedRangeStart.getMonth(), newSelectedRangeStart.getDate());
                if (isBefore(previouslySelectedDate, clickedDate)) {
                    var startDate = clickedDate;
                    var endDate = previouslySelectedDate;
                    if (typeof onChange === 'function') {
                        onChange([startDate, endDate]);
                    }
                }
                else {
                    var startDate = previouslySelectedDate;
                    var endDate = clickedDate;
                    if (typeof onChange === 'function') {
                        onChange([startDate, endDate]);
                    }
                }
                onChangenNewSelectedRangeEnd(undefined);
                setIsRangeSelectModeOn(false);
            }
            else {
                // select first date
                onChangenNewSelectedRangeStart(clickedDate);
                onChangenNewSelectedRangeEnd(undefined);
                setIsRangeSelectModeOn(true);
                onPartialRangeSelect && onPartialRangeSelect(clickedDate);
            }
        }
        else if (isRangeSelectorView && isFixedRangeView) {
            var _a = addDays(clickedDate, fixedRangeLength, {
                isDisabled: isDisabled,
                skipDisabledDatesInRange: skipDisabledDatesInRange,
                upperLimit: lockView
                    ? new Date(clickedDate.getFullYear(), clickedDate.getMonth() + 1, 1)
                    : disableFuture
                        ? getNextDate(today)
                        : undefined,
            }), endDate = _a.endDate, limitReached = _a.limitReached;
            if (limitReached && !allowFewerDatesThanRange) ;
            else {
                if (typeof onChange === 'function') {
                    onChange([clickedDate, endDate]);
                }
            }
        }
        else if (isMultiSelectorView) {
            var stringkey = toString(clickedDate);
            var newselectedMultiDates_1 = __assign({}, selectedMultiDates);
            if (!!selectedMultiDates[stringkey]) {
                newselectedMultiDates_1[stringkey] = undefined;
            }
            else {
                newselectedMultiDates_1[stringkey] = clickedDate;
            }
            onEachMultiSelect && onEachMultiSelect(clickedDate);
            onChange &&
                onChange(Object.keys(newselectedMultiDates_1)
                    .filter(function (dk) { return !!newselectedMultiDates_1[dk]; })
                    .map(function (dk) { return newselectedMultiDates_1[dk]; }));
        }
        else {
            if (typeof onChange === 'function') {
                onChange(clickedDate);
            }
        }
    }, [
        lockView,
        viewingMonth,
        isRangeSelectorView,
        isFixedRangeView,
        isMultiSelectorView,
        isRangeSelectModeOn,
        newSelectedRangeStart,
        onChangenNewSelectedRangeEnd,
        setIsRangeSelectModeOn,
        onChange,
        onChangenNewSelectedRangeStart,
        onPartialRangeSelect,
        fixedRangeLength,
        isDisabled,
        skipDisabledDatesInRange,
        disableFuture,
        today,
        allowFewerDatesThanRange,
        selectedMultiDates,
        onEachMultiSelect,
    ]);
    return (React.createElement("div", { style: dayOfMonthStyles['arc_view-days-of-month'], className: "arc_view-days-of-month", role: "grid" }, daysOfMMonthViewMatrix.map(function (row, index) { return (React.createElement("div", { style: dayOfMonthStyles.arc_view_row, className: "arc_view_row", key: index }, row.map(function (cell) { return (React.createElement("div", { style: dayOfMonthStyles.arc_view_cell, onMouseEnter: function () {
            if (isRangeSelectorView) {
                if (isRangeSelectModeOn) {
                    onChangenNewSelectedRangeEnd(new Date(cell.year, cell.month, cell.dayOfMonth));
                }
            }
        }, key: toString(cell.date), className: "arc_view_cell" + (cell.activeMonthInView ? ' arc_active' : '') + (cell.isWeekend ? ' arc_wknd' : '') + (cell.isToday ? ' arc_today' : '') + (cell.isFirstRow ? ' arc_fr' : '') + (cell.isToday ? ' arc_today' : '') + (cell.isHighlight ? ' arc_highlight' : '') + (cell.isLastRow ? ' arc_lr' : '') + (cell.isFirsColumn ? ' arc_fc' : '') + (cell.isLastColumn ? ' arc_lc' : '') + (cell.isSelected && !isRangeSelectorView ? ' arc_selected' : '') + (cell.isDisabled ? ' arc_disabled' : '') + (cell.isInRange ? ' arc_in_range' : '') + (cell.isRangeStart ? ' arc_range_start' : '') + (cell.isRangeEnd ? ' arc_range_end' : '') + (isRangeSelectModeOn ? ' arc_range_mode' : '') }, !cell.activeMonthInView && hideAdjacentDates ? null : (React.createElement(DayOfMonth, { cell: cell, onDateClicked: onDateClicked })))); }))); })));
}
var DayOfMonthSelector = memo(DayOfMonthSelectorComponent);

/* eslint-disable @typescript-eslint/no-non-null-assertion */
var bodyStyles = { height: '88%', width: '100%' };
var getStyles = function (size, fontSize) { return ({
    root: {
        arc: {
            width: size + "px",
            height: size + "px",
            fontSize: fontSize + "px",
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            boxSizing: 'border-box',
        },
    },
}); };
function Component(_a) {
    var size = _a.size, fontSize = _a.fontSize, isNormalView = _a.isNormalView, isMultiSelectorView = _a.isMultiSelectorView, isRangeSelectorView = _a.isRangeSelectorView, viewDate = _a.viewDate, selectedDate = _a.selectedDate, selectedRangeStart = _a.selectedRangeStart, selectedMultiDates = _a.selectedMultiDates, minAllowedDate = _a.minAllowedDate, maxAllowedDate = _a.maxAllowedDate, today = _a.today, isSecondary = _a.isSecondary, lockView = _a.lockView, startOfWeek = _a.startOfWeek, weekends = _a.weekends, isRangeSelectModeOn = _a.isRangeSelectModeOn, onChangeRangeSelectMode = _a.onChangeRangeSelectMode, skipDisabledDatesInRange = _a.skipDisabledDatesInRange, hideAdjacentDates = _a.hideAdjacentDates, allowFewerDatesThanRange = _a.allowFewerDatesThanRange, selectedRangeEnd = _a.selectedRangeEnd, newSelectedRangeStart = _a.newSelectedRangeStart, onChangenNewSelectedRangeEnd = _a.onChangenNewSelectedRangeEnd, onChangenNewSelectedRangeStart = _a.onChangenNewSelectedRangeStart, onPartialRangeSelect = _a.onPartialRangeSelect, onEachMultiSelect = _a.onEachMultiSelect, newSelectedRangeEnd = _a.newSelectedRangeEnd, fixedRange = _a.fixedRange, isFixedRangeView = _a.isFixedRangeView, isDisabled = _a.isDisabled, checkIfWeekend = _a.checkIfWeekend, onChange = _a.onChange, disableFuture = _a.disableFuture, disablePast = _a.disablePast, highlightsMap = _a.highlightsMap, disableToday = _a.disableToday;
    var styles = useMemo(function () { return getStyles(size, fontSize); }, [size, fontSize]);
    // View States
    var _b = useState('month_dates'), view = _b[0], setView = _b[1];
    var _c = useState(function () {
        var val = getAttrInViewFromDate({
            isNormalView: isNormalView,
            isMultiSelectorView: isMultiSelectorView,
            isRangeSelectorView: isRangeSelectorView,
            selectedDate: selectedDate,
            selectedRangeStart: selectedRangeStart,
            selectedMultiDates: selectedMultiDates,
            viewDate: viewDate ? fromString(viewDate) : undefined,
            minAllowedDate: minAllowedDate ? fromString(minAllowedDate) : undefined,
            maxAllowedDate: maxAllowedDate ? fromString(maxAllowedDate) : undefined,
            today: today,
            isSecondary: isSecondary,
        }).month;
        return val;
    }), monthInView = _c[0], setMonthInView = _c[1];
    var _d = useState(getAttrInViewFromDate({
        isNormalView: isNormalView,
        isMultiSelectorView: isMultiSelectorView,
        isRangeSelectorView: isRangeSelectorView,
        selectedDate: selectedDate,
        selectedRangeStart: selectedRangeStart,
        selectedMultiDates: selectedMultiDates,
        viewDate: viewDate ? fromString(viewDate) : undefined,
        minAllowedDate: minAllowedDate ? fromString(minAllowedDate) : undefined,
        maxAllowedDate: maxAllowedDate ? fromString(maxAllowedDate) : undefined,
        today: today,
        isSecondary: isSecondary,
    }).year), yearInView = _d[0], setYearInView = _d[1];
    // updating view because view prop change
    useEffect(function () {
        if (viewDate && isValid(fromString(viewDate))) {
            setMonthInView(fromString(viewDate).getMonth());
            setYearInView(fromString(viewDate).getFullYear());
        }
    }, [viewDate]);
    // updating view when selected date change
    useEffect(function () {
        if (isValid(selectedDate)) {
            setMonthInView(selectedDate.getMonth());
            setYearInView(selectedDate.getFullYear());
        }
    }, [selectedDate]);
    // updating view when first multi is selected, after that
    // we don't update
    useEffect(function () {
        var dates = Object.keys(selectedMultiDates)
            .map(function (str) { return selectedMultiDates[str]; })
            .filter(function (d) { return isValid(d); });
        if (dates.length === 1 && dates[0]) {
            setMonthInView(dates[0].getMonth());
            setYearInView(dates[0].getFullYear());
        }
    }, [selectedMultiDates]);
    var changeMonthInView = useCallback(function (month) {
        !lockView && setMonthInView(month);
    }, [lockView, setMonthInView]);
    var changeYearInView = useCallback(function (year) {
        !lockView && setYearInView(year);
    }, [lockView, setYearInView]);
    var changeView = useCallback(function (view) {
        !lockView && setView(view);
    }, [lockView, setView]);
    var _e = useState(getStartOfRangeForAYear(yearInView)), startingYearForCurrRange = _e[0], setStartingYearForCurrRange = _e[1];
    useEffect(function () {
        setStartingYearForCurrRange(getStartOfRangeForAYear(yearInView));
    }, [yearInView, setStartingYearForCurrRange]);
    // 1 - 20, 21 - 40
    var _f = useMemo(function () {
        return getYearRangeLimits(startingYearForCurrRange);
    }, [startingYearForCurrRange]), yearMatrixRangeStart = _f[0], yearMatrixRangeEnd = _f[1];
    // callback handlers
    var onPrevClick = useCallback(function () {
        if (view === 'month_dates') {
            var isPrevMonthFromLastYear = monthInView === 0;
            if (isPrevMonthFromLastYear) {
                setYearInView(getPreviousYear(yearInView));
            }
            changeMonthInView(getPreviousMonth(monthInView));
        }
        if (view === 'years') {
            setStartingYearForCurrRange(getPreviousRangeStartingYear(startingYearForCurrRange));
        }
        if (view === 'months') {
            changeYearInView(yearInView !== 1 ? yearInView - 1 : 1);
        }
    }, [
        changeMonthInView,
        monthInView,
        changeYearInView,
        yearInView,
        view,
        setStartingYearForCurrRange,
        startingYearForCurrRange,
    ]);
    var onNextClick = useCallback(function () {
        if (view === 'month_dates') {
            var isCurrentMonthLast = monthInView === 11;
            if (isCurrentMonthLast) {
                changeYearInView(getNextYear(yearInView));
            }
            changeMonthInView(getNextMonth(monthInView));
        }
        if (view === 'years') {
            setStartingYearForCurrRange(getNextRangeStartingYear(startingYearForCurrRange));
        }
        if (view === 'months') {
            changeYearInView(getNextYear(yearInView));
        }
    }, [
        changeMonthInView,
        monthInView,
        changeYearInView,
        yearInView,
        view,
        setStartingYearForCurrRange,
        startingYearForCurrRange,
    ]);
    var calendarRef = useRef(null);
    var cells = useRef([]);
    var _g = useState(false), hasFocus = _g[0], setHasFocus = _g[1];
    useEffect(function () {
        if (!hasFocus) {
            return;
        }
        var currentCalendarRef = calendarRef.current;
        if (!currentCalendarRef) {
            return;
        }
        cells.current = currentCalendarRef
            ? Array.from(currentCalendarRef.querySelectorAll('[role="grid"] button:not([disabled])'))
            : [];
        var firstItem = cells.current[0];
        var lastItem = cells.current[cells.current.length - 1];
        var grid = currentCalendarRef.querySelector('[role="grid"]');
        var seletedItemIfAny = currentCalendarRef.querySelector('[role="grid"] .arc_selected button') ||
            currentCalendarRef.querySelector('[role="grid"] .arc_range_end button') ||
            currentCalendarRef.querySelector('[role="grid"] .arc_range_start button');
        var firstActiveItem = currentCalendarRef.querySelector('[role="grid"] .arc_active button');
        var prevButton = currentCalendarRef.querySelector('header .arc_header_nav-prev');
        var nextButton = currentCalendarRef.querySelector('header .arc_header_nav-next');
        var monthYearSelector = currentCalendarRef.querySelector('header .arc_header_label');
        if (grid && !grid.contains(document.activeElement)) {
            // if focus in not already inside the GRID then bring the focus
            if (seletedItemIfAny) {
                seletedItemIfAny.focus();
            }
            else if (firstActiveItem) {
                firstActiveItem.focus();
            }
            else {
                firstItem.focus();
            }
        }
        var focusNext = function (currentItem, startItem) {
            // Determine which item is the startItem (first or last)
            var goingDown = startItem === firstItem;
            var move = function (elem) {
                var indexOfItem = cells.current.indexOf(elem);
                if (goingDown) {
                    if (indexOfItem < cells.current.length - 1) {
                        return cells.current[indexOfItem + 1];
                    }
                    return startItem;
                }
                if (indexOfItem - 1 > -1) {
                    return cells.current[indexOfItem - 1];
                }
                return startItem;
            };
            if (!currentItem) {
                return null;
            }
            var nextItem = move(currentItem);
            return nextItem;
        };
        function onKeyPressListener(e) {
            var target = e.target;
            var cell = cells.current && cells.current.find(function (item) { return item === target; });
            if (!cell) {
                return;
            }
            if (e.key === 'Tab') {
                e.preventDefault();
                var endItem = focusNext(cell, firstItem);
                if (endItem === firstItem) {
                    prevButton === null || prevButton === void 0 ? void 0 : prevButton.focus();
                }
                else if (document.activeElement === nextButton) {
                    firstItem === null || firstItem === void 0 ? void 0 : firstItem.focus();
                }
                else if (document.activeElement === monthYearSelector) {
                    nextButton === null || nextButton === void 0 ? void 0 : nextButton.focus();
                }
                else if (document.activeElement === prevButton) {
                    monthYearSelector === null || monthYearSelector === void 0 ? void 0 : monthYearSelector.focus();
                }
                else {
                    endItem === null || endItem === void 0 ? void 0 : endItem.focus();
                }
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                var count = view === 'month_dates' ? 7 : view === 'months' ? 3 : 5;
                var endItem = cell;
                while (count > 0) {
                    endItem = focusNext(endItem, firstItem);
                    count--;
                }
                endItem === null || endItem === void 0 ? void 0 : endItem.focus();
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                var count = view === 'month_dates' ? 7 : view === 'months' ? 3 : 5;
                var endItem = cell;
                while (count > 0) {
                    endItem = focusNext(endItem, lastItem);
                    count--;
                }
                endItem === null || endItem === void 0 ? void 0 : endItem.focus();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                var endItem = focusNext(cell, lastItem);
                endItem === null || endItem === void 0 ? void 0 : endItem.focus();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                var endItem = focusNext(cell, firstItem);
                endItem === null || endItem === void 0 ? void 0 : endItem.focus();
            }
            if (e.key === 'Home') {
                e.preventDefault();
                firstItem.focus();
            }
            if (e.key === 'End') {
                e.preventDefault();
                lastItem.focus();
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                cell.blur();
                currentCalendarRef === null || currentCalendarRef === void 0 ? void 0 : currentCalendarRef.blur();
            }
        }
        currentCalendarRef.addEventListener('keydown', onKeyPressListener, { capture: true });
        return function () {
            currentCalendarRef.removeEventListener('keydown', onKeyPressListener, { capture: true });
        };
    }, [calendarRef, view, hasFocus, monthInView]);
    return (React.createElement("div", { onFocus: function () {
            !hasFocus && setHasFocus(true);
        }, onBlur: function (e) {
            if (e.currentTarget.contains(e.target)) ;
            else {
                setHasFocus(false);
            }
        }, style: styles.root.arc, className: "arc", ref: calendarRef },
        React.createElement(Header, { onClickPrev: onPrevClick, onClickNext: onNextClick, onChangeViewType: changeView, viewType: view, monthInView: monthInView, yearInView: yearInView, yearMatrixStart: yearMatrixRangeStart, yearMatrixEnd: yearMatrixRangeEnd }),
        React.createElement("div", { style: bodyStyles, className: "arc_view" },
            view === 'months' && React.createElement(MonthSelector, { onChangeViewType: changeView, onChangeViewingMonth: changeMonthInView }),
            view === 'years' && (React.createElement(YearSelector, { onChangeViewType: changeView, onChangeViewingYear: changeYearInView, yearMatrixStart: yearMatrixRangeStart, yearMatrixEnd: yearMatrixRangeEnd })),
            view === 'month_dates' && (React.createElement(React.Fragment, null,
                React.createElement(WeekDaysRow, { startOfWeek: startOfWeek, weekends: weekends }),
                React.createElement(DayOfMonthSelector, { isRangeSelectModeOn: isRangeSelectModeOn, onChangeRangeSelectMode: onChangeRangeSelectMode, skipDisabledDatesInRange: skipDisabledDatesInRange, hideAdjacentDates: hideAdjacentDates, allowFewerDatesThanRange: allowFewerDatesThanRange, selectedDate: selectedDate, selectedRangeStart: selectedRangeStart, selectedRangeEnd: selectedRangeEnd, lockView: lockView, newSelectedRangeStart: newSelectedRangeStart, startOfWeek: startOfWeek, onChangenNewSelectedRangeEnd: onChangenNewSelectedRangeEnd, onChangenNewSelectedRangeStart: onChangenNewSelectedRangeStart, onPartialRangeSelect: onPartialRangeSelect, onEachMultiSelect: onEachMultiSelect, newSelectedRangeEnd: newSelectedRangeEnd, isRangeSelectorView: isRangeSelectorView, fixedRange: fixedRange, isFixedRangeView: isFixedRangeView, isDisabled: isDisabled, checkIfWeekend: checkIfWeekend, selectedMultiDates: selectedMultiDates, isMultiSelectorView: isMultiSelectorView, monthInView: monthInView, today: today, maxAllowedDate: maxAllowedDate, minAllowedDate: minAllowedDate, weekends: weekends, onChange: onChange, yearInView: yearInView, disableFuture: disableFuture, disablePast: disablePast, highlightsMap: highlightsMap, disableToday: disableToday }))))));
}
var CalendarView = memo(Component);
function getAttrInViewFromDate(props) {
    var firstOfMulti = props.isMultiSelectorView &&
        props.selectedMultiDates &&
        props.selectedMultiDates[Object.keys(props.selectedMultiDates)[0]];
    var date = isValid(props.viewDate)
        ? props.viewDate
        : props.isNormalView && isValid(props.selectedDate)
            ? props.selectedDate
            : props.isRangeSelectorView && props.selectedRangeStart
                ? props.selectedRangeStart
                : firstOfMulti && isValid(firstOfMulti)
                    ? firstOfMulti
                    : isValid(props.minAllowedDate)
                        ? props.minAllowedDate
                        : isValid(props.maxAllowedDate)
                            ? props.maxAllowedDate
                            : props.today;
    return { month: date.getMonth(), year: date.getFullYear() };
}

var emptyArray = [];
var styles = { display: 'inline-flex' };
function CalendarWithRef(_a, forwardRef) {
    var value = _a.value, isMultiSelector = _a.isMultiSelector, _b = _a.className, className = _b === void 0 ? '' : _b, isRangeSelector = _a.isRangeSelector, _c = _a.useDarkMode, useDarkMode = _c === void 0 ? false : _c, weekends = _a.weekends, _d = _a.highlights, highlights = _d === void 0 ? emptyArray : _d, initialViewDate = _a.viewDate, _e = _a.allowFewerDatesThanRange, allowFewerDatesThanRange = _e === void 0 ? false : _e, _f = _a.startOfWeek, startOfWeek = _f === void 0 ? 1 : _f, maxAllowedDate = _a.maxAllowedDate, _g = _a.skipDisabledDatesInRange, skipDisabledDatesInRange = _g === void 0 ? false : _g, minAllowedDate = _a.minAllowedDate, fixedRange = _a.fixedRange, isDisabled = _a.isDisabled, onPartialRangeSelect = _a.onPartialRangeSelect, onEachMultiSelect = _a.onEachMultiSelect, onChange = _a.onChange, _h = _a.lockView, lockView = _h === void 0 ? false : _h, _j = _a.disableFuture, disableFuture = _j === void 0 ? false : _j, _k = _a.size, size = _k === void 0 ? 276 : _k, _l = _a.fontSize, fontSize = _l === void 0 ? 16 : _l, _m = _a.disablePast, disablePast = _m === void 0 ? false : _m, _o = _a.disableToday, disableToday = _o === void 0 ? false : _o, _p = _a.showDualCalendar, showDualCalendar = _p === void 0 ? false : _p, _q = _a.hideAdjacentDates, hideAdjacentDates = _q === void 0 ? false : _q;
    var today = useState(new Date())[0];
    var isRangeSelectorView = !!isRangeSelector;
    var isDualMode = isRangeSelectorView && !!showDualCalendar;
    var isMultiSelectorView = !isRangeSelectorView && !!isMultiSelector;
    var isFixedRangeView = isRangeSelectorView && typeof fixedRange === 'number' && fixedRange > 0 ? true : false;
    var isNormalView = !isRangeSelectorView && !isMultiSelectorView;
    var startOfTheWeek = startOfWeek;
    var fixedRangeLength = isFixedRangeView ? fixedRange : 1;
    if (isNormalView && Array.isArray(value)) {
        throw new Error('`value` should an instance of the Date class. Provided value is an Array.');
    }
    var highlightsMap = useMemo(function () {
        if (Array.isArray(highlights)) {
            return highlights
                .filter(function (d) { return isValid(d); })
                .reduce(function (acc, curr) {
                acc[toString(curr)] = 1;
                return acc;
            }, {});
        }
        return {};
    }, [highlights]);
    var weekendIndexes = useMemo(function () {
        return Array.isArray(weekends) && (weekends.every(function (num) { return typeof num === 'number'; }) || weekends.length === 0)
            ? weekends
            : getWeekendInfo(startOfTheWeek);
    }, [startOfTheWeek, weekends]);
    var maxDate = useMemo(function () {
        return isValid(maxAllowedDate) ? toString(maxAllowedDate) : undefined;
    }, [maxAllowedDate]);
    var minDate = useMemo(function () {
        return isValid(minAllowedDate) ? toString(minAllowedDate) : undefined;
    }, [minAllowedDate]);
    var viewDate = useMemo(function () {
        return isValid(initialViewDate) ? toString(initialViewDate) : undefined;
    }, [initialViewDate]);
    var applyMaxConstraint = useMemo(function () {
        return isValid(maxAllowedDate)
            ? isValid(minAllowedDate)
                ? isBefore(maxAllowedDate, minAllowedDate)
                : true
            : false;
    }, [maxAllowedDate, minAllowedDate]);
    var applyminConstraint = useMemo(function () {
        return isValid(minAllowedDate)
            ? isValid(maxAllowedDate)
                ? isBefore(maxAllowedDate, minAllowedDate)
                : true
            : false;
    }, [maxAllowedDate, minAllowedDate]);
    var checkDisabledForADate = useMemo(function () {
        return checkIfDateIsDisabledHOF({
            disablePast: disablePast,
            disableToday: disableToday,
            disableFuture: disableFuture,
            customDisabledCheck: isDisabled,
            maxDate: maxDate ? fromString(maxDate) : undefined,
            minDate: minDate ? fromString(minDate) : undefined,
            applyMax: applyMaxConstraint,
            applyMin: applyminConstraint,
        });
    }, [applyMaxConstraint, applyminConstraint, disableFuture, disablePast, disableToday, isDisabled, maxDate, minDate]);
    var checkIfWeekend = useMemo(function () { return checkIfWeekendHOF(weekendIndexes, startOfTheWeek); }, [startOfTheWeek, weekendIndexes]);
    var selectedDate = useMemo(function () { return (isNormalView && isValid(value) ? value : undefined); }, [isNormalView, value]);
    var selectedMultiDates = useMemo(function () {
        if (isMultiSelectorView && Array.isArray(value) && value.every(isValid)) {
            return value.reduce(function (acc, currDate) {
                if (isValid(currDate)) {
                    acc[toString(currDate)] = currDate;
                }
                return acc;
            }, {});
        }
        else {
            return {};
        }
    }, [isMultiSelectorView, value]);
    // selected range start date
    var selectedRangeStart = useMemo(function () {
        if (isRangeSelectorView && Array.isArray(value) && isValid(value[0])) {
            var year = value[0].getFullYear();
            var month = value[0].getMonth();
            var date = value[0].getDate();
            return new Date(year, month, date);
        }
        else {
            return undefined;
        }
    }, [isRangeSelectorView, value]);
    var selectedRangeEnd = useMemo(function () {
        if (isRangeSelectorView &&
            selectedRangeStart &&
            Array.isArray(value) &&
            isValid(value[1]) &&
            isBefore(value[1], selectedRangeStart)) {
            var year = value[1].getFullYear();
            var month = value[1].getMonth();
            var date = value[1].getDate();
            return new Date(year, month, date);
        }
        else {
            // TODO read from user's value prop
            return undefined;
        }
    }, [isRangeSelectorView, selectedRangeStart, value]);
    var _r = useState(false), isRangeSelectModeOn = _r[0], setIsRangeSelectModeOn = _r[1];
    var _s = useState(selectedRangeStart), newSelectedRangeStart = _s[0], setNewSelectedRangeStart = _s[1];
    var _t = useState(selectedRangeEnd), newSelectedRangeEnd = _t[0], setNewSelectedRangeEnd = _t[1];
    var commonProps = useMemo(function () { return ({
        showDualCalendar: isDualMode,
        viewDate: viewDate,
        useDarkMode: useDarkMode,
        className: className,
        hideAdjacentDates: !!hideAdjacentDates,
        isNormalView: isNormalView,
        size: size,
        fontSize: fontSize,
        startOfWeek: startOfTheWeek,
        weekends: weekendIndexes,
        isRangeSelectModeOn: isRangeSelectModeOn,
        onChangeRangeSelectMode: setIsRangeSelectModeOn,
        skipDisabledDatesInRange: !!skipDisabledDatesInRange,
        allowFewerDatesThanRange: !!allowFewerDatesThanRange,
        selectedDate: selectedDate,
        selectedRangeStart: selectedRangeStart,
        selectedRangeEnd: selectedRangeEnd,
        lockView: !!lockView,
        newSelectedRangeStart: newSelectedRangeStart,
        onChangenNewSelectedRangeEnd: setNewSelectedRangeEnd,
        onChangenNewSelectedRangeStart: setNewSelectedRangeStart,
        onPartialRangeSelect: onPartialRangeSelect,
        onEachMultiSelect: onEachMultiSelect,
        newSelectedRangeEnd: newSelectedRangeEnd,
        isRangeSelectorView: isRangeSelectorView,
        fixedRange: fixedRangeLength,
        isFixedRangeView: isFixedRangeView,
        isDisabled: checkDisabledForADate,
        checkIfWeekend: checkIfWeekend,
        selectedMultiDates: selectedMultiDates,
        isMultiSelectorView: isMultiSelectorView,
        today: today,
        maxAllowedDate: maxDate,
        minAllowedDate: minDate,
        onChange: onChange,
        disableFuture: disableFuture,
        disablePast: disablePast,
        highlightsMap: highlightsMap,
        disableToday: disableToday,
    }); }, [
        allowFewerDatesThanRange,
        checkDisabledForADate,
        checkIfWeekend,
        className,
        disableFuture,
        disablePast,
        hideAdjacentDates,
        disableToday,
        fixedRangeLength,
        fontSize,
        highlightsMap,
        viewDate,
        isDualMode,
        isFixedRangeView,
        isMultiSelectorView,
        isNormalView,
        isRangeSelectModeOn,
        isRangeSelectorView,
        lockView,
        maxDate,
        minDate,
        newSelectedRangeEnd,
        newSelectedRangeStart,
        onChange,
        onEachMultiSelect,
        onPartialRangeSelect,
        selectedDate,
        selectedMultiDates,
        selectedRangeEnd,
        selectedRangeStart,
        size,
        skipDisabledDatesInRange,
        startOfTheWeek,
        today,
        useDarkMode,
        weekendIndexes,
    ]);
    var computedClass = useMemo(function () {
        return typeof className === 'string'
            ? "arc_root" + (useDarkMode ? ' arc_dark' : '') + (isDualMode ? ' arc_dual' : '') + (" " + className)
            : "arc_root" + (useDarkMode ? ' arc_dark' : '') + (isDualMode ? ' arc_dual' : '');
    }, [className, useDarkMode, isDualMode]);
    return (React.createElement("div", { className: computedClass, style: styles, ref: forwardRef }, isDualMode ? (React.createElement(React.Fragment, null,
        React.createElement(CalendarView, __assign({ isSecondary: false }, commonProps)),
        React.createElement(CalendarView, __assign({ isSecondary: true }, commonProps)))) : (React.createElement(CalendarView, __assign({ isSecondary: false }, commonProps)))));
}
var Calendar = React.forwardRef(CalendarWithRef);
var giveDaysInRange = giveRangeDays;
/**
 * A combination of YYYY-MM-DD.
 * Eg. MM-DD-YYYY, DD-MM-YYYY etc.
 * Default is '-' i.e 'DD-MM-YYYY'
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var giveFormatter = function (format) { return validateAndReturnDateFormatter(format || 'DD-MM-YYYY'); };

export { Calendar, giveDaysInRange, giveFormatter };
