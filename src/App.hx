import react.ReactMacro.jsx;
import Webpack.*;

class App {
    static var STYLES = require('./App.css');

    static public function main() {
        new App();
    }

    public function new() {
        var root = createRoot();

        var rootComponent = react.ReactDOM.render(jsx('
            <Root/>
        '), root);

        #if debug
        ReactHMR.autoRefresh(rootComponent);
        #end
    }

    function createRoot() {
        var current = js.Browser.document.getElementById('root');
        if (current != null) return current;
        current = Dom.div();
        current.id = 'root';
        Dom.body().appendChild(current);
        return current;
    }
}
