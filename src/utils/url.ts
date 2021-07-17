/**
 * @desc 获取URL中的参数名及参数值的集合
 * @param urlStr 字符串
 * @returns 返回参数对象 {key: any}
 */
export function queryToJson(url?: string) {
    let urlStr = '';
    if (typeof url === 'undefined') {
        urlStr = decodeURI(location.search); //获取url中"?"符后的字符串
    } else {
        urlStr = '?' + url.split('?')[1];
    }
    const params: { [key: string]: any } = {};

    if (urlStr.indexOf('?') != -1) {
        const str = urlStr.substr(1);
        const strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            params[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
        }
    }
    return params;
}
