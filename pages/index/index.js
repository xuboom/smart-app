/**
 * @file index.js
 * @author swan
 */
const app = getApp()
const api = require('../../lib/service/api');

Page({
    data: {
        isShow: false,
        isRemember: false,
        showtype: true,
        isInput: false,
        ischeck:[0,0],
        username:'',
        password:'',
        userInfo: {},
        hasUserInfo: false,
        canIUse: swan.canIUse('button.open-type.getUserInfo')
    },
    onInit() {
        let key = 'USER_PASS';
        swan.getStorage({
            key,
            success: res => {
                const data = res.data;
                if (data) {
                   // swan.navigateTo({url: '/pages/home/home'})
                   this.setData({
                       username: data.name,
                       password: data.password,
                       ischeck:[1,1],
                       isInput: true,
                       showtype: true,
                       isRemember: true
                   })
                }
            },
            fail: err => {
                console.log('read storage failed', err);
            }
        });
    },
    onLoad() {
        // 监听页面加载的生命周期函数
    },
    getUserInfo(e) {
        if (e.detail.encryptedData) {
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            });
        }
        else {
            swan.showToast({
                title: '已成功授权',
                icon: 'none'
            })
        }

    },
    // 记住密码
    check() {
        let isRemember = this.data.isRemember;
        this.setData({ isRemember: !isRemember });
    },
    // 密码是否可见
    show() {
        if (this.data.isShow) {
            this.setData({
                isShow: false,
                showtype: true
            })
        } else {
            this.setData({
                isShow: true,
                showtype: false
            })
        }
    },
    // 判断是否输入
    bindKeyInput(e) {
        let name = e.currentTarget.dataset.input;
        let value = e.detail.value;
        let ischeck = this.data.ischeck;
        if (name === 'selfName'){
            if (value) {
                ischeck[0] = 1;
                this.setData({
                    ischeck: ischeck,
                });
            }
            else {
                ischeck[0] = 0;
                this.setData({
                    ischeck: ischeck,
                });
            }
        }
        else {
            if (value) {
                ischeck[1] = 1;
                this.setData({
                    ischeck: ischeck,
                });
            }
            else {
                ischeck[1] = 0;
                this.setData({
                    ischeck: ischeck,
                });
            }
        }
        if (this.data.ischeck.indexOf(0) === -1) {
            this.setData({
                isInput: true
            });
        }
        else {
            this.setData({
                isInput: false
            });
        }

    },
    async formSubmit(e) {
        // 判断表单完整性
        let personData = e.detail.value;
        console.log('e',e);
        let isInput = this.data.isInput;
        if (isInput) {
            const result = await app.http.get(
            api.API_LOGIN,
            {username: personData.selfName, password: personData.selfPassword},
            );
            let code = result.code;
            if (code === 999) {
                 swan.showToast({
                    title: '用户名密码错误',
                    icon: 'none',
                    mask: false,
                    fail: err => {
                        console.log('showToast fail', err);
                    }
                });
                return;
            }
            let data = result.data;
            let key = 'USER_ID';
            swan.setStorage({key,data:data.id,
                success: res => {
                    console.log('store success');
                },
                fail: err => {
                    console.log('store fail', err);
                }
            });
            if(this.data.isRemember) {
                key = 'USER_PASS';
                let user_pass = {
                    name: personData.selfName,
                    password: personData.selfPassword
                }
                swan.setStorage({key,data:user_pass,
                    success: res => {
                        console.log('store success');
                    },
                    fail: err => {
                        console.log('store fail', err);
                    }
                });
            }

            //const UserParams = '?userinfo=' + JSON.stringify(data);
            swan.switchTab({url: '/pages/user/home/home?userid=' + data.id})
        }else {
            swan.showToast({
                title: '请输入用户名密码',
                icon: 'none',
                mask: false,
                fail: err => {
                    console.log('showToast fail', err);
                }
            });
        }
    }
})
