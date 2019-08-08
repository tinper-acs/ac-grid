'use strict';

var fs = require('fs-extra');

var reg = new RegExp(/\/\/design\.yonyoucloud\.com\/static\/iconfont/, 'g');

var filePath = './build';
var context = '/iuap-pap-training-fe/';
var ctn = filePath + context;

var readDir = fs.readdirSync(ctn);

readDir.forEach(function (item) {
    replaceApp(item);
});
replaceVendor();
function replaceVendor() {
    var data = fs.readFileSync(ctn + 'vendors.css', 'utf-8');
    data = data.replace(reg, context + 'fonts');
    fs.writeFileSync(ctn + 'vendors.css', data);
}

function replaceApp(path) {
    fs.pathExists('' + ctn + path + '/app.css', function (err, flag) {
        if (flag) {
            var data = fs.readFileSync('' + ctn + path + '/app.css', 'utf-8');
            data = data.replace(reg, context + 'fonts');
            fs.writeFileSync('' + ctn + path + '/app.css', data);
        }
    });
}