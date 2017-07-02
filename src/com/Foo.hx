package com;

import js.html.Element;
import Webpack.*;

class Foo {
    static var STYLES = require('./Foo.css');
    static var IMG = require('./bug.png');

    public var view:Element;
    var m:Map<String, String>;

    public function new() {
        trace('new Foo');

        m = new Map();
        m.set('hello', 'This is an asynchronous module');

        view = Dom.html('
            <div class="foo">
                <img src="$IMG"/> ${m.get('hello')}
            </div>
        ');
    }
}
