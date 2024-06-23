import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

declare module 'dayjs' {
  interface Dayjs {
    fromStringDate(date: string): dayjs.Dayjs;
  }
}

dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;
