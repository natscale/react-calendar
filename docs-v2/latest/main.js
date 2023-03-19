/* eslint-disable */
import React, { memo, useMemo, useCallback, useEffect, useState, useRef, useImperativeHandle } from 'react';

/******************************************************************************
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
function addDays(date, numberOfDaysToAdd) {
    var daysLeftToAdd = numberOfDaysToAdd;
    var newDate = date;
    var loopControl = 0;
    while (daysLeftToAdd > 0) {
        if (loopControl === 1500) {
            break;
        }
        var nextCouldBeDate = getNextDate(newDate);
        newDate = nextCouldBeDate;
        daysLeftToAdd--;
        loopControl++;
    }
    return { endDate: newDate };
}
/**
 * Converts a date to string
 */
function toString(date) {
    return "".concat(date.getFullYear() < 10 ? '0' + date.getFullYear() : date.getFullYear(), "_").concat(date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(), "_").concat(date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
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
function numDifference(range) {
    if (!Array.isArray(range)) {
        return 0;
    }
    var start = range[0], end = range[1];
    if (!isValid(start) || !isValid(end)) {
        return 0;
    }
    var date = start;
    var count = 0;
    while (isBefore(end, date)) {
        count++;
        date = getNextDate(date);
    }
    return count;
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
    var map = order.reduce(function (acc, weekdayIndex) {
        // acc[0] = DEFAULT_WEEKDAY_INDEX[3]
        acc[Number(weekdayIndex)] =
            NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP[Number(weekdayIndex)];
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
function checkIfWeekendHOF(weekends) {
    var weekendMap = weekends.reduce(function (acc, curr) {
        acc[curr] = 1;
        return acc;
    }, {});
    return function checkIfWeekend(date) {
        return weekendMap[date.getDay()] === 1;
    };
}
function checkIfDateIsDisabledHOF(params) {
    var customDisabledCheck = params.customDisabledCheck;
    return function checkIfDateIsDisabled(dateToCheck) {
        if (typeof customDisabledCheck === 'function') {
            return customDisabledCheck(dateToCheck);
        }
        return false;
    };
}
function getDaysOfMonthViewMetrix(params) {
    var isRangeSelectModeOn = params.isRangeSelectModeOn, isRangeView = params.isRangeView, selectedDate = params.selectedDate, selectedRangeStart = params.selectedRangeStart, selectedRangeEnd = params.selectedRangeEnd, isHighlight = params.isHighlight, newSelectedRangeStart = params.newSelectedRangeStart, newSelectedRangeEnd = params.newSelectedRangeEnd, isSelectMultiDate = params.isSelectMultiDate, selectedMultiDates = params.selectedMultiDates, yearInView = params.yearInView, monthInView = params.monthInView, startOfTheWeek = params.startOfTheWeek, isDisabled = params.isDisabled, checkIfWeekend = params.checkIfWeekend;
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
            isHighlight: isHighlight,
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
            isHighlight: isHighlight,
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
            isHighlight: isHighlight,
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
    var currDate = _a.currDate, activeMonthInView = _a.activeMonthInView, isHighlight = _a.isHighlight, newSelectedRangeEnd = _a.newSelectedRangeEnd, newSelectedRangeStart = _a.newSelectedRangeStart, selectedDate = _a.selectedDate, selectedRangeEnd = _a.selectedRangeEnd, selectedRangeStart = _a.selectedRangeStart, isDisabled = _a.isDisabled, isRangeSelectModeOn = _a.isRangeSelectModeOn, isRangeView = _a.isRangeView, isSelectMultiDate = _a.isSelectMultiDate, row = _a.row, weekColumn = _a.weekColumn, checkIfWeekend = _a.checkIfWeekend, today = _a.today, selectedMultiDates = _a.selectedMultiDates, startOfTheWeek = _a.startOfTheWeek;
    return {
        date: currDate,
        dayOfMonth: currDate.getDate(),
        month: currDate.getMonth(),
        activeMonthInView: activeMonthInView,
        isHighlight: typeof isHighlight === 'function' ? isHighlight(currDate) : false,
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
    rc_header_nav: { width: '10.14%', height: '100%', flex: '0 0 auto' },
    rch_header_label: {
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
    var onClickPrev = _a.onClickPrev, onChangeViewType = _a.onChangeViewType, monthsLabel = _a.monthsLabel, showDualCalendar = _a.showDualCalendar, isSecondary = _a.isSecondary, onClickNext = _a.onClickNext, viewType = _a.viewType, viewingMonth = _a.monthInView, viewingYear = _a.yearInView, yearMatrixEnd = _a.yearMatrixEnd, yearMatrixStart = _a.yearMatrixStart;
    return (React.createElement("header", { style: header.root, className: "rc_header" },
        showDualCalendar && isSecondary ? null : (React.createElement("button", { type: "button", style: header.rc_header_nav, className: "rc_header_nav rc_header_nav-prev", onClick: onClickPrev },
            React.createElement("span", null, "\u2190"))),
        viewType === 'month_dates' ? (React.createElement("button", { type: "button", style: header.rch_header_label, className: "rc_header_label rc_header_label-days-of-month", onClick: function () { return !isSecondary && onChangeViewType('years'); } },
            React.createElement("div", null,
                React.createElement("span", null, monthsLabel[viewingMonth])),
            React.createElement("div", null,
                React.createElement("span", null, viewingYear)))) : viewType === 'months' ? (React.createElement("button", { type: "button", style: header.rch_header_label, className: "rc_header_label rc_header_label-months" },
            React.createElement("div", { onClick: function () { return !isSecondary && onChangeViewType('years'); } },
                React.createElement("span", null, viewingYear)))) : (React.createElement("button", { type: "button", style: header.rch_header_label, className: "rc_header_label rc_header_label-years", onClick: function () { return !isSecondary && onChangeViewType('month_dates'); } },
            React.createElement("div", null,
                React.createElement("span", null,
                    yearMatrixStart,
                    "-",
                    yearMatrixEnd)))),
        showDualCalendar && !isSecondary && viewType === 'month_dates' ? null : (React.createElement("button", { type: "button", style: header.rc_header_nav, className: "rc_header_nav rc_header_nav-next", onClick: onClickNext },
            React.createElement("span", null, "\u2192")))));
}
var Header = memo(HeaderComponent);

var rcBodyCellValue$1 = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
var rcBodyCellValueButton$1 = {
    width: '95%',
    height: '45%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
function Component$3(_a) {
    var cell = _a.cell, onMonthClicked = _a.onMonthClicked, monthsLabel = _a.monthsLabel;
    return (React.createElement("div", { style: rcBodyCellValue$1 },
        React.createElement("button", { type: "button", style: rcBodyCellValueButton$1, onClick: function () {
                onMonthClicked(cell);
            } }, monthsLabel[cell.month])));
}
var Month = memo(Component$3);

var months = {
    root: { height: '100%' },
    'rc_body-row': { height: '24.9%', display: 'flex', width: '100%' },
    'rc_body-cell': {
        flexBasis: '33.33%',
        maxWidth: '33.33%',
        height: '100%',
    },
};
function MonthSelectorComponent(_a) {
    var onChangeViewingMonth = _a.onChangeViewingMonth, onChangeViewType = _a.onChangeViewType, monthsLabel = _a.monthsLabel;
    var monthsViewMatrix = useMemo(function () {
        return getMonthViewMetrix({});
    }, []);
    return (React.createElement("div", { role: "grid", style: months.root, className: "rc_body-months" }, monthsViewMatrix.map(function (row, index) { return (React.createElement("div", { style: months['rc_body-row'], className: "rc_body-row", key: index }, row.map(function (cell) { return (React.createElement("div", { style: months['rc_body-cell'], className: "rc_body-cell".concat(cell.isCurrentMonth ? ' rc_this_month' : ''), key: cell.month },
        React.createElement(Month, { monthsLabel: monthsLabel, cell: cell, onMonthClicked: function (cell) {
                onChangeViewingMonth(cell.month), onChangeViewType('month_dates');
            } }))); }))); })));
}
var MonthSelector = memo(MonthSelectorComponent);

var rcBodyCellValue = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
var rcBodyCellValueButton = {
    width: '95%',
    height: '45%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
function Component$2(_a) {
    var cell = _a.cell, onYearClicked = _a.onYearClicked;
    return (React.createElement("div", { style: rcBodyCellValue },
        React.createElement("button", { type: "button", style: rcBodyCellValueButton, onClick: function () {
                onYearClicked(cell);
            } }, cell.year)));
}
var Year = memo(Component$2);

var years = {
    root: { height: '100%' },
    'rc_body-row': { height: '24.9%', display: 'flex', width: '100%' },
    'rc_body-cell': {
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
    return (React.createElement("div", { role: "grid", style: years.root, className: "rc_body-years" }, yearsMatrix.map(function (row, index) { return (React.createElement("div", { style: years['rc_body-row'], className: "rc_body-row", key: index }, row.map(function (cell) { return (React.createElement("div", { style: years['rc_body-cell'], className: "rc_body-cell".concat(cell.isCurrentYear ? ' rc_this_year' : ''), key: cell.year },
        React.createElement(Year, { cell: cell, onYearClicked: function (cell) {
                onChangeViewingYear(cell.year), onChangeViewType('months');
            } }))); }))); })));
}
var YearSelector = memo(YearSelectorComponent);

var weekdaysRow = {
    'rc_body-weekdays': {
        height: '15%',
        margin: '0',
        padding: 0,
        display: 'flex',
        width: '100%',
        listStyle: 'none',
    },
    'rc_body-weekdays_cell': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flexBasis: '14.286%',
        maxWidth: '14.286%',
    },
    'rc_body-weekdays_cell_value': {
        width: '65.95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};
function WeekDaysRowComponent(_a) {
    var startOfWeek = _a.startOfWeek, weekendMap = _a.weekendMap, weekDaysLabel = _a.weekDaysLabel;
    // week days as per the start day of the week
    var weekDayOrder = useMemo(function () {
        return getWeekDaysIndexToLabelMapForAStartOfTheWeek(startOfWeek);
    }, [startOfWeek]).order;
    return (React.createElement("ul", { style: weekdaysRow['rc_body-weekdays'], className: "rc_body-weekdays" }, weekDayOrder.map(function (weekDay) { return (React.createElement("li", { style: weekdaysRow['rc_body-weekdays_cell'], key: weekDay, className: "rc_body-weekdays_cell".concat(weekendMap[weekDay] ? ' rc_wknd' : '') },
        React.createElement("div", { style: weekdaysRow['rc_body-weekdays_cell_value'] },
            React.createElement("span", null, weekDaysLabel[weekDay])))); })));
}
var WeekDaysRow = memo(WeekDaysRowComponent);

var root = {
    width: '100%',
    height: '99%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
var giveStyles$2 = function (noPadRangeCell) { return ({
    width: noPadRangeCell ? '100%' : '69.80%',
    height: noPadRangeCell ? '90%' : '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}); };
var giveButtonStyles = function (noPadRangeCell) { return ({
    width: noPadRangeCell ? '69.8%' : '100%',
    height: '92%',
}); };
function Component$1(_a) {
    var cell = _a.cell, onDateClicked = _a.onDateClicked, noPadRangeCell = _a.noPadRangeCell;
    var styles = useMemo(function () {
        return giveStyles$2(noPadRangeCell);
    }, [noPadRangeCell]);
    var buttonStyles = useMemo(function () {
        return giveButtonStyles(noPadRangeCell);
    }, [noPadRangeCell]);
    return (React.createElement("div", { style: root },
        React.createElement("div", { style: styles, className: "rc_body-cell_value" },
            React.createElement("button", { type: "button", style: buttonStyles, disabled: cell.isDisabled, tabIndex: cell.isDisabled ? -1 : 0, onClick: function () { return onDateClicked(cell); } }, cell.dayOfMonth))));
}
var DayOfMonth = memo(Component$1);

var dayOfMonthStyles = {
    'rc_body-days-of-month': {
        height: '85%',
    },
    'rc_body-row': {
        height: '16.664%',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
    'rc_body-cell': {
        flexBasis: '14.286%',
        maxWidth: '14.286%',
        height: '100%',
        display: 'flex',
        aligntems: 'center',
    },
};
function DayOfMonthSelectorComponent(_a) {
    var selectedDate = _a.selectedDate, selectedRangeStart = _a.selectedRangeStart, selectedRangeEnd = _a.selectedRangeEnd, newSelectedRangeStart = _a.newSelectedRangeStart, weekStartIndex = _a.startOfWeek, newSelectedRangeEnd = _a.newSelectedRangeEnd, isRangeSelectorView = _a.isRangeSelectorView, setIsRangeSelectModeOn = _a.onChangeRangeSelectMode, fixedRangeLength = _a.fixedRange, isFixedRangeView = _a.isFixedRangeView, isRangeSelectModeOn = _a.isRangeSelectModeOn, isDisabled = _a.isDisabled, selectedMultiDates = _a.selectedMultiDates, isMultiSelectorView = _a.isMultiSelectorView, viewingMonth = _a.monthInView, hideAdjacentDates = _a.hideAdjacentDates, onChangeNewSelectedRangeEnd = _a.onChangeNewSelectedRangeEnd, onChangeNewSelectedRangeStart = _a.onChangeNewSelectedRangeStart, weekendIndices = _a.weekends, onChange = _a.onChange, viewingYear = _a.yearInView, noPadRangeCell = _a.noPadRangeCell, lockView = _a.lockView, checkIfWeekend = _a.checkIfWeekend, onPartialRangeSelect = _a.onPartialRangeSelect, isHighlight = _a.isHighlight, onEachMultiSelect = _a.onEachMultiSelect;
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
            isSelectMultiDate: isMultiSelectorView,
            yearInView: viewingYear,
            monthInView: viewingMonth,
            startOfTheWeek: weekStartIndex,
            isHighlight: isHighlight,
            isDisabled: isDisabled,
        });
    }, [
        selectedDate,
        isHighlight,
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
        isMultiSelectorView,
        viewingYear,
        viewingMonth,
        weekStartIndex,
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
                onChangeNewSelectedRangeEnd(undefined);
                setIsRangeSelectModeOn(false);
            }
            else {
                // select first date
                onChangeNewSelectedRangeStart(clickedDate);
                onChangeNewSelectedRangeEnd(undefined);
                setIsRangeSelectModeOn(true);
                onPartialRangeSelect && onPartialRangeSelect(clickedDate);
            }
        }
        else if (isRangeSelectorView && isFixedRangeView) {
            var endDate = addDays(clickedDate, fixedRangeLength).endDate;
            if (typeof onChange === 'function') {
                onChange([clickedDate, endDate]);
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
        onChangeNewSelectedRangeEnd,
        setIsRangeSelectModeOn,
        onChange,
        onChangeNewSelectedRangeStart,
        onPartialRangeSelect,
        fixedRangeLength,
        selectedMultiDates,
        onEachMultiSelect,
    ]);
    return (React.createElement("div", { style: dayOfMonthStyles['rc_body-days-of-month'], className: "rc_body-days-of-month", role: "grid" }, daysOfMMonthViewMatrix.map(function (row, index) { return (React.createElement("div", { style: dayOfMonthStyles['rc_body-row'], className: "rc_body-row", key: index }, row.map(function (cell) { return (React.createElement("div", { style: dayOfMonthStyles['rc_body-cell'], onMouseEnter: function () {
            if (isRangeSelectorView) {
                if (isRangeSelectModeOn) {
                    onChangeNewSelectedRangeEnd(new Date(cell.year, cell.month, cell.dayOfMonth));
                }
            }
        }, key: toString(cell.date), className: "rc_body-cell".concat(cell.activeMonthInView ? ' rc_active' : '').concat(cell.isWeekend ? ' rc_wknd' : '').concat(cell.isToday ? ' rc_today' : '').concat(cell.isFirstRow ? ' rc_fr' : '').concat(cell.isToday ? ' rc_today' : '').concat(cell.isHighlight ? ' rc_highlight' : '').concat(cell.isLastRow ? ' rc_lr' : '').concat(cell.isFirsColumn ? ' rc_fc' : '').concat(cell.isLastColumn ? ' rc_lc' : '').concat(cell.isSelected && !isRangeSelectorView ? ' rc_selected' : '').concat(cell.isDisabled ? ' rc_disabled' : '').concat(cell.isInRange ? ' rc_in_range' : '').concat(cell.isRangeStart ? ' rc_range_start' : '').concat(cell.isRangeEnd ? ' rc_range_end' : '').concat(isRangeSelectModeOn ? ' rc_range_mode' : '') }, !cell.activeMonthInView && hideAdjacentDates ? null : (React.createElement(DayOfMonth, { noPadRangeCell: noPadRangeCell, cell: cell, onDateClicked: onDateClicked })))); }))); })));
}
var DayOfMonthSelector = memo(DayOfMonthSelectorComponent);

/* eslint-disable @typescript-eslint/no-non-null-assertion */
var bodyStyles = { height: '88%', width: '100%' };
var getStyles = function (size, fontSize) { return ({
    root: {
        rc: {
            width: "".concat(size, "px"),
            height: "".concat(size, "px"),
            fontSize: "".concat(fontSize, "px"),
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            boxSizing: 'border-box',
        },
    },
}); };
function Component(_a) {
    var size = _a.size, fontSize = _a.fontSize, isMultiSelectorView = _a.isMultiSelectorView, isRangeSelectorView = _a.isRangeSelectorView, monthInView = _a.monthInView, yearInView = _a.yearInView, showDualCalendar = _a.showDualCalendar, onChangeViewingMonth = _a.onChangeViewingMonth, onChangeViewingYear = _a.onChangeViewingYear, selectedDate = _a.selectedDate, selectedRangeStart = _a.selectedRangeStart, view = _a.view, setView = _a.setView, isSecondary = _a.isSecondary, monthsLabel = _a.monthsLabel, weekDaysLabel = _a.weekDaysLabel, selectedMultiDates = _a.selectedMultiDates, lockView = _a.lockView, startOfWeek = _a.startOfWeek, noPadRangeCell = _a.noPadRangeCell, weekends = _a.weekends, isRangeSelectModeOn = _a.isRangeSelectModeOn, onChangeRangeSelectMode = _a.onChangeRangeSelectMode, hideAdjacentDates = _a.hideAdjacentDates, selectedRangeEnd = _a.selectedRangeEnd, newSelectedRangeStart = _a.newSelectedRangeStart, onChangeNewSelectedRangeEnd = _a.onChangeNewSelectedRangeEnd, onChangeNewSelectedRangeStart = _a.onChangeNewSelectedRangeStart, onPartialRangeSelect = _a.onPartialRangeSelect, onEachMultiSelect = _a.onEachMultiSelect, newSelectedRangeEnd = _a.newSelectedRangeEnd, fixedRange = _a.fixedRange, isFixedRangeView = _a.isFixedRangeView, isDisabled = _a.isDisabled, checkIfWeekend = _a.checkIfWeekend, onChange = _a.onChange, weekendMap = _a.weekendMap, isHighlight = _a.isHighlight;
    var styles = useMemo(function () { return getStyles(size, fontSize); }, [size, fontSize]);
    // updating view when selected date change
    useEffect(function () {
        if (isValid(selectedDate)) {
            onChangeViewingMonth(selectedDate.getMonth());
            onChangeViewingYear(selectedDate.getFullYear());
        }
    }, [isSecondary, onChangeViewingMonth, onChangeViewingYear, selectedDate]);
    // updating view only when first multi is selected
    useEffect(function () {
        var dates = Object.keys(selectedMultiDates)
            .map(function (str) { return selectedMultiDates[str]; })
            .filter(function (d) { return isValid(d); });
        // update view when first multi is selected
        if (dates.length === 1 && dates[0]) {
            onChangeViewingMonth(dates[0].getMonth());
            onChangeViewingYear(dates[0].getFullYear());
        }
    }, [
        isSecondary,
        onChangeViewingMonth,
        onChangeViewingYear,
        selectedMultiDates,
        isMultiSelectorView,
        isFixedRangeView,
    ]);
    // updating view when ranges are changed
    useEffect(function () {
        // eslint-disable-next-line no-console
        console.log('val changed');
        if (isFixedRangeView && newSelectedRangeStart) {
            onChangeViewingMonth(newSelectedRangeStart.getMonth());
            onChangeViewingYear(newSelectedRangeStart.getFullYear());
        }
    }, [onChangeViewingMonth, onChangeViewingYear, newSelectedRangeStart, isFixedRangeView]);
    var _b = useState(getStartOfRangeForAYear(yearInView)), startingYearForCurrRange = _b[0], setStartingYearForCurrRange = _b[1];
    useEffect(function () {
        setStartingYearForCurrRange(getStartOfRangeForAYear(yearInView));
    }, [yearInView, setStartingYearForCurrRange]);
    // 1 - 20, 21 - 40
    var _c = useMemo(function () {
        return getYearRangeLimits(startingYearForCurrRange);
    }, [startingYearForCurrRange]), yearMatrixRangeStart = _c[0], yearMatrixRangeEnd = _c[1];
    // callback handlers
    var onPrevClick = useCallback(function () {
        if (view === 'month_dates') {
            var isPrevMonthFromLastYear = monthInView === 0;
            if (isPrevMonthFromLastYear) {
                onChangeViewingYear(getPreviousYear(yearInView));
            }
            onChangeViewingMonth(getPreviousMonth(monthInView));
        }
        if (view === 'years') {
            setStartingYearForCurrRange(getPreviousRangeStartingYear(startingYearForCurrRange));
        }
        if (view === 'months') {
            onChangeViewingYear(yearInView !== 1 ? yearInView - 1 : 1);
        }
    }, [view, monthInView, onChangeViewingMonth, onChangeViewingYear, yearInView, startingYearForCurrRange]);
    var onNextClick = useCallback(function () {
        if (view === 'month_dates') {
            if (isSecondary) {
                var isSecMonthFirst = monthInView === 0;
                if (isSecMonthFirst) {
                    onChangeViewingYear(yearInView);
                }
                onChangeViewingMonth(monthInView);
            }
            else {
                var isCurrentMonthLast = monthInView === 11;
                if (isCurrentMonthLast) {
                    onChangeViewingYear(getNextYear(yearInView));
                }
                onChangeViewingMonth(getNextMonth(monthInView));
            }
        }
        if (view === 'years') {
            setStartingYearForCurrRange(getNextRangeStartingYear(startingYearForCurrRange));
        }
        if (view === 'months') {
            onChangeViewingYear(getNextYear(yearInView));
        }
    }, [view, isSecondary, monthInView, onChangeViewingMonth, onChangeViewingYear, yearInView, startingYearForCurrRange]);
    var calendarRef = useRef(null);
    var cells = useRef([]);
    var _d = useState(false), hasFocus = _d[0], setHasFocus = _d[1];
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
        var firstCell = cells.current[0];
        var lastCell = cells.current[cells.current.length - 1];
        var seletedItemIfAny = currentCalendarRef.querySelector('[role="grid"] .rc_selected button') ||
            currentCalendarRef.querySelector('[role="grid"] .rc_range_end button') ||
            currentCalendarRef.querySelector('[role="grid"] .rc_range_start button');
        var firstActiveItem = currentCalendarRef.querySelector('[role="grid"] .rc_active button');
        var header = currentCalendarRef.querySelector('.rc_header');
        if (!header) {
            return;
        }
        var prevButton = header.querySelector('.rc_header_nav-prev');
        var nextButton = header.querySelector('.rc_header_nav-next');
        var monthYearSelector = header.querySelector('.rc_header_label');
        if (currentCalendarRef && !currentCalendarRef.contains(document.activeElement)) {
            // if focus in not already inside the GRID then bring the focus
            if (seletedItemIfAny) {
                seletedItemIfAny.focus();
            }
            else if (firstActiveItem) {
                firstActiveItem.focus();
            }
            else {
                firstCell.focus();
            }
        }
        var focusNext = function (currentItem, startItem) {
            // Determine which item is the startItem (first or last)
            var goingDown = startItem === firstCell;
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
            if (e.key === 'Tab') {
                e.preventDefault();
                if (header === null || header === void 0 ? void 0 : header.contains(document.activeElement)) {
                    // if header has focus move it to calendar
                    firstCell.focus();
                }
                else {
                    // otherwise if calendar has focus move it to header first button
                    prevButton === null || prevButton === void 0 ? void 0 : prevButton.focus();
                }
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                var count = view === 'month_dates' ? 7 : view === 'months' ? 3 : 5;
                if (!cell) {
                    return;
                }
                var endItem = cell;
                while (count > 0) {
                    endItem = focusNext(endItem, firstCell);
                    count--;
                }
                endItem === null || endItem === void 0 ? void 0 : endItem.focus();
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                var count = view === 'month_dates' ? 7 : view === 'months' ? 3 : 5;
                if (!cell) {
                    return;
                }
                var endItem = cell;
                while (count > 0) {
                    endItem = focusNext(endItem, lastCell);
                    count--;
                }
                endItem === null || endItem === void 0 ? void 0 : endItem.focus();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (document.activeElement === prevButton) {
                    nextButton === null || nextButton === void 0 ? void 0 : nextButton.focus();
                }
                else if (document.activeElement === monthYearSelector) {
                    prevButton === null || prevButton === void 0 ? void 0 : prevButton.focus();
                }
                else if (document.activeElement === nextButton) {
                    monthYearSelector === null || monthYearSelector === void 0 ? void 0 : monthYearSelector.focus();
                }
                else {
                    if (!cell) {
                        return;
                    }
                    var endItem = focusNext(cell, lastCell);
                    endItem === null || endItem === void 0 ? void 0 : endItem.focus();
                }
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (document.activeElement === prevButton) {
                    monthYearSelector === null || monthYearSelector === void 0 ? void 0 : monthYearSelector.focus();
                }
                else if (document.activeElement === monthYearSelector) {
                    nextButton === null || nextButton === void 0 ? void 0 : nextButton.focus();
                }
                else if (document.activeElement === nextButton) {
                    prevButton === null || prevButton === void 0 ? void 0 : prevButton.focus();
                }
                else {
                    if (!cell) {
                        return;
                    }
                    var endItem = focusNext(cell, firstCell);
                    endItem === null || endItem === void 0 ? void 0 : endItem.focus();
                }
            }
            if (e.key === 'Home') {
                e.preventDefault();
                firstCell.focus();
            }
            if (e.key === 'End') {
                e.preventDefault();
                lastCell.focus();
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                // hack so browser focuses the next tabbable element when
                // tab is pressed
                lastCell.focus();
                lastCell.blur();
            }
        }
        currentCalendarRef.addEventListener('keydown', onKeyPressListener, { capture: true });
        return function () {
            currentCalendarRef.removeEventListener('keydown', onKeyPressListener, { capture: true });
        };
        // we want to update elem refs when month/year/year range changes
    }, [calendarRef, view, hasFocus, monthInView, yearInView, startingYearForCurrRange]);
    return (React.createElement("div", { onFocus: function () {
            !hasFocus && setHasFocus(true);
        }, onBlur: function (e) {
            if (e.currentTarget.contains(e.target)) ;
            else {
                setHasFocus(false);
            }
        }, style: styles.root.rc, className: "rc", ref: calendarRef },
        React.createElement(Header, { monthsLabel: monthsLabel, isSecondary: isSecondary, showDualCalendar: showDualCalendar, onClickPrev: onPrevClick, onClickNext: onNextClick, onChangeViewType: setView, viewType: view, monthInView: monthInView, yearInView: yearInView, yearMatrixStart: yearMatrixRangeStart, yearMatrixEnd: yearMatrixRangeEnd }),
        React.createElement("div", { style: bodyStyles, className: "rc_body" },
            view === 'months' && (React.createElement(MonthSelector, { monthsLabel: monthsLabel, onChangeViewType: setView, onChangeViewingMonth: onChangeViewingMonth })),
            view === 'years' && (React.createElement(YearSelector, { onChangeViewType: setView, onChangeViewingYear: onChangeViewingYear, yearMatrixStart: yearMatrixRangeStart, yearMatrixEnd: yearMatrixRangeEnd })),
            view === 'month_dates' && (React.createElement(React.Fragment, null,
                React.createElement(WeekDaysRow, { weekDaysLabel: weekDaysLabel, startOfWeek: startOfWeek, weekendMap: weekendMap }),
                React.createElement(DayOfMonthSelector, { noPadRangeCell: noPadRangeCell, isRangeSelectModeOn: isRangeSelectModeOn, onChangeRangeSelectMode: onChangeRangeSelectMode, hideAdjacentDates: hideAdjacentDates, selectedDate: selectedDate, selectedRangeStart: selectedRangeStart, selectedRangeEnd: selectedRangeEnd, lockView: lockView, newSelectedRangeStart: newSelectedRangeStart, startOfWeek: startOfWeek, onChangeNewSelectedRangeEnd: onChangeNewSelectedRangeEnd, onChangeNewSelectedRangeStart: onChangeNewSelectedRangeStart, onPartialRangeSelect: onPartialRangeSelect, onEachMultiSelect: onEachMultiSelect, newSelectedRangeEnd: newSelectedRangeEnd, isRangeSelectorView: isRangeSelectorView, fixedRange: fixedRange, isFixedRangeView: isFixedRangeView, isDisabled: isDisabled, checkIfWeekend: checkIfWeekend, selectedMultiDates: selectedMultiDates, isMultiSelectorView: isMultiSelectorView, monthInView: monthInView, weekends: weekends, onChange: onChange, yearInView: yearInView, isHighlight: isHighlight }))))));
}
var CalendarView = memo(Component);
function getInitialDateToShow(props) {
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
                    : new Date();
    return date;
}

var Views = {
    years: 1,
    months: 1,
    month_dates: 1,
};
var emptyFunc = function () {
    //
};
var styles = { display: 'inline-flex' };
var DEFAULT_SIZE = 276;
function CalendarWithRef(_a, forwardRef) {
    var value = _a.value, isMultiSelector = _a.isMultiSelector, _b = _a.className, className = _b === void 0 ? '' : _b, isRangeSelector = _a.isRangeSelector, _c = _a.useDarkMode, useDarkMode = _c === void 0 ? false : _c, weekends = _a.weekends, initialViewDate = _a.initialViewDate, _d = _a.startOfWeek, startOfWeek = _d === void 0 ? 1 : _d, fixedRange = _a.fixedRange, isDisabled = _a.isDisabled, onPartialRangeSelect = _a.onPartialRangeSelect, _e = _a.noPadRangeCell, noPadRangeCell = _e === void 0 ? false : _e, onEachMultiSelect = _a.onEachMultiSelect, initialView = _a.initialView, onChange = _a.onChange, isHighlight = _a.isHighlight, _f = _a.monthsLabel, monthsLabel = _f === void 0 ? NATIVE_INDEX_TO_LABEL_MONTHS_MAP : _f, _g = _a.weekDaysLabel, weekDaysLabel = _g === void 0 ? NATIVE_INDEX_TO_LABEL_WEEKDAY_MAP : _g, _h = _a.lockView, lockView = _h === void 0 ? false : _h, _j = _a.size, size = _j === void 0 ? DEFAULT_SIZE : _j, _k = _a.fontSize, fontSize = _k === void 0 ? 16 : _k, _l = _a.showDualCalendar, showDualCalendar = _l === void 0 ? false : _l, _m = _a.hideAdjacentDates, hideAdjacentDates = _m === void 0 ? false : _m;
    var isRangeSelectorView = !!isRangeSelector;
    var isDualMode = isRangeSelectorView && !!showDualCalendar;
    var isMultiSelectorView = !isRangeSelectorView && !!isMultiSelector;
    var isFixedRangeView = isRangeSelectorView && typeof fixedRange === 'number' && fixedRange > 0 ? true : false;
    var isNormalView = !isRangeSelectorView && !isMultiSelectorView;
    var startOfTheWeek = startOfWeek;
    var fixedRangeLength = isFixedRangeView ? fixedRange : 1;
    var weekendIndexes = useMemo(function () {
        return Array.isArray(weekends) && (weekends.every(function (num) { return typeof num === 'number'; }) || weekends.length === 0)
            ? weekends
            : [6, 0];
    }, [weekends]);
    var viewDate = useMemo(function () {
        return isValid(initialViewDate) ? initialViewDate : undefined;
    }, [initialViewDate]);
    var checkDisabledForADate = useMemo(function () {
        return checkIfDateIsDisabledHOF({
            customDisabledCheck: isDisabled,
        });
    }, [isDisabled]);
    var checkIfWeekend = useMemo(function () { return checkIfWeekendHOF(weekendIndexes); }, [weekendIndexes]);
    var weekendMap = useMemo(function () {
        return weekendIndexes.reduce(function (acc, curr) {
            acc[curr] = 1;
            return acc;
        }, {});
    }, [weekendIndexes]);
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
        // eslint-disable-next-line no-console
        console.log('val changed');
        if (isFixedRangeView && (!Array.isArray(value) || numDifference(value) !== fixedRange)) {
            return undefined;
        }
        else if (isRangeSelectorView && Array.isArray(value) && isValid(value[0])) {
            var year = value[0].getFullYear();
            var month = value[0].getMonth();
            var date = value[0].getDate();
            return new Date(year, month, date);
        }
        else {
            return undefined;
        }
    }, [fixedRange, isFixedRangeView, isRangeSelectorView, value]);
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
            return undefined;
        }
    }, [isRangeSelectorView, selectedRangeStart, value]);
    var _o = useState(false), isRangeSelectModeOn = _o[0], setIsRangeSelectModeOn = _o[1];
    var _p = useState(selectedRangeStart), newSelectedRangeStart = _p[0], setNewSelectedRangeStart = _p[1];
    var _q = useState(selectedRangeEnd), newSelectedRangeEnd = _q[0], setNewSelectedRangeEnd = _q[1];
    // This just tries to find a month to show based on a number
    // of factors for the initial render only
    var _r = useState(function () {
        return getInitialDateToShow({
            isNormalView: isNormalView,
            isMultiSelectorView: isMultiSelectorView,
            isRangeSelectorView: isRangeSelectorView,
            selectedDate: selectedDate,
            selectedRangeStart: selectedRangeStart,
            selectedMultiDates: selectedMultiDates,
            viewDate: viewDate,
        }).getMonth();
    }), monthInView = _r[0], setMonthInView = _r[1];
    // This just tries to find a year to show based on a number
    // of factors for the initial render only
    var _s = useState(getInitialDateToShow({
        isNormalView: isNormalView,
        isMultiSelectorView: isMultiSelectorView,
        isRangeSelectorView: isRangeSelectorView,
        selectedDate: selectedDate,
        selectedRangeStart: selectedRangeStart,
        selectedMultiDates: selectedMultiDates,
        viewDate: viewDate,
    }).getFullYear()), yearInView = _s[0], setYearInView = _s[1];
    var secondCalMonth = getNextMonth(monthInView);
    var secondCalYear = secondCalMonth === 0 ? getNextYear(yearInView) : yearInView;
    useImperativeHandle(forwardRef, function () { return ({
        setView: function (date) {
            if (date) {
                setMonthInView(date.getMonth());
                setYearInView(date.getFullYear());
            }
        },
    }); });
    // secondary can't change year
    var changeYearInView = useCallback(function (year) {
        !lockView && setYearInView(year);
    }, [lockView]);
    var changeMonthInView = useCallback(function (month) {
        !lockView && setMonthInView(month);
    }, [lockView]);
    // View States
    var _t = useState(initialView && Views[initialView] ? initialView : 'month_dates'), view = _t[0], setView = _t[1];
    var changeView = useCallback(function (view) {
        !lockView && setView(view);
    }, [lockView, setView]);
    var commonProps = useMemo(function () { return ({
        monthsLabel: monthsLabel,
        weekDaysLabel: weekDaysLabel,
        noPadRangeCell: !!noPadRangeCell && isRangeSelectorView,
        showDualCalendar: isDualMode,
        viewDate: viewDate,
        useDarkMode: useDarkMode,
        className: className,
        hideAdjacentDates: !!hideAdjacentDates,
        isNormalView: isNormalView,
        size: size,
        isHighlight: isHighlight,
        fontSize: fontSize,
        startOfWeek: startOfTheWeek,
        weekends: weekendIndexes,
        isRangeSelectModeOn: isRangeSelectModeOn,
        onChangeRangeSelectMode: setIsRangeSelectModeOn,
        selectedDate: selectedDate,
        selectedRangeStart: selectedRangeStart,
        selectedRangeEnd: selectedRangeEnd,
        lockView: !!lockView,
        newSelectedRangeStart: newSelectedRangeStart,
        onChangeNewSelectedRangeEnd: setNewSelectedRangeEnd,
        onChangeNewSelectedRangeStart: setNewSelectedRangeStart,
        onPartialRangeSelect: onPartialRangeSelect,
        onEachMultiSelect: onEachMultiSelect,
        newSelectedRangeEnd: newSelectedRangeEnd,
        isRangeSelectorView: isRangeSelectorView,
        initialView: initialView,
        fixedRange: fixedRangeLength,
        isFixedRangeView: isFixedRangeView,
        isDisabled: checkDisabledForADate,
        checkIfWeekend: checkIfWeekend,
        selectedMultiDates: selectedMultiDates,
        isMultiSelectorView: isMultiSelectorView,
        onChange: onChange,
        view: view,
        setView: changeView,
        weekendMap: weekendMap,
        yearInView: yearInView,
        monthInView: monthInView,
        onChangeViewingMonth: changeMonthInView,
        onChangeViewingYear: changeYearInView,
    }); }, [
        noPadRangeCell,
        monthsLabel,
        weekDaysLabel,
        isRangeSelectorView,
        isDualMode,
        viewDate,
        useDarkMode,
        className,
        hideAdjacentDates,
        isNormalView,
        size,
        fontSize,
        startOfTheWeek,
        weekendIndexes,
        isRangeSelectModeOn,
        selectedDate,
        selectedRangeStart,
        selectedRangeEnd,
        lockView,
        newSelectedRangeStart,
        onPartialRangeSelect,
        onEachMultiSelect,
        newSelectedRangeEnd,
        initialView,
        fixedRangeLength,
        isFixedRangeView,
        checkDisabledForADate,
        checkIfWeekend,
        selectedMultiDates,
        isMultiSelectorView,
        isHighlight,
        onChange,
        view,
        changeView,
        weekendMap,
        yearInView,
        monthInView,
        changeMonthInView,
        changeYearInView,
    ]);
    var computedClass = useMemo(function () {
        return typeof className === 'string'
            ? "rc_root".concat(useDarkMode ? ' rc_dark' : '').concat(isDualMode ? ' rc_dual' : '') +
                " ".concat(className) +
                "".concat(!!noPadRangeCell && isRangeSelectorView ? ' rc_no_range_padding' : '')
            : "rc_root".concat(useDarkMode ? ' rc_dark' : '').concat(isDualMode ? ' rc_dual' : '') +
                "".concat(!!noPadRangeCell && isRangeSelectorView ? ' rc_no_range_padding' : '');
    }, [className, useDarkMode, isDualMode, noPadRangeCell, isRangeSelectorView]);
    return (React.createElement("div", { className: computedClass, style: styles }, isDualMode ? (React.createElement(React.Fragment, null,
        React.createElement(CalendarView, __assign({}, commonProps, { isSecondary: false })),
        React.createElement(CalendarView, __assign({}, commonProps, { view: "month_dates", setView: emptyFunc, isSecondary: true, monthInView: secondCalMonth, yearInView: secondCalYear })))) : (React.createElement(CalendarView, __assign({}, commonProps, { isSecondary: false })))));
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

var SHORTCUT_SIZE = 130;
var giveStyles$1 = function (dir, isDual) {
    var _a;
    return ({
        root: {
            display: 'flex',
            padding: dir === 'bottom' ? (isDual ? '2%' : '4%') : isDual ? '1.5%' : '2%',
            alignItems: 'center',
            flexDirection: dir === 'bottom' ? 'row' : 'column',
            overflow: 'auto',
            width: dir === 'bottom' ? '100%' : "".concat(SHORTCUT_SIZE, "px"),
        },
        notFirst: (_a = {},
            _a[dir === 'bottom' ? 'marginLeft' : 'marginTop'] = dir === 'bottom' ? (isDual ? '3%' : '6%') : '12%',
            _a),
    });
};
var empty = {};
function ShortcutBar(_a) {
    var shortcutButtons = _a.shortcutButtons, direction = _a.direction, isDual = _a.isDual;
    var styles = useMemo(function () {
        return giveStyles$1(direction, isDual);
    }, [direction, isDual]);
    return (React.createElement("div", { style: styles.root, className: "rc_shortcuts_view" }, shortcutButtons.map(function (btn, index) {
        return (React.createElement("div", { style: index !== 0 ? styles.notFirst : empty, key: btn.id }, btn.render()));
    })));
}

var giveStyles = function (width, direction) { return ({
    root: {
        display: 'inline-flex',
        flexDirection: direction === 'bottom' ? 'column-reverse' : direction === 'right' ? 'row-reverse' : 'row',
        width: "".concat(width + (direction === 'bottom' ? 0 : SHORTCUT_SIZE), "px"),
    },
}); };
function CalendarWithShortcutsRef(props, calendarRef) {
    var internalRef = useRef(null);
    var styles = useMemo(function () {
        return giveStyles((props.size || DEFAULT_SIZE) * (props.showDualCalendar ? 2 : 1), props.direction);
    }, [props.direction, props.showDualCalendar, props.size]);
    var classNames = useMemo(function () {
        return ('rc_shortcut_cal_root' + ' ' + (props.useDarkMode ? ' rc_dark' : '') + (' rc_dir-' + (props.direction || 'left')));
    }, [props.useDarkMode, props.direction]);
    if (!props.shortcutButtons.length) {
        throw new Error('Provide a list of shortcut buttons');
    }
    useImperativeHandle(calendarRef, function () { return ({
        setView: function (date) {
            internalRef.current && date && internalRef.current.setView(date);
        },
    }); });
    return (React.createElement("div", { style: styles.root, className: classNames },
        React.createElement(ShortcutBar, { isDual: !!props.showDualCalendar, direction: props.direction || 'left', shortcutButtons: props.shortcutButtons }),
        React.createElement(Calendar, __assign({ ref: internalRef }, props))));
}
var CalendarWithShortcuts = React.forwardRef(CalendarWithShortcutsRef);

export { Calendar, CalendarWithShortcuts, giveDaysInRange, giveFormatter };
