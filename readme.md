# Modular Haxe JS with Webpack

This project demonstrates the creation of a Haxe-JavaScript modular project leveraging Webpack 
for bundling (code and assets) and lazy loading.

It's really easy and absolutely transparent in the code!

## How it works

### Generating a modular Haxe JS application

The basics of creating a modular Haxe JS application have been described in my 
[Modular Haxe Example](https://github.com/elsassph/modular-haxe-example) project. 
The same principle is at work here.

*Note: this is a different approach than [Modular JS for Haxe](https://github.com/explorigin/modular-js)
to make the JS output require-friendly - I don't like the idea of creating a completely custom JS backend 
and prefer using the best output the compiler can do. But feel free to check it too!*

### Leveraging Webpack features

Pre-requisite: you should be familiar with Webpack to enjoy what follows.

Webpack analyses your JS code looking for `require` and `require.ensure` to know what to include
in your project (JS, CSS, images...) and how  to split it into separate bundles for lazy loading.

#### Bundling

Every code and assets dependency should be explictely required, so Webpack knows what to include in the
output folder. CSS and small images will even be included in the bundle to reduce the number of requests.

	Webpack.require('../index.css'); // includes styles in the bundle

	var img = new Image();
	img.src = Webpack.require('../logo.png'); // either image URL or base64-encoded picture

Tip - shorter syntax:

	import util.Webpack.require;
	...
	require('../index.css');

#### Lazy loading

When using `require.ensure`, Webpack will try to identify dependencies which can be deferred to first use - 
it will create additional bundles which will be loaded when needed. 

Following Webpack API we just have to write:

	Webpack.ensure(['./module1'], function() {
		// ready to use!
		new module1.Module1();
    });

`ensure` is a small macro which will generate the needed Webpack ensure/require JS code necessary to 
mark,  load and  evaluate a lazy-loading module.

Tip - shorter syntax:

	import util.Webpack.ensure;
	...
	ensure(['./module1'], function() {...});

#### External libraries

If you're making externs for JS libraries compatible with CommonJS (eg. most libraries nowadays)
you should bind your externs using the `@:jsRequire` meta:

	@:jsRequire('react')
	extern class React { ... } 

Webpack will take care of bundling those libraries and make them available when you need them.


## Example

### Building

Build the Haxe side as usual:

	haxe build.hxml

The hxml script defines common build properties, then builds the module and then the main application.
Obviously you can create several build scripts instead.

Here's the example script explained:

1. Common compiler options

	Those should include the `Stub.modules()` macro which does tiny (but important) JS modifications
	to each JS file produced, followed by `--each` to start defining the modules builds. 

		-cp src/haxe
		-debug
		--macro util.Stub.modules()
		--each

2. The builds (order doesn't matter)

	The important part is to use the built-in `--exclude` macro to omit classes/packages that are 
	expected to be loaded, and `--next` between each module. Here `-main` is specified only for the
	main JS entry point. 
	
	Unlike normal Webpack where every single class is separately required, 
	you have to define the general bundling of your Haxe application and pre-bundle the code.

	Note that the JS files are generated under `src/js`: this is where Webpack is going to look
	for the JS sources to bundle.

		-js src/js/module1.js
		module1.Module1
		--macro exclude('com.common')

		--next
	
		-js src/js/index.js
		-main Main
		--macro exclude('module1')

### Webpack config

Webpack's "magic" is configured in the `webpackconfig.js`. It's kind of ugly and complicated, so
read everything you can find about it to properly understand how it works ;)

The config provided here is fairly rudimentary and not fit for production purposes.

### Running

Install node dependencies:
	
	npm install

Then start Webpack webserver, open `http://localhost:8080`, and enjoy live reload:

	npm start

If you want fancy automatic building of the Haxe side, check `haxe-wachify`:

	haxe-watchify --program haxe --hxml build.hxml --src src/haxe

## Gotchas

- **Shared classes can not be in the global package.**

- **In a module, you MUST `@:expose` every type that you will explicitly use in your main
application's code (`new`, `Std.is`, `Type` reflection...).**

- Also if you are going to use reflection in the main application (eg. `Std.is`), you MUST use some
reflection in the modules code, otherwise the compiler will not generate the reflection metadata.
Alternatively you can set `-dce no` in the compiler arguments for the module.

- Regular `@:expose` behaviour doesn't create global references on `window` - to expose a Haxe class it is 
necessary to explicitely create the reference somewhere in your code:

	    untyped window.MyPublicClass = MyPublicClass

## Further improvements

Hot loading works great for styles, but it wasn't tested with React - there's likely some work to do
to enjoy React view hot reload...
