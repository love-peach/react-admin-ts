const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const config = {
    development: {
        env: 'development',
        api: 'http://jxppcmsgwb.jd.com',
    },
    production: {
        env: 'production',
        api: 'http://jxppcmsgw.jd.com',
    },
};

export default config[env];
