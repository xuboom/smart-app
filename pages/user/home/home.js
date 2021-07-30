const api = require('../../../lib/service/api');
const app = getApp();

Page({
    data: {
        userid: '',
        userinfo: {},
        daily: '',
        comment:  '../../../images/Chat.png',
        like: '../../../images/Heart.png',
        delete: '../../../images/Trash_bin.png',
        mood:[
            '../../../images/Big-Smile.png',
            '../../../images/Smile.png',
            '../../../images/Strait.png',
            '../../../images/Layer-2.png',
            '../../../images/Cry-Hard.png',
            '../../../images/Yelling.png'
        ],
        weather:[
            '../../../images/ios-sunny-outline.png',
            '../../../images/ios-partlysunny-outline.png',
            '../../../images/ios-cloud-outline.png',
            '../../../images/ios-rainy-outline.png',
            '../../../images/ios-bolt-outline.png',
            '../../../images/ios-snowy.png'
        ]
    },
    onInit: function (param) {
        swan.showTabBar({
            // animation 为 true 时，建议在真机上看效果，工具暂不支持
            animation: true,
            success: res => {
                console.log('showTabBar success');
            },
            fail: err => {
                console.log('showTabBar fail', err);
            }
        })
        // 监听页面初始化的生命周期函数
        if (param.userid) {
            this.setData({
                userid: param.userid,
            })
            this.getInfo();
        }
        else {
            let key = 'USER_ID';
            swan.getStorage({
                key,
                success: res => {
                    const data = res.data;
                    if (data) {
                        this.setData({
                            userid: data,
                        })
                    }
                    this.getInfo();
                },
                fail: err => {
                    console.log('read storage failed', err);
                }
            });

        }

    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
        // swan.request({
        //     url:'http://127.0.0.1:3700/xu/user/login',
        //     data: {
        //         username: 'xu',
        //         password: 'fly,19980826'
        //     },
        //     method: 'GET',
        //     success: res => {
        //         console.log('re', res);
        //     },
        //     fail: err => {
        //         console.log('fail', err);
        //     }
        // })
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
    },
    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    },
    onError: function () {
        // 错误监听函数
    },
    async getInfo() {
        const result = await app.http.get(
            api.API_GETINFO,
            {userid: this.data.userid},
        );
        const daily = await app.http.get(
            api.API_GETDAILY,
            {userid: this.data.userid},
        );
        this.setData({
            userinfo: result.data,
            daily: daily.data
        })
        console.log('llll',this.data.userinfo);
        console.log('dddd',this.data.daily);
    },
    delete (e){
        // todo delete
        console.log('delete',e);
    }
});