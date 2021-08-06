const api = require('../../../lib/service/api');
const app = getApp();

Page({
    data: {
        dailyList: [],
        default: '../../../images/user.png',
        comment:  '../../../images/Chat.png',
        like: '../../../images/Heart.png',
        delete: '../../../images/Trash_bin.png',
        mood: [
            '../../../images/Big-Smile.png',
            '../../../images/Smile.png',
            '../../../images/Strait.png',
            '../../../images/Layer-2.png',
            '../../../images/Cry-Hard.png',
            '../../../images/Yelling.png'
        ],
        weather: [
            '../../../images/ios-sunny-outline.png',
            '../../../images/ios-partlysunny-outline.png',
            '../../../images/ios-cloud-outline.png',
            '../../../images/ios-rainy-outline.png',
            '../../../images/ios-bolt-outline.png',
            '../../../images/ios-snowy.png'
        ],
        tagList: ''
    },
    onInit: function () {
        // 监听页面初始化的生命周期函数
        // this.getAllDaily();
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
        this.popup= this.selectComponent("#popup");
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
        this.showinit();
        this.getAllDaily();
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
    scrollBottom: function () {
        this.renderDailyList();
        console.log('loading');
    },
    // 分页
    renderDailyList() {
        let list = this.dailyList.splice(0, 10);
        if (list.length < 10) {
            // todo 到底了
        }
        let dailylist = this.data.dailyList.concat(list);
        this.setData('dailyList', dailylist);
    },
    async showinit() {
        await this.setData({
            dailyList: [],
        })
    },
    async getAllDaily () {
        const daily = await app.http.get(
            api.API_GETALLDAILY,
        );
        let list = daily.data;
        for (let i=0;i<daily.data.length;i++)
        {
            list[i].description=list[i].description.split('&hh').join('\n');
        }
        this.dailyList = list;
        this.renderDailyList();
    },
    goTagList (e) {
        const Params = '?tag_id=' + e.currentTarget.dataset.tagid + '&tag_name=' + e.currentTarget.dataset.tagname;
        swan.navigateTo({
            url:'../tag_daily/tag_daily'+ Params,
        })
    },
    addDaily () {
        swan.navigateTo({
            url:'../add_daily/add_daily'
        })
    },
    comment () {
        this.popup.changeRange();
    }
});