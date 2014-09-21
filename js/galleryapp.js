(function(){
	var app = angular.module('gallery', []);
	var potatos = [
	{
		name: 'Yukon Gold',
		description:'Great for cooking.'
	},
	{
		name: 'Russett',
		description:'Unknown purpose.'
	},	
	];

	app.controller('GalController', function(){
		this.items = potatos;
	});


})();