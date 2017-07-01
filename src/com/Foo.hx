package com;

import js.html.DivElement;

class Foo {
    static var IMG = Webpack.require('./bug.png');

    public var view:DivElement;
    var m:Map<String, String>;

    public function new() {
        trace('new Foo');

        m = new Map();
        m.set('hello', 'This is an asynchronous module');

        view = Dom.div();
        view.innerHTML = '
            <div><img src="$IMG"/> ${m.get('hello')}</div>
        ';
    }
}
