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

let outputElement = document.getElementById("output");

// If data is loaded, print success message
if (data) {
	console.info("Data loaded successfully");
	console.groupCollapsed("View loaded data here ↓")
	console.log(data); // Print the data to the console
	console.groupEnd();
	outputElement.innerText = "Data loaded successfully";
} else { // If data is not loaded, print error message
	console.warn("Error loading data");
}


/*** Exercise: Basic Transformations ***/

// Q1. What are the unique genres of movies?
function Question1() {
	let genres = data.map((d) => d.genre);
	let uniqueGenres = new Set(genres);
	uniqueGenres = [...uniqueGenres];

	console.group("Q1. What are the unique genres of movies?")
	console.log(uniqueGenres);
	console.groupEnd();
	outputElement.innerText += `\n\nUnique Genres of Movies: \n${uniqueGenres.join(", ")}`;
}

function Question2() {
	let directors = data.map((d) => d.director);
	let uniqueDirectors = new Set(directors);
	let uniqueDirectorsCount = [...uniqueDirectors].length;

	console.group("Q2. How many unique directors are there?")
	console.log(uniqueDirectorsCount);
	console.groupEnd();
	outputElement.innerText += `\n\nNo. of Unique Directors: ${uniqueDirectorsCount}`;
}

function Question3() {
	let totalRevenue = data.reduce((acc, d) => acc + d.revenues, 0);

	console.group("Q3. What is the total revenue of all movies?")
	console.log(`$${totalRevenue.toLocaleString()}`);
	console.groupEnd();
	outputElement.innerText += `\n\nTotal Revenue: $${totalRevenue.toLocaleString()}`;
}

function Question4(year1, year2) {
	let releasedMoviesCount = data.filter((d) => d.releaseDate.getFullYear() >= year1 && d.releaseDate.getFullYear() <= year2).length;

	console.group("Q4. How many movies were released between 2012 and 2014 (included) ?")
	console.log(releasedMoviesCount);
	console.groupEnd();
	outputElement.innerText += `\n\nNo. of Movies released between ${year1} and ${year2}: ${releasedMoviesCount}`;
}

function Question5(rating, genre) {
	// let averageMovieRating = getAverageGenreRating(data, rating, genre);
	let genreMovies = data.filter((d) => d.genre === genre);
	let ratings = genreMovies.map((d) => d[rating]);
	let averageMovieRating = ratings.reduce((acc, d) => acc + d, 0) / ratings.length;

	console.group("Q5. What is the average rating on website A for comedy movies?")
	console.log(`${averageMovieRating.toFixed(2)} / 10`);
	console.groupEnd();
	outputElement.innerText += `\n\nAverage Rating on Website A for ${genre} is: ${averageMovieRating.toFixed(2)} / 10`;
}

function Question6(year) {
	// Filter the data to only include movies released on or before the given year
	let moviesBeforeYear = data.filter((d) => d.releaseDate.getFullYear() <= year);
	// Calculate the total profit for movies released on or before the given year
	let profitBeforeYear1 = moviesBeforeYear.reduce((acc, d) => acc + d.profits, 0);

	// Filter the data to only include movies released after the given year
	let moviesAfterYear = data.filter((d) => d.releaseDate.getFullYear() > year);
	// Calculate the total profit for movies released after the given year
	let profitAfterYear1 = moviesAfterYear.reduce((acc, d) => acc + d.profits, 0);

	let beforeOrAfterYear = profitBeforeYear1 > profitAfterYear1 ? "Before" : "After";

	console.group(`Q6. Has the industry made more profit before ${year} (included) or after?`)
	console.log(beforeOrAfterYear);
	console.groupEnd();
	outputElement.innerText += `\n\nIndustry made more profit before ${year} (included) or After?\n${beforeOrAfterYear}`;
}

function Question7(genre, minRating, ratingSource) {
	// Filter the data to only include movies of the specified genre
	let genreMovies = data.filter((d) => d.genre === genre);

	// Filter the genreMovies array to only include movies with a rating above the specified value from the specified rating source
	let ratingMovies = genreMovies.filter((d) => d[ratingSource] > minRating);

	// Map the ratingMovies array to an array of budgets
	let budgets = ratingMovies.map((d) => d.budget);

	// Calculate the average budget
	let averageBudget = budgets.reduce((acc, d) => acc + d, 0) / budgets.length;

	console.group(`Q7. What’s the average budget of ${genre} movies with a rating above ${minRating}% on Website C?`)
	console.log(`$${Number(averageBudget).toLocaleString()}`);
	console.groupEnd();
	outputElement.innerText += `\n\nAverage budget of ${genre} movies with a rating above ${minRating}% on Website C: $${Number(averageBudget).toLocaleString()}`;
}


// Call the functions
Question1()
Question2()
Question3()
Question4(2012, 2014)
Question5("ratings_A", "Comedy")
Question6(2015)
Question7("Drama", 70, "ratings_C")
