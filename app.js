/**
 * @file app.js
 * @author swan
 */

const http = require('./lib/service/http');
//const api = require('./lib/service/api');

/* globals swan */

App({
    onLaunch(options) {
        // do something when launch
    },
    onShow(options) {
        // do something when show
    },
    onHide() {
        // do something when hide
    },
    http,
});
