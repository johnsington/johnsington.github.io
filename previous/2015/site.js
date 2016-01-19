function fadeSequentially(){
	var duration = 600;

	$('.skills ul li').each(function(i) {
 			$(this).delay( i*(duration/2) ).animate({opacity:1}, duration);
	});
}

//fix this function
function scrollTo(dest){
	$('html, body').animate({scrollTop:$(dest).offset().top - $('#topMenu').height() - 30}, 1000);
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
	if($(window).width()>500){
	$("header.main, .overlay").css("height", $(window).height());
	}
	else{
		$("header.main, .overlay").css("height", "450px");
	}
	var titleHeight = $(window).height() / 2 - $(".title").height() / 2;
	$("header.main .title").css("top", titleHeight);
}

$(document).ready(function(){
	//initializes parse
	Parse.initialize("g7pzoG8LovJzHImJG5OFODYrEKQ4wDVw4YK1z36j", "ihCOYBoeAHpqfvzRgGdMsbikuFKeKu2XXg6FsfXT");
	var EmailMessage = Parse.Object.extend("EmailMessage");
	resizeLanding();

	//initial animations for main
	$(window).load(function(){
		setTimeout(function(){
	    $(".element").typed({
	        strings: [
	        	"study software engineering at uWaterloo.^500",
	        	"blog about style.^300 (sorta)^500",
	        	"design and code in the web.^500"
	        	],
	        typeSpeed: 30,
	        startDelay: 500
	    });
	}, 500);
	});

	//initial animations for projects
	$(window).load(function(){
		setTimeout(function(){
	    $(".element-2").typed({
	        strings: [
	        	"Here are a few things I've worked on",
	        	],
	        typeSpeed: 30,
	        startDelay: 500
	    });
	}, 500);
	});

	//phone carousel initialization
	$('.phone').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		arrows:false
	 });

	$('.quotes').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		arrows:false
	});

	//animate skill li's
	var waypoints = $('.skills').waypoint({
	  handler: function(direction) {
	    fadeSequentially();
	  },
	  offset:100
	});

	var waypoints2 = $('.work').waypoint({
	  handler: function(direction) {
	    $('.typed-2').animate({opacity:1, top:0}, 1000);
	  },
	  offset:700
	});

	setTimeout(function(){
		var waypoints2 = $('.about').waypoint({
			handler: function(direction){
				if(direction=="down"){
					$('#topMenu').slideDown();
				}
				else if(direction=="up"){
					$('#topMenu').slideUp();
				}
			},
			offset:300
		});
	}, 200);

	//click event handles
	$('.navWork').click(function(e){
		e.preventDefault();
		scrollTo($('.jobs'));
	})
	$('.navProjects').click(function(e){
		e.preventDefault();
		scrollTo($('.featured'));
	})
	//resizes landing to fit web client height
	$(window).resize(function(){
		resizeLanding();
	});

	// // initialize card functionality
	// $(".ss").each(function(){
	// 	console.log("this ran");
	// 	cardInit("#" + $(this).attr("id"));
	// });

	//submits the message form
	$('#submitForm').click(function(e){
		e.preventDefault();
		var email_id = $('input#email').val();
		var message = $('textarea#message').val();
		var name = $('input#name').val();

		if(message == "" || name == ""){
			alert("Please fill out the missing fields!");
			return;
		}
		var emailMessage = new EmailMessage();

		emailMessage.set("email", email_id);
		emailMessage.set("message", message);
		emailMessage.set("name", name);

		emailMessage.save(null, {
			success : function(emailMessage){
				// console.log('email message sent with id: ' + emailMessage.id);
				// console.log('message by ' + name + ' (' + email_id + '): ' + message);
				$('input#email, textarea, input#name').val("");
				$('#submitForm').attr("value", "Submitted!").addClass("sentDisabled");
			},
			error : function(emailMessage, error){
				console.log('error');
			}
		});
	});

	//projects-specific script
	if ($('.work.panel').hasClass('projects')){

		//Generates the project cards
		
		//handlebars template source
		var source   = $("#some-template").html();
		//compiles into a template
		var template = Handlebars.compile(source);
		$.getJSON('parameters.json', function(data){
			$("#content-placeholder").html(template(data));
			$(".slider").each(function(){
				cardInit("#" + $(this).attr("id"));
			});
		});
	}
	if ($('body').hasClass('projects')){

		//Generates the project cards
		
		//handlebars template source
		var source   = $("#some-template").html();
		//compiles into a template
		var template = Handlebars.compile(source);
		$.getJSON('parameters.json', function(data){
			$("#content-placeholder").html(template(data));
			$(".slider").each(function(){
				cardInit("#" + $(this).attr("id"));
			});
		});
	}

	$('#dummy').ready(function() {
	    $('header.main').css('background','url(img/garden-bg-2-2.jpg)');
	    $('header.main').css('background-size','cover');
	    $('header.main').fadeIn(1000);
	});
});
