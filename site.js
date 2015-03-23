$(document).ready(function(){

	//initial animations
	setTimeout(function(){
	    $(".element").typed({
	        strings: [
	        	"<b>multi-disciplinary<b>.^200",
	        	"<b>front-end<b>.^200",
	        	"<b>visually creative<b>.^200",
	        	"<b>John<b>.^200"
	        	],
	        typeSpeed: 30,
	        startDelay: 500
	    });
	}, 500);
	

	if($(window).height()>600){
	$("header").css("height", $(window).height());
	}
	else{
		$("header").css("height", "600px");
	}
})
