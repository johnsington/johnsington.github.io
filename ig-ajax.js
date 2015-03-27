const CLIENT_ID = "client_id=7812748ec4914c59ad0dcfbfe1130992";
const INSTAGRAM_AUTH = "https://instagram.com/oauth/authorize/?";
const REDIRECT_URI = "http://johnsington.me/ig-ajax.html";

function json(url, data, callback) {
    $.ajax({
        url: url,
        dataType: "json",
        data: data || null
    }).done(function(res) {
        callback(res);
    });
}

function authenticateUser(){
	var authenticate_url = INSTAGRAM_AUTH + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI + "&response_type=token";
	console.log(authenticate_url);
	window.location.href = authenticate_url;
}

function getAccessToken(){
	if (location.hash)
	{
		var access_token = location.hash.substring(14);
		console.log(access_token);
		return access_token;
	}
	else
	{
		//no access token
		return false;
	}

}


console.log(location);
window.onhashchange = getAccessToken();

$(document).ready(function(){
	$("a").click(function(){
		authenticateUser();
	});
});
