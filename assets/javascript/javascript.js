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
	var endPoint = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=10&offset=0&rating=G&lang=en" + "&q=";


	var results;

	var still;
	var animate;
	var state = "still";
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

	$("#add-search").on("click", function (event) {
		// event.preventDefault() prevents the form from trying to submit itself.
		// We're using a form so that the user can hit enter instead of clicking the button if they want
		event.preventDefault();

		// This line will grab the text from the input box
		var search = $("#search-input").val().trim();


		//prevent adding blank buttons
		if (search == !null) {

			renderButtons();

			searchkey.push(search);

			// testing
			// console.log(search);
			// console.log(this);
			// console.log(searchkey);
		}
	});

	function clickGif() {
		var currentGif = $(this);
		var state = currentGif.attr("data-state");

		still = currentGif.attr("data-still");
		animate = currentGif.attr("data-animate");	

		if (state === "still") {
			currentGif.attr("src", animate);
			currentGif.attr("data-state", "animate");
		} else {
			currentGif.attr("src", still);
			currentGif.attr("data-state", "still");
		}
	};


	// Process
	// --------------------------------------------------------------------------------------
	// initial button rendering
	renderButtons();


	// onclick for all created buttons
	$(document).on("click", ".search-value", function (value) {


		// console.log(value);
		// console.log(value.target.innerText);
		searchvalue = value.target.innerText;
		console.log(searchvalue);

		var link = endPoint + searchvalue;

		// console.log("you got in");
		// queries Giphy for 10 images then console.log() the responce
		$.ajax({
			url: link,
			method: "GET"
		}).then(function (response) {
			console.log(response);

			// clear the results div
			$("#results").empty();

			results = response.data;



			for (var i = 0; i < results.length; i++) {

				var gifDiv = $("<div class='item'>");

				var rating = results[i].rating;

				var p = $("<p>").text("Rating: " + rating);

				var resultsImage = $("<img class='gif'>");




				console.log(still);
				console.log(animate);
				console.log(state);

				resultsImage.attr("src", results[i].images.fixed_height_still.url);
				resultsImage.attr("data-state", state);
				resultsImage.attr("data-still", results[i].images.fixed_height_still.url);
				resultsImage.attr("data-animate", results[i].images.fixed_height.url);

				// console.log(this);
				gifDiv.append(p);
				gifDiv.append(resultsImage);

				$("#results").prepend(gifDiv);
			}
		});
	});

	// // play/pause gifs
	$(document).on("click", ".gif", clickGif);






	// is that too simple....
	//  try to comment each line
	// style page


});