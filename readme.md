# Modular Haxe JS with Webpack

This project demonstrates the creation of a Haxe-JavaScript modular project leveraging Webpack 
for bundling and lazy loading.

It's really easy and absolutely transparent in the code!

## How it works

### Generating a modular Haxe JS application

The basics of creating a modular Haxe JS application have been described in my 
[Modular Haxe Example](https://github.com/elsassph/modular-haxe-example) project. 
The same principle is at work here.   

### Leveraging Webpack features

Pre-requisite: you should be familiar with Webpack to enjoy what follows.

#### Bundling

Webpack analyses your JS code to identify `require` and `require.ensure` to know what to include
in your project (JS, CSS, images...).

Eg.

	Webpack.require('../index.css'); // includes styles in the bundle

	var img = new Image();
	img.src = Webpack.require('../logo.png'); // either the image URL or base64-encoded picture

#### Lazy loading

Following Webpack API we just have to write:

	Webpack.ensure(['./module1'], function() {
		// ready to use!
		new module1.Module1();
    });

`ensure` is a macro which will generate the needed Webpack-compatible JS code making the module
code (you can also require CSS files here) available.

#### External libraries

If you're making externs for JS libraries compatible with CommonJS (eg. most libraries nowadays)
you should bind your externs using the `@:jsRequire` meta:

	@:jsRequire('react')
	extern class React { ... } 

Webpack will take care of bundling those libraries and make them available when you need them.


## Example

### Building:

The hxml script defines common build properties, then builds the module and then the main application.
Obviously you can create several build scripts instead.

Here's the example script explained:

1. Common compiler options

	Those should include the `Stub.modules()` macro which does the JS modification previously
	described, and finishing by `--each` to start defining builds. 

		-cp src
		-debug
		--macro util.Stub.modules()
		--each

2. The builds (the order doesn't matter)

	The important part is to use the `--exclude` macro to ommit classes/packages that are 
	expected to be loaded, and `--next` between each module. Here we only have `-main` for the 
	main JS because we want the static main to be executed.

	Note that the JS files are generated under `src/js`: this is where Webpack is going to look
	for the JS sources to bundle.

		-js src/js/module1.js
		module1.Module1
		--macro exclude('com.common')

		--next
	
		-js src/js/index.js
		-main Main
		--macro exclude('module1')

### Running

Start Webpack webserver and open `http://localhost:8080`:

	npm start

## Gotchas

- **Shared classes can not be in the global package.**

- **In a module, you MUST `@:expose` every type that you will explicitly use in your main
application's code (`new`, `Std.is`, `Type` reflection...).**

- Also if you are going to use reflection in the main application (eg. `Std.is`), you MUST use some
reflection in the modules code, otherwise the compiler will not generate the reflection metadata.
Alternatively you can set `-dce no` in the compiler arguments for the module.

- There's no clean way to actually expose something to `window` or `exports`; you can do it 
explicitly for now (a little macro could solve it I guess): 

	    untyped window.MyPublicClass = MyPublicClass
	    untyped exports.MyPublicClass = MyPublicClass

## Further improvements

Hot loading works great for styles, but it wasn't tested with React - there's likely some work to do
to enjoy React view hot reload...