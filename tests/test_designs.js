juxtapo.initComplete(function(){
    module("templates");
    
    test("getTemplateFromUrl", function(){
        ok(juxtapo.templates.getTemplateFromUrl("test.htm"), "We should get image settings back");
        ok(juxtapo.templates.getTemplateFromUrl("TeSt.htm"), "url should be case insensitive");
        same(juxtapo.templates.getTemplateFromUrl("nofile.htm"), juxtapo.templates.collection[0], "When there is no match we should get the first template back");
        
    });
    
    test("Setting transparency", function(){
        juxtapo.templates.show();
        equals(juxtapo.currentDesignView, juxtapo.designViews.opaque, "juxtapo.templates.show() - Design view should be opaque(2)")
        juxtapo.templates.semiTransparent();
        equals(juxtapo.currentDesignView, juxtapo.designViews.semiTransparent, "juxtapo.templates.semiTransparent() - Design view should be semiTransparent(1)")
        juxtapo.templates.hide();
        equals(juxtapo.currentDesignView, juxtapo.designViews.hidden, "juxtapo.templates.hide() - Design view should be hidden(0)")
        
    });
    test("Switching transparency", function(){
        juxtapo.templates.forward();
        equals(juxtapo.currentDesignView, juxtapo.designViews.semiTransparent, "juxtapo.templates.forward() - Design view should be semiTransparent(1)")
        juxtapo.templates.forward();
        equals(juxtapo.currentDesignView, juxtapo.designViews.opaque, "juxtapo.templates.forward() - Design view should be opaque(2)")
        juxtapo.templates.forward();
        equals(juxtapo.currentDesignView, juxtapo.designViews.hidden, "juxtapo.templates.forward() - Design view should be hidden(0)")
        juxtapo.templates.back();
        equals(juxtapo.currentDesignView, juxtapo.designViews.opaque, "juxtapo.templates.back() - Design view should be opaque(2)")
        juxtapo.templates.back();
        equals(juxtapo.currentDesignView, juxtapo.designViews.semiTransparent, "juxtapo.templates.back() - Design view should be semiTransparent(1)")
        juxtapo.templates.back();
        equals(juxtapo.currentDesignView, juxtapo.designViews.hidden, "juxtapo.templates.back() - Design view should be hidden(0)")
    });
    
    test("Changing Template", function(){
        equals(juxtapo.templates.selectedTemplateIndex, 0, "Current Template should be 0");
        juxtapo.templates.change()
        equals(juxtapo.templates.selectedTemplateIndex, 1, "Next Template (should be 1)");
		ok($(juxtapo.templates.overlayImageElement()).attr('src').substr(0,3) != '../', "The relative overlay image url should have been changed to an absolute one");
        juxtapo.templates.change()
        equals(juxtapo.templates.selectedTemplateIndex, 2, "Next Template (should be 2)");
		ok($(juxtapo.templates.overlayImageElement()).attr('src').substr(0,3) != '../', "The relative overlay image url should have been changed to an absolute one");
        juxtapo.templates.change(true)
        equals(juxtapo.templates.selectedTemplateIndex, 1, "Previous Template (should be 1)");
    });
    
    test("search", function(){
        same(juxtapo.templates.search(""), {
            designs: [],
            indexes: []
        }, "Blank search should return an object with designs and indexes properties.");
        var results = juxtapo.templates.search("threeresults");
        ok(results, "Search for test should not be null");
        equals(results.designs.length, 3, "Search for threeresults should give 3 design results");
        equals(results.indexes.length, 3, "Search for threeresults should give 3 indexes results");
    });
	
	test("TemplateItem",function(){
		var t = new juxtapo.templates.TemplateItem(
			'test.png',
			'testtemplateitem.htm',
			{
				style:{top:'8px'},
				data: {metadata:'test'}
			});
		ok(t instanceof juxtapo.templates.TemplateItem,'create new TemplateItem');
		equals(
			t.getImageSrc(),
			'test.png',
			'get image src for the TemplateItem');
		ok(
			t.imageUrl = '../test.png', 
			'change the imageUrl of the TemplateItem to a relative path');		
		ok(
			juxtapo.utils.isAbsoluteUrl(t.getImageSrc()) === true,
			'New image src for the TemplateItem should be an absolute path');
		var thumb = new juxtapo.ui.Thumbnail(t);
		same(
			t.thumbnail,
			thumb,
			'Newly created ui.Thumbnail should now be associated with this template');
		
		ok(
			new juxtapo.templates.TemplateItem('test.png',['multiplepath.htm','path2.htm']),
			'create new TemplateItem with multiple paths');
	});
});          

