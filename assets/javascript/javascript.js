// links

// https://developers.giphy.com/explorer/


$(document).ready(function () {


	// // Varible Declarations
	// --------------------------------------------------------------------------------------
	// 

	// my Giphy API key
	var apiKey = "eqcjQhf1YBw8L08YZx4ebon9N0M4Xx9Q";

	// temp searchkey
	// var searchkey = "dog";
	// search key array
	var searchkey = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

	// Giphy API endPoint address
	var endPoint = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchkey + "&limit=10&offset=0&rating=PG&lang=en"
	// Functions
	// --------------------------------------------------------------------------------------
	//

	function renderButtons() {

		$("#buttons").empty();

		for (var i = 0; i < searchkey.length; i++) {

			var buttons = $("<button>");
	
			buttons.addClass("search-value");
	
			buttons.attr("data-name", searchkey[i]);
			
			buttons.text(searchkey[i]);
	
			$("#buttons").append(buttons);
		}
	}

	$("#submit").on("click", function(event) {
		
		event.preventDefault();

	
		var search = $("#submit").val().trim();

		search = $(this).attr("data-name");

		searchkey.push(search);


console.log(searchkey);

		renderButtons();
	});

renderButtons();


// queries Giphy for 10 images then console.log() the responce
		$.ajax({
			url: endPoint,
			method: "GET"
		}).then(function (response) {
			console.log(response)

			var results = response.data;


			for (var i = 0; i < results.length; i++) {

					var gifDiv = $("<div class='item'>");

					var rating = results[i].rating;
			
					var p = $("<p>").text("Rating: " + rating);
					
					var resultsImage = $("<img>");

					resultsImage.attr("src", results[i].images.fixed_height.url);

					gifDiv.append(p);
					gifDiv.append(resultsImage);

					$("#results").prepend(gifDiv);
			}
		});
	// onclick for all created buttons
	$("button").on("click", function () {

		
	});

	// Process
	// --------------------------------------------------------------------------------------
	// 

	// save inputs into array

	// create buttons using inputArray; re-render at each new addition

	// onclick of buttons load new image(10) onto page; removing old images

	// play/pause gifs

	// is that too simple....



});