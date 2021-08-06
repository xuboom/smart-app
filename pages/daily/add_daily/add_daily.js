const api = require('../../../lib/service/api');
const app = getApp();

Page({
    data: {
        tag_default: false,
        userid: '',
        select_mood: '',
        mood_image: '',
        mood_select:[
            '../../../images/Big-Smile.png',
            '../../../images/Smile.png',
            '../../../images/Strait.png',
            '../../../images/Layer-2.png',
            '../../../images/Cry-Hard.png',
            '../../../images/Yelling.png'
        ],
        select_weather: '',
        weather_image: '',
        weather_select:[
            '../../../images/ios-sunny-outline.png',
            '../../../images/ios-partlysunny-outline.png',
            '../../../images/ios-cloud-outline.png',
            '../../../images/ios-rainy-outline.png',
            '../../../images/ios-bolt-outline.png',
            '../../../images/ios-snowy.png'
        ],
        mood: [
            {
                id: 0,
                name: '激动'
            },
            {
                id: 1,
                name: '开心'
            },
            {
                id: 2,
                name: '一般'
            },
            {
                id: 3,
                name: '难过'
            },
            {
                id: 4,
                name: '哭泣'
            },
            {
                id: 5,
                name: '生气'
            },
        ],
        weather: [
            {
                id: 0,
                name: '晴天'
            },
            {
                id: 1,
                name: '多云'
            },
            {
                id: 2,
                name: '阴天'
            },
            {
                id: 3,
                name: '下雨'
            },
            {
                id: 4,
                name: '雷电'
            },
            {
                id: 5,
                name: '下雪'
            }
        ],
        tagList: [],
        tag_id: '',
        tag_name: [],
        tag_text: '',
    },
    onInit: function (params) {
        // 监听页面初始化的生命周期函数
        if (params.tag_id !== undefined) {
            this.setData({
                tag_id : params.tag_id,
                tag_default: true,
            })
        };
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
            },
            fail: err => {
                console.log('read storage failed', err);
            }
        });
        this.getTag();
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
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
    async submit(e) {
        let isInput = e.detail.value.content!=='' && this.data.select_mood!=='' && this.data.select_weather!=='';
        if (isInput) {
            let description = e.detail.value.content.split('\n').join('&hh');
            let mood = e.detail.value.mood;
            let tag = this.data.tag_default ? this.data.tag_id : e.detail.value.tag + 1;
            console.log('tag',e.detail.value.tag);
            let weather = e.detail.value.weather;
            let d = new Date();
            let time = d.getFullYear().toString() + "-" + (d.getMonth() + 1).toString() + "-" + d.getDate().toString() + " " + d.getHours().toString() + ":" + d.getMinutes().toString();
            const result = await app.http.post(
                api.API_ADDDAILY,
                {
                    userid: this.data.userid,
                    description: description,
                    mood: mood,
                    weather: weather,
                    time: time,
                    tag: tag
                },
            );
            if (result.msg === 'success') {
                // swan.navigateTo({
                //     url: 'pages/daily/daily_list/daily_list'
                // });
                swan.switchTab({url: '/pages/daily/daily_list/daily_list'})
            }
        } else {
            swan.showToast({
                title: '写完再交呗',
                icon: 'none',
                mask: false,
                fail: err => {
                    console.log('showToast fail', err);
                }
            });
        }
    },
    selectorChange(e) {
        if (e.currentTarget.dataset.input === "mood"){
            let url = this.data.mood_select[e.detail.value];
            this.setData({
                select_mood: e.detail.value,
                mood_image: url
            })
        } else if (e.currentTarget.dataset.input === "weather"){
            let url = this.data.weather_select[e.detail.value];
            this.setData({
                select_weather: e.detail.value,
                weather_image: url
            })
        } else {
            let name = this.data.tag_name[e.detail.value];
            this.setData({
                tag_id: e.detail.value,
                tag_text: name,
            })
        }
    },
    async getTag () {
        const tag = await app.http.get(
            api.API_GETTAG,
        );
        let taglist = tag.data;
        let tagname = [];
        for (let i=0; i<taglist.length; i++){
            tagname.push(taglist[i].tag_name);
        }
        this.setData({
            'tagList': tag.data,
            'tag_name': tagname,
        });
        if (this.data.tag_id !== '') {
            this.setData({
                'tag_text': tagname[this.data.tag_id-1]
            })
        }
    },
});