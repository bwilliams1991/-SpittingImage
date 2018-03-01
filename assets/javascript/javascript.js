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
	var endPoint = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey  + "&limit=10&offset=0&rating=G&lang=en"+ "&q=";
	
	// Functions
	// --------------------------------------------------------------------------------------
	//

	// onclick for all created buttons
	$(document).on("click", ".search-value", function (value) {

		
		// console.log(value);
		// console.log(value.target.innerText);
		searchvalue = value.target.innerText;
		console.log(searchvalue);

		var link = endPoint + searchvalue; 

		console.log("you got in");
		// queries Giphy for 10 images then console.log() the responce
		$.ajax({
			url: link,
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
	});

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

	$("#add-search").on("click", function (event) {
		// event.preventDefault() prevents the form from trying to submit itself.
		// We're using a form so that the user can hit enter instead of clicking the button if they want
		event.preventDefault();

		// This line will grab the text from the input box
		var search = $("#search-input").val().trim();
		// The search from the textbox is then added to our array
		console.log(search);
		console.log(this);
		searchkey.push(search);
		console.log(searchkey);
		// calling renderButtons which handles the processing of our movie array
		renderButtons();
	});

	renderButtons();





	// Process
	// --------------------------------------------------------------------------------------
	// 



	// onclick of buttons load new image(10) onto page; removing old images

	// play/pause gifs

	// is that too simple....
	//prevent adding blank buttons


});