var numbers = (function () {
    var instance;

    function init() {
        // Private methods and variables
        var d = new Date();
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);

        Math.seedrandom(d.getTime());

        return {
            getRandomNumbers: function(m,t,a,b) {
                var r = [];
                var n = 0;
                var i = 0;
                var c = [];
                var s = String(d.getTime());
                
                if(typeof a != 'undefined') {
                    s = s+String(a);
                }
                
                if(typeof b != 'undefined') {
                    var c = b.split('-');
                    c = new Date(c[0],c[1],c[2]);
                    s = s+String(c.getTime());
                }
                
                Math.seedrandom(s);
                
                while(r.length<t) {
                    n = (Math.floor(Math.random()*m)+1);
                    if(typeof c[n] == 'undefined') {
                        r[i] = n;
                        c[n] = 1;
                        i++;
                    }
                }
                
                r.sort(naturalSort);
                
                return r;
            }
        };
    };

    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {
            if ( !instance ) {
                instance = init();
            }
            return instance;
        }
    };
})();
