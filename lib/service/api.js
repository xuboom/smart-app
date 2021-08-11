/**
 * @file 数据接口
 */

 module.exports = {
    // 登录
    API_LOGIN: '/user/login',
    // 获取用户信息
    API_GETINFO: '/user/getInfo',
    // 获取用户daily
    API_GETDAILY: '/daily/getDaily',
    // 获取daily
    API_GETALLDAILY: '/daily/getAllDaily',
    // 添加用户daily
    API_ADDDAILY: '/daily/addDaily',
    // 删除用户daily
    API_DELETEDAILY: '/daily/deletDaily',
    // 获取tag
    API_GETTAG: '/daily/getTag',
    // 获取tag下daily
    API_GETTAGDAILY: '/daily/getTagDaily',
    // 获取daily对应评论
    API_GETCOMMENT: '/comment/getComment',
    // 获取daily一级评论
    API_GETFIRSTCOMMENT: '/comment/getFirstComment',
    // 添加评论
    API_ADDCOMMENT: '/comment/addComment'
}