import * as Moment from 'moment';

const DateTimeConversion = (data: string): string => {
    const datePattern = /\d{4}-\d{2}-\d{2}/
    if (datePattern.test(data)) return Moment(data.substring(0, 10)).format('MMMM Do YYYY');
    if (!datePattern.test(data)) return data;
}

export default DateTimeConversion
export { DateTimeConversion }