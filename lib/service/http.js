/**
 * @file http核心模块
 */
// const swanp = require('../swan/swanp');
// const storage = require('../swan/storage');


const HTTP_CODE_MSG = {
    0: '成功',
    401: '未登录',
    999: '未知网络错误',
    6000: '身份未验证',
};


/**
 * 网络错误提示
 * @param code 错误码
 * @param response 响应结果
 * @param msg 自定义的提示语
 */
const hintNetError = (code = 999, msg) => {
    swan.showToast({
        title: `${msg || HTTP_CODE_MSG[code] || HTTP_CODE_MSG[999]}`,
        icon: 'none'
    });
};

/**
 * 封装 swan.request*
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */

const request = async ({url, params = {}, config = {}}) => {

    const baseURL = 'http://localhost:3700/xu';
    return new Promise((resolve, reject) => {
        swan.request({
            url: url.indexOf('http') > -1 ? url : `${baseURL}${url}`,
            data: Object.assign(params),
            header: Object.assign({'Content-Type': 'application/json'}),
            ...config,
            success: res => {
                const {code, msg} = res.data;

                if (code === 401) {
                    if (!config.ignoreLogin) {
                        login();
                    }
                    reject(res);
                    return;
                }

                resolve(res.data);
            },
            fail: err => {
                hintNetError(999, 'request fail');
                reject(err);
            },
            complete: () => {}
        });
    });
};

/**
 * 封装 get 方法
 * @param url
 * @param params
 * @param config
 * @returns { Promise }
 */
const get = async (url, params = {}, config) => {
    return await request({url, params, config: {method: 'GET', ...config}});
};

/**
 * 封装 post 请求*
 * @param url
 * @param params
 * @param config
 * @returns {Promise}
 */
const post = async (url, params = {}, config) => {
    return await request({url, params, config: {method: 'POST', ...config}});
};

/**
 * 封装 put 请求
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */
const put = async (url, params = {}, config) => {
    return await request({url, params, config: {method: 'PUT', ...config}});
};

/**
 * 封装 delete 请求
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */
const deleteFn = async (url, params = {}, config) => {
    return await request({url, params, config: {method: 'DELETE', ...config}});
};

// 开放接口
export {
    get,
    post,
    put,
    deleteFn,
};
