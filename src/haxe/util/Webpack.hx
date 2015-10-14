package util;
import haxe.macro.Expr;

class Webpack
{
	macro static public function ensure(modules:ExprOf<Array<String>>, ready:ExprOf<Void->Void>) 
	{
		var reqs = [];
		switch (modules.expr) {
			case EArrayDecl(values):
				for (value in values) 
					reqs.push(macro require($value));
			default:
		}
		return macro untyped require.ensure($modules, function() {
			$b{reqs}
			$ready();
		});
	}
	
	macro static public function require(module:ExprOf<String>)
	{
		return macro untyped require($module);
	}
}