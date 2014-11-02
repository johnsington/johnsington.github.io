var app = angular.module('sayWat', []);

window.posts= [];
var loadArr = [];
var numPosts = 0;
var firstLoad = false;

	app.controller('BodyController', function(){
		items = loadArr;

	});

	app.controller('PanelController', function(){
		this.tab = false;

	this.isSelected = function(){
		this.tab = !this.tab;
		return this.tab; //checks if tab is selected, returns Bool
		};
	
	this.hideForm = function(){
		this.tab = false;
		return this.tab;
	}

	});

$(function(){
    Parse.initialize("GNR5cPC1JHG5XCQr08CXjEnsJDQcC1hx3US7UWwD", "TpIhjN5mkJbzF8z3wBFCaAT6Sr65cUMTQW2hzXDx");

    //Post Object: containrs a title and imageURL
    var Post = Parse.Object.extend("Post", {
    	getTitle: function(){
    		return this.get("title");
    	}
    }, {
    	create: function(str, imgURL){
    		var post = new Post();
    		post.set("title",str);
    		post.set("imgURL", imgURL);
    		post.set("nextObjectId", "");
    		return post;
    	}
    });

    //Feed Object: contains an array of Post ID's
    var Feed = Parse.Object.extend("Feed", {

    	getLastPostId: function(){
    		return this.lastPost;
    	},

    	initialize: function(attrs, options){
    		this.lastPost = "";
    		this.empty = false;
    	}

	}, {
    	create: function(){
    		var feed = new Feed();
   			return feed;
    	}
    });

    //variable declarations
	var ConstFeed = Parse.Object.extend("Feed");
	var query = new Parse.Query(ConstFeed);
	var f = Feed.create();
	var str = "";

	query.get("Dptlu55M56", {
	  success: function(constFeed) {
	  	f = constFeed;
	    // The object was retrieved successfully.
	    console.log("good");
	  },
	  error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	    console.log("bad");
	  }
	});

	//Resets the stack, uncomment and compile to clear stack
	//BAD IMPLEMENTATION OF A RESET
    // setTimeout(function(){
	   //   f.save(null, {
	   //  	success: function(object){
	   //  		f.set("lastPost", "");
	   //  		f.set("empty",false);
	   //  		f.save();
		  //   	console.log("array saved");
	   //  	},
	   //  	error: function(model, error){
	   //  		console.log("NAH SON");
	   //  	}
	   //  });
    // },1500);

    //Debugging
  	setTimeout(function(){
		str = f.get("lastPost");

	}, 1000);

    function pushPost(feed, post){
    //pushes the new post the feed
    	setTimeout(function(){
    	    console.log("prev val to be assigned: " + feed.get("lastPost"));
    	    console.log("was it not empty?" + feed.get("empty"));
    		if (feed.get("empty") == false){
    			feed.set("empty", true);
    			feed.set("lastPost",post.id);
    		}
    		else{
    			post.set("nextObjectId", feed.get("lastPost"));
    			feed.set("lastPost",post.id);
    		}
    	}, 1000);
    setTimeout(function(){
	 	post.save(null, {
	      success: function(object) {
	        console.log("SUCCESS: apple saved");
	        post.set("title",post.title);
	        post.set("imageURL",post.imageURL);
	        post.set("nextObjectId",post.nextObjectId);
	        post.save();
	      },
	      error: function(model, error) {
	        console.log("ERROR");
	      }
	    });
	},1250);
    //saves the feed with new post
    setTimeout(function(){
	     feed.save(null, {
	    	success: function(object){
	    		feed.save();
		    	console.log("array saved");
	    	},
	    	error: function(model, error){
	    		console.log("NAH SON");
	    	}
	    });
    },1500);

	setTimeout(function(){
		$('.feedArray').empty();
		str = f.get("lastPost");
		loadPosts(str);
	},1700);
    }

//Form submission method for New Post
$('.pSwapForm').submit(function(event){

	//creates post using form values
	var temp = Post.create($('#title').val(), $('#imageURL').val());

	//saves temp Post
	  temp.save(null, {
      success: function(object) {
        console.log("SUCCESS: apple saved");
        temp.save();
      },
      error: function(model, error) {
        console.log("ERROR");
      }
    });

	pushPost(f,temp);
});

//Loads the card templates onto the page
function loadPosts(nextId){
	var TempPost = Parse.Object.extend("Post");
	var postQuery = new Parse.Query(TempPost);
	var tempPost = Feed.create();

	setTimeout(function(){
		postQuery.get(nextId, {
		  success: function(constPost) {
		  	tempPost = constPost;
		    // The object was retrieved successfully.
		    console.log("good load of temp Post");

		    //loads content into array
		    loadArr.push({title: tempPost.get("title"), imageURL: tempPost.get("imgURL")});
		    numPosts++;
		    //debug

			$('.feedArray').append(function(){
				var txt = tempPost.get("title");
				if (txt == ""){
					loadArr.pop();
					return;
				}
				var content = '<p class="quote">' + '"' + txt + '"' + '</p>\n';
				return content;
			});

				if(tempPost.get("nextObjectId") != ""){
						nextId = tempPost.get("nextObjectId");
					loadPosts(nextId);
				}

		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and message.
		    console.log("bad");
		  }
		});
	}, 1000);

}



$(document).ready(function(){
	$('#img-holder').hover(function(){
		$('#postTitle').css('opacity','1');
	},
	function(){
		$('#postTitle').css('opacity','0');
	});

	setTimeout(function(){
		loadPosts(str);
	},1000);

});
    // $('#postTitle').text(a.getTitle());
});
