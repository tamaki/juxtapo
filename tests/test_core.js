if (juxtapo.coreJsUrl().indexOf('coverage') > -1){
	juxtapo.addPlugins(['../../plugins/juxtapo.views/juxtapo.views.js']);
}else{
	juxtapo.addPlugins(['../plugins/juxtapo.views/juxtapo.views.js']);	
}

juxtapo.setDefaultStyles({
	position : 'absolute',
	'z-index' : '2000',
	top : '0px',
	left : '50%',
	'margin-left' : '-375px'
});

juxtapo.initConfig(function(){
    module("core initConfig");
    var t = juxtapo.addTemplate("test.htm", "test.png", {});
    test("addTemplate", function(){
        var expected = new juxtapo.templates.TemplateItem("test.png", ["test.htm"], {});
        equals(t.imageUrl, expected.imageUrl, "We should have a new template");
        juxtapo.addTemplate("../../tests/TestSuite-plugins.html", "../../tests/test2.png", {});
        juxtapo.addTemplate("test3.htm", "../../tests/test3.png", {});
        ok(
			juxtapo.addTemplate(['ThreeResults.htm','path2.htm'], "../../tests/item.png", {}) instanceof juxtapo.templates.TemplateItem,
			"Can add an array of paths to add a template"
		);
        juxtapo.addTemplate("THREERESULTS.htm", "../../tests/page5.png", {});
        ok(
        	juxtapo.addTemplate(new juxtapo.templates.TemplateItem("../../tests/juxtapotestsuite-screenshot.png", ["threeresults.htm"], {})),
			"Passing a TemplateItem in to addTemplate"
		);
        equals(juxtapo.templates.collection.length, 6, "There should be 6 templates")
    });	
});          
juxtapo.initComplete(function(){
    module("core initComplete");
    test("init", function(){
        equals(juxtapo.templates.getAll().length, 6, "There should be 6 templates")
        ok(true, "initComplete");
    });
    module("core Plugins");
	test("addPlugins",function(){
		stop();
		juxtapo.thumbs.dropDown().show();
		equals(
			$('.juxtapo-toolbtn-contents:contains(List)').length,
			1,
			"thumbs toolbar includes the List button added by the views plugin"
		);
		start();
		juxtapo.thumbs.dropDown().show(false);			
	});
});          

module('core');
test("core properties",function(){
	ok(juxtapo.coreJsUrl(),'finds url with coreJsUrl()');
	if (juxtapo.utils.getQuery('status')){
		same(juxtapo.currentDesignView,juxtapo.designViews.hidden,'juxtapo.currentDesignView matches juxtapo.designViews.hidden');		
		same(juxtapo.currentStatus,juxtapo.statuses.play,'juxtapo.currentStatus matches juxtapo.statuses.off');
		//juxtapo.control.pause();
	}else{
		ok(juxtapo.currentDesignView === juxtapo.designViews.hidden,'juxtapo.currentDesignView matches juxtapo.designViews.hidden');
		ok(juxtapo.currentStatus === juxtapo.statuses.pause,'juxtapo.currentStatus matches juxtapo.statuses.off');
	}
});

module('Plugin');
test('Add Basic Plugin',function(){
	ok(juxtapo.Plugin,'Plugin constructor has been added');
	ok(
		juxtapo.plugins.testPlugin = new juxtapo.Plugin(),
		'Create new instance of juxtapo.Plugin and add to juxtapo.plugins.testPlugin'
	);
	equals(
		juxtapo.plugins.testPlugin instanceof juxtapo.Plugin,
		true,
		'The newly created plugin should be an instanceof juxtapo.Plugin'
	);
	
	var result;
	try{ new juxtapo.Plugin(1); }
	catch(ex){ result = ex; }
	ok(
		result instanceof juxtapo.eh.Exception,
		'Passing anything that is not an object to the constructor should throw an exception'
	);
});
test('Instantiate a Plugin with an object',function(){
	var pluginPassingObject;
	ok(
		pluginPassingObject = new juxtapo.Plugin({
			init: function(){
				this.publicVar = 'changed';
			},
			publicVar: 'public'
		}),
		'Create a new plugin giving it an object of properties'
	);
	equals(
		typeof pluginPassingObject.init,
		'function',
		'The new plugin should have an init function'
	);
	equals(
		pluginPassingObject.publicVar,
		'public',
		'The new plugin should have the publicVar variable set to public'
	);
	pluginPassingObject.initCompleted(function(){
		this.handledInitCompleted = true;
	});
	equals(
		pluginPassingObject._init(),
		true,
		'Initialising the plugin should return true'
	);
	equals(
		pluginPassingObject.publicVar,
		'changed',
		'check publicVar has been changed within the init function'
	);
	equals(
		pluginPassingObject.initComplete,
		true,
		'pluginPassingFunction.initComplete should be true'
	);
	equals(
		pluginPassingObject.handledInitCompleted,
		true,
		'initCompleted should have fired and set handledInitCompleted to be true'
	);
});
test('Instantiate a Plugin with a function',function(){
	var pluginPassingFunction;
	ok(
		pluginPassingFunction = new juxtapo.Plugin(function(){
			return {
				init: function(){
					this.publicVar = 'changed';
				},
				publicVar: 'public'
			}
		}),
		'Create a new plugin giving it an object of properties'
	);
	equals(
		typeof pluginPassingFunction.init,
		'function',
		'The new plugin should have an init function'
	);
	equals(
		pluginPassingFunction.publicVar,
		'public',
		'The new plugin should have the publicVar variable set to public'
	);
	pluginPassingFunction.initCompleted(function(){
		this.handledInitCompleted = true;
	});
	equals(
		pluginPassingFunction._init(),
		true,
		'Initialising the plugin should return true'
	);
	equals(
		pluginPassingFunction.publicVar,
		'changed',
		'check publicVar has been changed within the init function'
	);
	equals(
		pluginPassingFunction.initComplete,
		true,
		'pluginPassingFunction.initComplete should be true'
	);
	equals(
		pluginPassingFunction.handledInitCompleted,
		true,
		'initCompleted should have fired and set handledInitCompleted to be true'
	);
});
test('Example plugins',function(){
	ok(
		juxtapo.plugins.qunit,
		'qunit plugin added'
	);
	ok(
		juxtapo.plugins.qunit.dropDown() instanceof juxtapo.ui.DropDown,
		'qunit plugin dropdown has been initialised'
	);
});