casper.test.begin('Change Weather', 1, function suite(test) {
    casper.start("http://localhost:8080", function() {
        test.assertTitle("Weather", "homepage title is the one expected");
        if (this.exists('.selectWrap')) {
            this.echo('select of city exists');
        }
    });

    casper.waitForSelector('.info',
        function success() {
            this.echo("table found");
            this.echo("1: "+this.evaluate(function(sel){
                    return !!document.querySelector(sel)
                }, '.blockWeather .info'));
            this.echo("2: "+this.evaluate(function(sel){
                    return document.querySelector(sel).textContent;
                }, '.blockWeather .info'));

            require('utils').dump(this.getElementsInfo('.blockWeather'));
        },
        function fail() {
            require('utils').dump(this.getElementsInfo('.blockWeather'));
            console.log("oops");
        }, 5000
    );

    casper.run(function() {
        test.done();
    });
});