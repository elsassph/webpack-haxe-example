import com.Foo;

import Webpack.*;

class Main {
    static var STYLES = require('./Main.css');

    static public function main() {
        new Main();
    }

    public function new() {
        Dom.body().appendChild(Dom.html('
            <h1>Welcome to Webpack + haxe</h1>
        '));

        // Code splitting
        async(Foo).then(function(_) {
            var foo = new Foo();
            Dom.body().appendChild(foo.view);
        });
    }
}
