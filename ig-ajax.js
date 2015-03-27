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

function main(){
	var access_token = "";
	//gets access token from URL after hash changes
	if (location.hash)
	{
		access_token = location.hash.substring(14);
	}
	else
	{
		//no access token
		return false;
	}

	getUserPhotos(access_token, 
		function(data){
			console.log('here');
			var likes = countLikes(data);
			$('#resp').text(likes + " likes");
		});

}

//returns Object of photos
function getUserPhotos(token, callback){
	// token = testUser;
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
window.onhashchange = main();

$(document).ready(function(){
	$("a").click(function(){
		authenticateUser();
	});
});
