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
				$(".slider").removeClass("shiftup");
				$(".desc").removeClass("shiftup");
				//opens active card
				$(this).addClass("shiftup");
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
	
	//initialize card funcationality
	// $(".slider").each(function(){
	// 	cardInit("#" + $(this).attr("id"));
	// });

	//resizes landing to fit web client height
	$(window).resize(function(){
		resizeLanding();
	})
})
