export function formatHyphenDelimiters(id: string): string {
  // Replace all whitespaces with hyphens
  let newId = id.replace(/\s/g, "-");
  return newId;
}

export function formatNoSpaces(id: string | null): string {
  // Replace all whitespaces
  if (id) {
    let newId = id.replace(/\s/g, "");
    return newId.toLocaleLowerCase();
  }
  return "";
}

export function stringOnlySpaces(expression: string): boolean {
  return /^\s*$/.test(expression);
}

export function getTime(): number {
  const d = new Date();
  const time = d.getTime();
  return time;
}

//TODO
export function stringifyTime(time: number): string {
  let ratio: number;
  let unit: string = "";

  // Conversions
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  // Units
  const UNIT_YEAR = "year";
  const UNIT_MONTH = "month";
  const UNIT_WEEK = "week";
  const UNIT_DAY = "day";
  const UNIT_HOUR = "hour";
  const UNIT_MINUTE = "minute";

  // Subtract the current time from the time input
  const difference: number = getTime() - time;
  const ratioYear = difference / year;
  const ratioMonth = difference / month;
  const ratioWeek = difference / week;
  const ratioDay = difference / day;
  const ratioHour = difference / hour;
  const ratioMinute = difference / minute;

  function createMessage(ratio: number, unit: string): string {
    const formattedTime: string = Math.round(ratio).toString();
    let formattedUnit: string = unit;

    if (unit === UNIT_MINUTE && ratio <= 1) {
      return "a few seconds ago";
    }
    // Update time unit with plural "s" if more than 1
    if (Math.round(ratio) > 1) {
      formattedUnit = `${unit}s`;
    }

    return `${formattedTime} ${formattedUnit} ago`;
  }

  // 1 year or more
  if (ratioYear >= 1) {
    unit = UNIT_YEAR;
    ratio = ratioYear;
  }

  // 1 month or more
  else if (ratioMonth >= 1) {
    unit = UNIT_MONTH;
    ratio = ratioMonth;
  }

  // 1 week or more
  else if (ratioWeek >= 1) {
    unit = UNIT_WEEK;
    ratio = ratioWeek;
  }
  // 1 day or more
  else if (ratioDay >= 1) {
    unit = UNIT_DAY;
    ratio = ratioDay;
  }

  // 1 hour or more
  else if (ratioHour >= 1) {
    unit = UNIT_HOUR;
    ratio = ratioHour;
  }

  // 1 minute or more
  else {
    unit = UNIT_MINUTE;
    ratio = ratioMinute;
  }

  return createMessage(ratio, unit);
}