const REACT_APP_ENV = process.env.REACT_APP_ENV as 'dev' | 'yufa' | 'prod';

const config = {
    dev: {
        api: 'http://jxppcmsgwb.jd.com',
    },
    yufa: {
        api: 'http://jxppcmsgwb.jd.com',
    },
    prod: {
        api: 'http://jxppcmsgw.jd.com',
    },
};

export default config[REACT_APP_ENV];
