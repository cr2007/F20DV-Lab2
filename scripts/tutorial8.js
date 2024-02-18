"use strict";

console.log(`d3.version: ${d3.version}`);


// Load the data into the application
let data = await d3.csv("data/movies_mock.csv", (d) => {
	// Calculate profit (will be helpful later on)
	let profits = +d.revenues - +d.budget;
	return {
		releaseDate: new Date(+d.release_year, d.release_month, 1),
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

// If data is loaded, print success message
if (data) {
	console.info("Data loaded successfully");
	console.groupCollapsed("View loaded data here ↓")
	console.log(data); // Print the data to the console
	console.groupEnd();
} else { // If data is not loaded, print error message
	console.warn("Error loading data");
}

/* Exercise: Data Formatting */

// Data formats
let formatDate = d3.timeFormat("%B %Y"); // Format date as "<long-month> <4 digit year>"
let percentageFormat = d3.format(".2%");
let siFormat = d3.format(".4s"); // SI prefixed format with 4 significant digits
let scaleA = d3.scaleLinear([0,  10], [0, 1]),
	scaleB = d3.scaleLinear([1,   5], [0, 1]),
	scaleC = d3.scaleLinear([0, 100], [0, 1]);

let sortedData = d3.sort(data, d => d.profits); // Sort the data by profits

// Reshape the data
let reshapedData = sortedData.map(d => {
	return {
		release: formatDate(d.releaseDate),
		genre: d.genre,
		director: d.director,
		rating: percentageFormat(d3.mean([scaleA(d.ratings_A), scaleB(d.ratings_B), scaleC(d.ratings_C)])),
		profits: siFormat(d.profits)
	}
});

let nestedData = d3.groups(reshapedData, d => d.genre, d => d.director); // Nest the data by genre and director


// Print the data to the console
console.groupCollapsed("View formatted data here ↓")
console.log(nestedData);
console.groupEnd();

let outputElement = document.getElementById("output");
outputElement.innerText = "Formatted CSV Data:\n\n" + JSON.stringify(nestedData, null, 2); // Print the data to the page
