(function(){
	var app = angular.module('sayWat', []);

	Parse.initialize("GNR5cPC1JHG5XCQr08CXjEnsJDQcC1hx3US7UWwD", "TpIhjN5mkJbzF8z3wBFCaAT6Sr65cUMTQW2hzXDx");

    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
      testObject.save({foo: "bar"}, {
      success: function(object) {
        console.log("SUCCESS");
      },
      error: function(model, error) {
        console.log("ERROR");
      }
    });

})();