import com.Foo;

import Webpack.*;

class Main {
    static var STYLES = require('./Main.css');

    static public function main() {
        trace('starting...');
        new Main();
    }

    public function new() {
        trace('new Main');

        // Code splitting
        bundle(Foo).then(function(_) {
            var foo = new Foo();
            Dom.body().appendChild(foo.view);
        });
    }
}
