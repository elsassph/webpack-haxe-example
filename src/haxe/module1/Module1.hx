package module1;

import js.html.Image;
import module1.sub.Dependency1;
import util.Webpack;

@:expose
class Module1 extends Dependency2 implements Interface1
{
	public var sub:Dependency1;

	public function new() 
	{
		super();
		view.className = 'module1';
		
		sub = new Dependency1();
		view.appendChild(createBug());
		view.appendChild(sub.view);
	}
	
	function createBug() 
	{
		var img = new Image();
		img.src = Webpack.require('../bug.png');
		return img;
	}
	
}