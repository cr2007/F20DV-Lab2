"use strict";

import BarChart from "./barChart_Tut3.js";
import BubbleChart from "./bubbleChart_tut3.js";
import ScatterPlot from "./scatterPlot.js";

console.log(`d3.version: ${d3.version}`);

let cities = [
	{ city: "Edinburgh", pop: 506000, area: 119, alt: 47 },
	{ city: "Dubai", pop: 3604000, area: 1610, alt: 5 },
	{ city: "Putrajaya", pop: 109000, area: 49, alt: 38 },
	{ city: "Qingdao", pop: 10071000, area: 11228, alt: 25 },
	{ city: "Lagos", pop: 8048000, area: 1171, alt: 41 },
	{ city: "Ottawa", pop: 1017000, area: 2790, alt: 70 },
];

/***** Bar Chart *****/
/* let bar1 = new BarChart("div#bar1", 700, 400, [10, 40, 45, 20]);

// This line transforms the cities dataset in the generic format
// that BarChart expects: [[k,v], ...]
// we will explain it further in the next lab

let citiesElevation = cities.map((d) => [d.city, d.alt]);
bar1.render(citiesElevation); */

/***** Bubble Chart *****/
/* let bubble1 = new BubbleChart("div#bubble1", 600, 400, [10, 40, 45, 20]);
let citiesArea = cities.map((d) => [d.city, d.alt]);
bubble1.render(citiesArea); */


/***** Scatter Plot *****/
/* let scatter1 = new ScatterPlot("div#scatter1", 600, 400, [10, 50, 45, 20]);
let citiesPop = cities.map((d) => [d.pop, d.area]);
scatter1.render(citiesPop); */

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

function Question1() {
	let value = d3.groups(data, (d) => d.director, (d) => d.genre);

	console.group("Q1: Group the movies by Director and then by Genre.");
		console.log(value);
	console.groupEnd();
}

function Question2() {
	// Get the number of movies within each subset
	let moviesPerYear = d3.rollup(data, (v) => v.length, (d) => d.releaseDate.getFullYear());

	console.group("Q2. Group the movies by Year and then Genre, and get the number of movies for each subset.");
		console.log(moviesPerYear);
	console.groupEnd();
}

function Question3() {
	let budgetBins = d3.bin().value(d=>d.budget).thresholds(10)(data);

	console.group("Q3. Distribute the entries into 10 equally-sized categories based on budget values.");
		console.log(budgetBins);
	console.groupEnd();
}

function Question4() {
	// Average Profits by Director
	let avgProfits = d3.flatRollup(data, v => d3.mean(v, d => d.profits), d => d.director);

	console.group("Q4. What are the average profits by Director?");
		console.log(avgProfits);
	console.groupEnd();
}

function Question5() {
	// Total Revenues by Genre
	let totalRevenues = d3.flatRollup(data, v => d3.sum(v, d => d.revenues), d => d.genre);

	console.group('Q5. What are the total revenues by Genre?');
		console.log(totalRevenues);
	console.groupEnd();
}

function Question6() {
	// Get the set of directors
	let directors = new Set(data.map(d => d.director));

	// Get the number of movies by director
	let numMoviesByDirector = d3.rollup(data, v => v.length, d => d.director);

	// Get the number of successful movies by director
	let numSuccessByDirector = d3.rollup(data.filter(d => d.commercialSuccess), v => v.length, d => d.director);

	let ratio = d3.map(directors, d => [d, numSuccessByDirector.get(d) / numMoviesByDirector.get(d)]);

	console.group("Q6. Construct a new array, each entry with two values: the Director name and their ratio of commercial success (profitable / total number of movies)");
		console.log(ratio);
	console.groupEnd();
}

// Call the functions
Question1();
Question2();
Question3();
Question4();
Question5();
Question6();
