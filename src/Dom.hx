class Dom {

    static public function div() {
        return js.Browser.document.createDivElement();
    }

    static public function body() {
        return js.Browser.document.body;
    }
}