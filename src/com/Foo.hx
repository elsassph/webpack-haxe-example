package com;

import js.html.Element;
import Webpack.*;

class Foo {
    static var STYLES = require('./Foo.css');
    static var IMG = require('./bug.png');
    static var CONFIG = require('../config.json');

    public var view:Element;

    public function new() {
        view = Dom.html('
            <div class="foo">
                <img src="$IMG"/> ${CONFIG.hello}
            </div>
        ');
    }
}
