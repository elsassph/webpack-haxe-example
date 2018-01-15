import com.Foo;

import Webpack.*;

class App {
    static var STYLES = require('./App.css');

    static public function main() {
        new App();
    }

    public function new() {
        Dom.body().appendChild(Dom.html('
            <h1>Welcome to Webpack + haxe</h1>
        '));

        // Code splitting
        load(Foo).then(function(_) {
            var foo = new Foo();
            Dom.body().appendChild(foo.view);
        });
    }
}
