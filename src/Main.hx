import com.Foo;

class Main {

    static public function main() {
        trace('starting...');
        new Main();
    }

    public function new() {
        trace('new Main');

        // Code splitting
        Webpack.load(Foo).then(function(_) {
            var foo = new Foo();
            Dom.body().appendChild(foo.view);
        });
    }
}
