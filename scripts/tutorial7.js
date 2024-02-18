"use strict";

import Histogram from "./histogram.js";

console.log(`d3.version: ${d3.version}`);


/** Exercise: D3 Fetch
 * Loads the data into the application
 */

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


/*** Exercise: Aggregations ***/

/**
 * This function groups the movies by Director and then by Genre.
 *
 * It uses the `d3.groups` function to create a nested array where the first level of nesting is by director and the second level is by genre.
 *
 * The result is then logged to the console.
 *
 * @returns {void}
 */
function Question1() {
	// Use d3.groups to group the data by director and then by genre
	let value = d3.groups(data, (d) => d.director, (d) => d.genre);

	// Log the grouped data
	console.group("Q1: Group the movies by Director and then by Genre.");
		console.log(value);
	console.groupEnd();
}

/**
 * This function groups the movies by release year and counts the number of movies for each year.
 *
 * It uses the `d3.rollup` function to create a Map where the keys are the release years and the values are the counts of movies for each year.
 *
 * The result is then logged to the console.
 *
 * @returns {void}
 */
function Question2() {
	// Use d3.rollup to group the data by release year and count the number of movies for each year
	let moviesPerYear = d3.rollup(data, (v) => v.length, (d) => d.releaseDate.getFullYear());

	// Log the grouped data
	console.group("Q2. Group the movies by Year and then Genre, and get the number of movies for each subset.");
		console.log(moviesPerYear);
	console.groupEnd();
}

/**
 * This function distributes the movie entries into 10 equally-sized categories based on budget values.
 *
 * It uses the `d3.bin()` function to create a bin generator, which is then applied to the data to generate the bins.
 *
 * Each bin is an array of data elements, with two additional properties: `x0` and `x1`, representing the lower and upper bounds of the bin (inclusive lower, exclusive upper).
 *
 * The result is then logged to the console.
 *
 * @returns {void}
 */
function Question3() {
	// Create a bin generator with the value accessor function set to the budget property of the data elements
	// and the number of thresholds (bins) set to 10
	let budgetBins = d3.bin().value(d => d.budget).thresholds(10)(data);

	// Log the bins
	console.group("Q3. Distribute the entries into 10 equally-sized categories based on budget values.");
		console.log(budgetBins);
	console.groupEnd();
}

/**
 * This function calculates the average profits by Director.
 *
 * It uses the `d3.flatRollup` function to create a flat Map where the keys are the directors and the values are the average profits of their movies.
 *
 * The `d3.mean` function is used to calculate the average profits.
 *
 * The result is then logged to the console.
 *
 * @returns {void}
 */
function Question4() {
	// Use d3.flatRollup to group the data by director and calculate the average profits for each director
	let avgProfits = d3.flatRollup(data, v => d3.mean(v, d => d.profits), d => d.director);

	// Log the average profits by director
	console.group("Q4. What are the average profits by Director?");
		console.log(avgProfits);
	console.groupEnd();
}

/**
 * This function calculates the total revenues by Genre.
 *
 * It uses the `d3.flatRollup` function to create a flat Map where the keys are the genres and the values are the total revenues of movies in each genre.
 *
 * The `d3.sum` function is used to calculate the total revenues.
 *
 * The result is then logged to the console.
 *
 * @returns {void}
 */
function Question5() {
	// Use d3.flatRollup to group the data by genre and calculate the total revenues for each genre
	let totalRevenues = d3.flatRollup(data, v => d3.sum(v, d => d.revenues), d => d.genre);

	// Log the total revenues by genre
	console.group('Q5. What are the total revenues by Genre?');
		console.log(totalRevenues);
	console.groupEnd();
}

/**
 * This function calculates the ratio of commercial success for each director.
 *
 * It first gets the set of directors and the number of movies by each director.
 *
 * It then calculates the number of successful movies by each director.
 *
 * The ratio of commercial success is calculated as the number of successful movies divided by the total number of movies for each director.
 *
 * The result is then logged to the console.
 *
 * @returns {void}
 */
function Question6() {
	// Get the set of directors
	let directors = new Set(data.map(d => d.director));

	// Get the number of movies by director
	let numMoviesByDirector = d3.rollup(data, v => v.length, d => d.director);

	// Get the number of successful movies by director
	let numSuccessByDirector = d3.rollup(data.filter(d => d.commercialSuccess), v => v.length, d => d.director);

	// Calculate the ratio of commercial success for each director
	let ratio = d3.map(directors, d => [d, numSuccessByDirector.get(d) / numMoviesByDirector.get(d)]);

	// Log the success rate by director
	console.group("Q6. Construct a new array, each entry with two values: the Director name and their ratio of commercial success (profitable / total number of movies)");
		console.log("Success Rate by Director:\n", ratio);
	console.groupEnd();
}

/**
 * This function finds any common entries in both the top 10 Comedy movies (by revenue)
 * and the top 10 movies directed by Professor Plum (by revenue).
 *
 * It first filters the data to include only Comedy movies or movies directed by Professor Plum,
 * sorts them by revenues in descending order, and then filters to get the top 10.
 *
 * It then uses `d3.intersection` to find the common entries between the two sets of top 10 movies.
 * The common movies are then logged to the console.
 *
 * @returns {void}
 */
function Question7() {
	// Define a comparator function to sort by descending order of revenues
	let revenues = (a, b) => d3.descending(a.revenues, b.revenues);

	// Define a filter function to filter out Top 10 values
	let top10 = (d, i) => i < 10;

	// Filter the data to include only Comedy movies, sort them by revenues in descending order, and then filter to get the top 10
	let top10Comedy = d3.sort(data.filter(d => d.genre === 'Comedy'), revenues).filter(top10);

	// Filter the data to include only movies directed by Professor Plum, sort them by revenues in descending order, and then filter to get the top 10
	let top10Plum = d3.sort(data.filter(d => d.director === "Professor Plum"), revenues).filter(top10);

	// Use d3.intersection to find the common entries between the top 10 Comedy movies and the top 10 movies directed by Professor Plum
	let commonMovies = Array.from(d3.intersection(top10Comedy, top10Plum));

	// Log the common movies
	console.group("Q7. Are there any common entries in both the top 10 Comedy (by revenue) and the top 10 directed by Professor Plum (by revenue)?");
		console.log("Common movies in Top 10 entries\n", commonMovies);
	console.groupEnd();
}

// Call the functions
Question1();
Question2();
Question3();
Question4();
Question5();
Question6();
Question7();

/* Exercise: Let's make a Histogram */
let histogram1 = new Histogram("div#histogram1", 800, 400, [10, 40, 60, 25]);
let profits = data.map(d => d.profits);
histogram1.setLabels("Profits", "Frequencies").render(profits, 20);
