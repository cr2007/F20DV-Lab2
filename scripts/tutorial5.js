"use strict";

console.log(`d3.version: ${d3.version}`);

/** Exercise: D3 Fetch
 * Loads the data into the application
 */

let data = await d3.csv("data/movies_mock.csv", (d) => {
	// Calculate profit (will be helpful later on)
	let profits = +d.revenues - +d.budget;
	return {
		releaseDate: new Date(+d.release_year, d.release_month, 1)/* .toLocaleDateString() */,
		genre: d.genre,
		director: d.director,
		budget: +d.budget,
		revenues: +d.revenues,
		ratings_A: +d.ratings_A,
		ratings_B: +d.ratings_B,
		ratings_C: +d.ratings_C,
		profits: profits,
		commercialSuccess: profits > 0
	};
});

console.log(data); // Print the data to the console

let outputElement = document.getElementById("output");
outputElement.innerText = "CSV Data Loaded Successfully! \n\n" + JSON.stringify(data, null, 2); // Print the data to the page
