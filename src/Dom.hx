class Dom {
    static var TEMP = js.Browser.document.createDivElement();

    inline static public function div() {
        return js.Browser.document.createDivElement();
    }

    inline static public function html(html: String) {
        TEMP.innerHTML = html;
        return TEMP.firstElementChild;
    }

    inline static public function body() {
        return js.Browser.document.body;
    }
}
