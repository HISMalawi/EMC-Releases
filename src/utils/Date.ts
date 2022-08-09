import dayjs from "dayjs";

export const STANDARD_DATE_FORMAT = 'YYYY-MM-DD'
export const DISPLAY_DATE_FORMAT = 'DD/MMM/YYYY'

function sessionDate() {
    return sessionStorage.getItem('sessionDate') || dayjs().format(STANDARD_DATE_FORMAT)
}

function currentDisplayDate() {
    return dayjs().format(DISPLAY_DATE_FORMAT)
}

function currentDate() {
    return dayjs().format(STANDARD_DATE_FORMAT)
}

function dateDiffInDays(date1: string, date2: string) {
    return dayjs(date1).diff(date2, 'days')
}

function getAgeInYears(date: string | Date): number {
    return dayjs().diff(date, 'years');
}

function toStandardHisTimeFormat(date: string | Date) {
    return dayjs(date).format('HH:mm')
}

function toStandardHisDisplayFormat(date: string | Date): string {
    const fdate = dayjs(date).format(DISPLAY_DATE_FORMAT)
    if (fdate.match(/invalid/i)) return ''
    return fdate
}

function toStandardHisFormat(date: string | Date): string {
    const fdate = dayjs(date).format(STANDARD_DATE_FORMAT)
    if (fdate.match(/invalid/i)) return ''
    return fdate
}

function estimateDateFromAge(age: number): string {
    const date = dayjs(sessionDate()).subtract(age, 'years')
    return date.format(STANDARD_DATE_FORMAT)
}

function getYearFromAge(age: number) {
    return dayjs(sessionDate()).subtract(age, 'years').year()
}

function getYear(date: string) {
    return dayjs(date).year()
}
function getMonth(date: string) {
    return dayjs(date).format('MMM')
}
function getDay(date: string) {
    return dayjs(date).date()
}
function add(date: string, unit: any, value: number) {
    return dayjs(date).add(value, unit);
}
function subtract(date: string, unit: any, value: number) {
    return dayjs(date).subtract(value, unit);
}

function getCurrentYear() { return dayjs().year() }
function getCurrentMonth() { return dayjs().month() }
function getCurrentDay() { return dayjs().date() }

function getDateBeforeByDays(date: string, days: number) {
    const dateObj = new Date(date)
    dateObj.setDate(dateObj.getDate() - days)
    return toStandardHisFormat(dateObj)
}

/**
 * Get Year of specified age in years
 * @param age
 * @returns 
 */
function getYearOfAge(ageInYears: number): number {
    const [year] = estimateDateFromAge(ageInYears).split('-')
    return parseInt(year)
}

function stitchDate(year: number | string, month=-1 as number | string, day=-1 as number | string) {
    let fmonth = month.toString()
    let fday = day.toString()
    let fyear = year
    const unknown = (d: number | string) => d.toString().match(/Unknown/i) 

    if (parseInt(fyear.toString()) < 1900) {
        fyear = '1900'
    }

    if (!month || unknown(month)) {
        fmonth = '07'
    }

    if (!day || unknown(day)) {
        fday = '15'
    }

    return toStandardHisFormat(`${fyear}-${fmonth}-${fday}`)
}

/**
   * Returns quarter in which date belongs.
   * 
   * @param {Date | string} date 
   */
function getDateQuarter(date: string | Date) {
    const d = new Date(date)
    const month = d.getMonth();
    const year = d.getFullYear();

    if (month < 3) {
      return {start: `${year}-01-01`, end: `${year}-03-31`};
    } else if (month < 6) {
      return {start: `${year}-04-01`,  end: `${year}-06-30`};
    } else if (month < 9) {
       return {start: `${year}-07-01`,  end: `${year}-09-30`};
    } else {
      return {start: `${year}-10-01`,  end: `${year}-12-31`};
    }
  }

function rangeOf(date: string, minDate?: string, maxDate?: string) {
    const c = dayjs(date)
    if(minDate && maxDate) {
        return c.isSame(minDate) || (c.isAfter(minDate) && c.isBefore(maxDate))
    } else if(maxDate) {
        return c.isSame(maxDate) || c.isBefore(maxDate)
    } else if (minDate){
        return c.isSame(minDate) || c.isAfter(minDate)
    } else {
        return true
    }
}

export default {
    currentDate,
    getYearOfAge,
    getYear,
    dateDiffInDays,
    getAgeInYears,
    toStandardHisTimeFormat,
    toStandardHisDisplayFormat,
    currentDisplayDate,
    stitchDate,
    toStandardHisFormat,
    estimateDateFromAge,
    getYearFromAge,
    getCurrentYear,
    getCurrentMonth,
    getCurrentDay,
    getDateBeforeByDays,
    getMonth,
    getDay,
    add,
    subtract,
    getDateQuarter,
    rangeOf
}