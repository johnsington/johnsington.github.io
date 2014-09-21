(function(){
	var app = angular.module('threadSwap', ['ngAnimate']);

	app.factory('Data', function(){
		return{message:"I'm data from a service"};
	});
	var isPostSwapClicked = true;
	var isManagSwapClicked = false;

	var threads = [
	{
		name: 'Bear Sweater',
		description: 'A comfy suit for costume parties. Great for scaring friends.',
		price: 295.50,
		seller: '@johnsington',
		imageURL: 'http://oi62.tinypic.com/35bigsz.jpg',
	},
	{
		name: 'Overcoat',
		description: 'From Zara, pickup on campus only.',
		price: 44.95,
		seller: '@UWstylesoc',
		imageURL: 'http://oi58.tinypic.com/28jz1mu.jpg',
	},
	{
		name: 'Plain Tee',
		description: 'A solid black tee for casual minimalism to channel your inner angst.',
		price: 10,
		seller: '@urbangoth1',
		imageURL: 'http://oi60.tinypic.com/2wg7k8x.jpg',
	}
	];

	app.controller('ThreadController', function(){
		this.items = threads;
		this.newThread = {};

		this.addThread = function(){
				this.items.push(this.newThread);
				this.newThread = {};
		};
	});

	app.controller('PanelController', function(){
		this.tab = false;

	this.isSelected = function(){
		this.tab = !this.tab;
		return this.tab; //checks if tab is selected, returns Bool
		};
	});

})();
