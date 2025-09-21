import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DATE_FORMATS, DEFAULT_VALUES } from "@app/config/contants";

dayjs.extend(utc);
dayjs.extend(timezone);

export const DateTimeUtil = {
  /**
   * Format a date with a given pattern
   * @param date - string | Date | number
   * @param format - output format (default: "YYYY-MM-DD HH:mm:ss")
   */
  format(
    date: string | Date | number | undefined,
    format = DATE_FORMATS.fullTime
  ): string {
    if (!date) {
      return DEFAULT_VALUES.string;
    }
    return dayjs(date).format(format);
  },

  /**
   * Format only date (YYYY-MM-DD)
   */
  formatDate(date: string | Date | number): string {
    return dayjs(date).format(DATE_FORMATS.shortTime);
  },

  /**
   * Format only time (HH:mm)
   */
  formatTime(date: string | Date | number): string {
    return dayjs(date).format(DATE_FORMATS.time);
  },

  /**
   * Convert to ISO string
   */
  toISOString(date: string | Date | number): string {
    return dayjs(date).toISOString();
  },

  /**
   * Format with timezone
   */
  formatWithTZ(
    date: string | Date | number | undefined,
    format = DATE_FORMATS.fullTime,
    tz = "Asia/Ho_Chi_Minh"
  ): string {
    if (!date) {
      return DEFAULT_VALUES.string;
    }
    return dayjs(date).tz(tz).format(format);
  },
};
