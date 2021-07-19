export const timeFormat = (timestamp: number | Date, format = 'yyyy-MM-dd hh:mm:ss'): string => {
    const times = timestamp || Date.now();
    let formats = format || 'yyyy-MM-dd hh:mm:ss';

    const _date = new Date(timestamp);
    const year: any = _date.getFullYear();
    let month: any = _date.getMonth() + 1;
    let date: any = _date.getDate();
    let hour: any = _date.getHours();
    let minute: any = _date.getMinutes();
    let second: any = _date.getSeconds();

    formats = formats.replace('yyyy', year);
    if (parseInt(month) < 10) month = '0' + month;
    formats = formats.replace('MM', month);

    if (parseInt(date) < 10) date = '0' + date;
    formats = formats.replace('dd', date);

    if (parseInt(hour) < 10) hour = '0' + hour;
    formats = formats.replace('hh', hour);

    if (parseInt(minute) < 10) minute = '0' + minute;
    formats = formats.replace('mm', minute);

    if (parseInt(second) < 10) second = '0' + second;
    formats = formats.replace('ss', second);

    return formats;
};
