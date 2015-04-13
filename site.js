function fadeSequentially(){
	var duration = 600;

	$('.skills ul li').each(function(i) {
 			console.log(i);
 			$(this).delay( i*(duration/2) ).animate({opacity:1}, duration);
	});
}

//Card modules
function cardInit(id){
	$(id).on({
		mouseover: function(){
			$(this).addClass("hover");
		},
		mouseleave: function(){
			if(!$(this).hasClass("shiftup")){
				$(this).removeClass("hover");
			}
		},
		click: function(){
			//opens clicked card
			if(!$(this).hasClass("shiftup")){
				//resets all active cards
				$(".slider").removeClass("shiftup").removeClass("hover");
				$(".desc").removeClass("shiftup");
				//opens active card
				$(this).addClass("shiftup").addClass("hover");
				$(".desc", this).addClass("shiftup").css("height", $(".card").css("height"));
			}
			else{
				$(this).removeClass("shiftup");
				$(".desc", this).removeClass("shiftup");
			}
		}
	});
}

function resizeLanding(){
	if($(window).height()>600){
	$("header, .overlay").css("height", $(window).height());
	}
	else{
		$("header, .overlay").css("height", "600px");
	}
}

$(document).ready(function(){
	resizeLanding();

	//initial animations
	$(window).load(function(){
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
	});
	
	// initialize card funcationality
	$(".slider").each(function(){
		cardInit("#" + $(this).attr("id"));
	});

	//phone carousel initialization
	$('.phone').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		arrows:false
	 });

	var waypoints = $('.skills').waypoint({
	  handler: function(direction) {
	    console.log(this.element.id + ' hit');
	    fadeSequentially();
	  },
	  offset:100
	});

	//resizes landing to fit web client height
	$(window).resize(function(){
		resizeLanding();
	})
})
