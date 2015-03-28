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
		//offline testing
		// access_token = testUser;
		//no access token, stops update
		return false;
	}

	getUserPhotos(access_token, 
		function(data){
			console.log('here');
			var likes = countLikes(data);
			//sets total likes
			$('#resp').text(likes);
			$('#count').text("count again");
			//sets user image
			getUserProfile(access_token, function(data){
				var userPhotoURL = data.data.profile_picture;
				$('#userPhoto').attr('src', userPhotoURL);
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
	$("header").css("margin-top", centerHeight);
}

$(document).ready(function(){
	window.onhashchange = updatePage();
	centerHeader();

	$('#count').click(function(){
		updatePage();
	});

	$(window).resize(function(){
		centerHeader();
	});
});
