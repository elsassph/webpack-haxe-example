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

        // Reflection tweaking (see 'graph-hook.js')

		// 1. Direct attribution
		// Type.createInstance(Type.resolveClass('com.DynClass'), []);

		// 2. Creation of virtual bundle
		loadModule('manual').then(function(_) {
	        Type.createInstance(Type.resolveClass('com.DynClass'), []);
		});
    }
}

// By default, reflected classes land in the main bundle
class DynClass {
    public function new() {
        Dom.body().appendChild(Dom.html('
            <h2>Things can even be dynamic</h2>
        '));
    }
}
