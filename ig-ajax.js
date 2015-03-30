const CLIENT_ID = "client_id=7812748ec4914c59ad0dcfbfe1130992";
const INSTAGRAM_AUTH = "https://instagram.com/oauth/authorize/?";
const REDIRECT_URI = "http://johnsington.me/ig-ajax.html";

//for offline testing, @johnsington access token
const testUser = "18354893.7812748.bfd6af94ff914bb28374abd75e64a11d";

function json(url, callback) {
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: { format:"json"}
    }).done(function(res) {
        callback(res);
    });
}

function authenticateUser(){
	var authenticate_url = INSTAGRAM_AUTH + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI + "&response_type=token";
	console.log(authenticate_url);
	window.location.href = authenticate_url;
}

function updatePage(){
var access_token = "";
	//gets access token from URL after hash changes
	if (location.hash)
	{
		access_token = location.hash.substring(14);
	}
	else
	{
		//offline testing: COMMENT LINE BEFORE COMMITTING
		access_token = testUser;
		//no access token, stops update
		// return false;
	}

	getUserPhotos(access_token, 
		function(data){
			console.log('here');
			var likes = countLikes(data);
			//sets total likes
			$('#resp').text(likes);
			$('#count').text("COUNT AGAIN");
			
			getUserProfile(access_token, function(data){
				//set background of posts using Instafeed
				var feed = new Instafeed({
			        get: 'user',
			        userId: parseInt(data.data.id),
			        accessToken: access_token,
			        template: '<img src="{{image}}"/>',
			        resolution: 'standard_resolution'
			    });

				var userPhotoURL = data.data.profile_picture;

				//populates background with IG photos,timeOut to handle loading
				$('.instafeed').fadeIn(500).css("background", "#000");

				feed.run();
				$(".instafeed, .overlay").height($(window).height());


				setTimeout(function(){
					$(".instafeed img").height($(".instafeed img").innerWidth()).fadeIn(500);
				},1000);

				//updates and shows user photo
				$('#userPhoto').attr('src', userPhotoURL).show();
				//shows likes
				$('header div, .callout-tip').show();
				//hides typed.js title
				$('.element').hide();


				centerHeader();
			})
		});

}

function getUserProfile(token, callback){
	console.log('entered getUserProfile');
	json("https://api.instagram.com/v1/users/self/?access_token="
			+ token,
		function(data){
			console.log(data);
			callback(data);
		}
		)
}
//returns Object of photos
function getUserPhotos(token, callback){
	console.log('entered getUserPhotos');
	json("https://api.instagram.com/v1/users/self/media/recent/?access_token="
			+ token,
		function(data){
			console.log(data);
			callback(data);
		}
		)
}

function countLikes(data){
	var likeCount = 0;
	$.each(data.data, function(index, val){
		var cur_like = val.likes.count;
		console.log("like from " + index + ": " + cur_like);
		likeCount += cur_like;
		console.log("total from 20 posts: " + likeCount);
	});
	return likeCount;
}

console.log(location);

function centerHeader(){
	var centerHeight = $(window).height() / 2 - $("header").height() / 2;
	var centerTitleHeight = $(window).height() / 2 - $(".element").height() / 2 - 20;
	$("header").css("margin-top", centerHeight);
	$(".element").css("margin-top", centerTitleHeight);
	$(".instafeed, .overlay").height($(window).height());
	$(".instafeed img").height($(".instafeed img").innerWidth());
}

$(document).ready(function(){

	window.onhashchange = updatePage();
	centerHeader();

	//initial animations
	$(window).load(function(){
		setTimeout(function(){
	    $(".element").typed({
	        strings: [
	        	"Let me count all your #instalikes.^200",
	        	"#instakarma"
	        	],
	        startDelay: 500
	    });
	}, 500);
	});

	//when the main button is pressed
	$('#count').click(function(){
		if (location.hash){
			updatePage();
		}
		else{
			authenticateUser();
		}
	});

	$(window).resize(function(){
		centerHeader();
	});


});

//loads images nicely,
(function ($) {

    $.fn.loadNicely = function (options) {

        var defaults = {
            preLoad: function (img) { },
            onLoad: function (img) { $(img).fadeIn(200); }
        };

        var options = $.extend(defaults, options);

        return this.each(function () {

            if (!this.complete) {
                options.preLoad(this);
                $(this).load(function () { options.onLoad(this); }).attr("src", this.src);
            }
            else {
                options.onLoad(this);
            }
        });
    };
})(jQuery);
