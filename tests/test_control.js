juxtapo.initComplete(function(){
    module("Control");
    test("Control Init", function(){
        ok(juxtapo.control.initCompleted, "Control has initialised")
        equals(typeof(juxtapo.control.controller), "object", "Controller element exists");
        //ok(juxtapo.control.controller.onclick, "Controller on click added");
    });
});          

