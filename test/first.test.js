var page = require('webpage').create();
var args = require('system').args;

var output_file = 'example.png', url = args[1];
t = Date.now();

var width = 1440;
var height = 900;
page.viewportSize = { width: width, height: height };
page.paperSize = {
    format: 'A4',
    orientation: 'landscape',
    margin: { left: '1cm', right: '1cm', top: '1cm', bottom: '1cm' }
};

console.log(url);

page.onConsoleMessage = function(msg, lineNum, sourceId) {
    console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

page.onInitialized = function() {
    if(page.injectJs('core.js')){
        console.log("Polyfills loaded");
    }
}

page.onLoadFinished = function (status) {
    window.setTimeout(function () {
        try {
            page.evaluate(function (w, h) {
                document.body.style.width = w + 'px';
                document.body.style.height = h + 'px';
            }, width, height);
            t = Date.now() - t;
            console.log('Loading ' + url);
            console.log('Loading time ' + t + ' msec');
            page.clipRect = {top: 0, left: 0, width: width, height: height};
            page.render(output_file);
        }
        catch (e) {
            status = e.message;
        }
        console.log(status + ';;' + output_file);
        phantom.exit();
    }, 10000);
};

try {
    page.open(url);
    console.log('loading');
}
catch (ex) {
    console.log(ex.message);
    phantom.exit();
}