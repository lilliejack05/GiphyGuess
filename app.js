// create an array of current criminal investigative shows
var topics = ["Criminal Minds", "Law & Order: Special Victims Unit", "Chicago P.D.", "NCIS Los Angeles", "Blue Bloods", "Lucifer", "NCIS New Orleans", "The Blacklist", "BlindSpot", "Orange Is The New Black", "Good Girls", "NCIS", "True Detective", "Brooklyn Nine-Nine", "Hawaii five-0"];

// creates buttons for each of these
function makeButtons(){ 
	// deletes the shows prior to adding new shows so there are no repeat buttons
	$('#buttonsView').empty();
	// loops through the shows array
	for (var i = 0; i < topics.length; i++){
		// makes buttons for every show in the array
		var a = $('<button>') 
		a.addClass('show'); // add a class
		a.attr('data-name', topics[i]); //  data-attribute
		a.text(topics[i]); // make button text
		$('#buttonsView').append(a); // append the button to buttonsView div
	}
}

// handles addShow button event
$("#addtopics").on("click", function(){

	// grabs the user show input
	var topics = $("#topics-input").val().trim();
	// that input is now added to the array
	topics.push(topics);
	// the makeButtons function is called, which makes buttons for all my shows plus the user show
	makeButtons();
	// this line is so users can hit "enter" instead of clicking the submit button
	return false; 
})

// function to display gifs
function displayGifs(){
	var topics = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Bw2YLOAHZCQNkh4snQTv9cBD98WpU80I&q=topics&limit=9&offset=0&rating=G&lang=en";

		// creates ajax call
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			// save results as a variable
			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a generic div to hold the results
				var gifDiv = $('<div class=gifs>');
				var topicsGif = $('<img>');
					topicsGif.attr('src', results[i].images.fixed_height_still.url);
					// shows the rating on hover
					topicsGif.attr('title', "Rating: " + results[i].rating);
					topicsGif.attr('data-still', results[i].images.fixed_height_still.url);
					topicsGif.attr('data-state', 'still');
					topicsGif.addClass('gif');
					topicsGif.attr('data-animate', results[i].images.fixed_height.url);
				// var rating = results[i].rating;
				// var p = $('<p>').text('Rating: ' + rating);
				gifDiv.append(topicsGif)
				// gifDiv.append(p)

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}

// function for animating gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying topic gifs
$(document).on("click", ".topics", displayGifs);

// initially calls the makeButtons function
makeButtons();