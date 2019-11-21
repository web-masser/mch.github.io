let glob = require('glob')

function getEntry(globPath) {
    let entries = {},
        tmp, htmls = {};

    glob.sync(globPath + 'html').forEach(function (entry) {
        tmp = entry.split('/').splice(-3);
        htmls[tmp[1]] = entry
    })

    glob.sync(globPath + 'js').forEach(function (entry) {
        tmp = entry.split('/').splice(-3);
        entries[tmp[1]] = {
            entry,
            template: htmls[tmp[1]] ? htmls[tmp[1]] : 'index.html', 
            filename: tmp[1] + '.html' 
        };
    });
    return entries;
}
let htmls = getEntry('./src/pages/**/*.');
module.exports = {
    pages: htmls,
    publicPath: './', //  解决打包之后静态文件路径404的问题
    outputDir: 'output', //  打包后的文件夹名称，默认dist
    devServer: {
        open: true, //  npm run serve 自动打开浏览器
        index: '/secondHand.html' //  默认启动页面
    }
}