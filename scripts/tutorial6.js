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

/**
 * This function returns an array of unique genres from the provided data.
 *
 * @param {Array} data - The data array containing movie objects.
 * @returns {Array} An array of unique genres.
 */
function getUniqueGenres(data) {
	// Map the data array to an array of genres
	// The map method creates a new array with the results of calling a provided function on every element in the array
	// In this case, the provided function returns the genre of each movie
	let genres = data.map((d) => d.genre);

	// Create a new Set from the genres array
	// A Set is a built-in JavaScript object that only allows unique values
	// When a new Set is created from an array, any duplicate values in the array are automatically removed
	let uniqueGenres = new Set(genres);

	// Convert the Set back to an array using the spread operator (...)
	// The spread operator (...) allows an iterable (like a Set or an array) to be expanded in places where zero or more arguments or elements are expected
	// The result is an array of unique genres
	return [...uniqueGenres];
}


/**
 * This function returns the count of unique directors from the provided data.
 *
 * @param {Array} data - The data array containing movie objects.
 * @returns {number} The count of unique directors.
 */
function countUniqueDirectors(data) {
	// Map the data array to an array of directors
	// The map method creates a new array with the results of calling a provided function on every element in the array
	// In this case, the provided function returns the director of each movie
	let directors = data.map((d) => d.director);

	// Create a new Set from the directors array
	// A Set is a built-in JavaScript object that only allows unique values
	// When a new Set is created from an array, any duplicate values in the array are automatically removed
	let uniqueDirectors = new Set(directors);

	// Convert the Set back to an array using the spread operator (...)
	// Then get the length of the array, which is the number of unique directors
	// The spread operator (...) allows an iterable (like a Set or an array) to be expanded in places where zero or more arguments or elements are expected
	return [...uniqueDirectors].length;
}


/**
 * Calculates the total revenue from an array of data.
 *
 * @param {Array} data - The data array containing movie objects.
 * @returns {number} The total revenue.
 */
function sumRevenue(data) {
	// Use the reduce method to sum up the revenues of all movies
	// The reduce method takes a callback function and an initial value
	// The callback function takes an accumulator and the current item
	// The function adds the current item's revenue to the accumulator
	// The initial value of the accumulator is 0
	return data.reduce((acc, d) => acc + d.revenues, 0);
}


/**
 * Calculates the number of movies released between two years.
 *
 * @param {Array} data - The data array containing movie objects.
 * @param {number} [year1=2012] - The start year (inclusive).
 * @param {number} [year2=2014] - The end year (inclusive).
 * @returns {number} The number of movies released between year1 and year2.
 */
function numberOfMoviesReleased(data, year1=2012, year2=2014) {
	// Filter the data to only include movies released between year1 and year2
	// The getFullYear method is used to get the release year of each movie
	// The length property of the resulting array gives the number of movies
	return data.filter((d) => d.releaseDate.getFullYear() >= year1 && d.releaseDate.getFullYear() <= year2).length;
}


/**
 * Calculates the average rating for a given genre from a specific rating website.
 *
 * @param {Array} data - The data array containing movie objects.
 * @param {Array} [rating=data.ratings_A] - The rating value from a specific website.
 * @param {string} [genre="Comedy"] - The genre of the movies.
 * @returns {number} The average rating for the given genre.
 */
function getAverageGenreRating(data, rating="ratings_A", genre="Comedy") {
	// Filter the data to only include movies of the specified genre
	let genreMovies = data.filter((d) => d.genre === genre);

	// Map the genreMovies array to an array of ratings
	let ratings = genreMovies.map((d) => d[rating]);

	// Calculate and return the average rating
	return ratings.reduce((acc, d) => acc + d, 0) / ratings.length;
}


/**
 * Checks if the movie industry made more profit before or after a given year.
 *
 * @param {Array} data - The data array containing movie objects.
 * @param {number} [year=2015] - The year to compare profits before and after.
 * @returns {string} "Before" if the industry made more profit before the given year, "After" otherwise.
 */
function industryMoreProfit(data, year=2015) {
	// Filter the data to only include movies released on or before the given year
	let moviesBeforeYear = data.filter((d) => d.releaseDate.getFullYear() <= year);
	// Calculate the total profit for movies released on or before the given year
	let profitBeforeYear1 = moviesBeforeYear.reduce((acc, d) => acc + d.profits, 0);

	// Filter the data to only include movies released after the given year
	let moviesAfterYear = data.filter((d) => d.releaseDate.getFullYear() > year);
	// Calculate the total profit for movies released after the given year
	let profitAfterYear1 = moviesAfterYear.reduce((acc, d) => acc + d.profits, 0);

	// Return "Before" if the profit before the given year is greater than the profit after, "After" otherwise
	return profitBeforeYear1 > profitAfterYear1 ? "Before" : "After";
}


/**
 * Calculates the average budget for movies of a given genre with a rating above a given value from a specific rating source.
 *
 * @param {Array} data - The data array containing movie objects.
 * @param {string} genre - The genre of the movies.
 * @param {number} minRating - The minimum rating.
 * @param {string} ratingSource - The source of the rating.
 * @returns {number} The average budget for movies of the given genre with a rating above the given value from the specified rating source.
 */
function calculateAverageBudget(data, genre="Drama", minRating=70, ratingSource="ratings_C") {
	// Filter the data to only include movies of the specified genre
	let genreMovies = data.filter((d) => d.genre === genre);

	// Filter the genreMovies array to only include movies with a rating above the specified value from the specified rating source
	let ratingMovies = genreMovies.filter((d) => d[ratingSource] > minRating);

	// Map the ratingMovies array to an array of budgets
	let budgets = ratingMovies.map((d) => d.budget);

	// Calculate and return the average budget
	return budgets.reduce((acc, d) => acc + d, 0) / budgets.length;
}

/* Main Functions */

// Q1. What are the unique genres of movies?
function Question1() {
	let uniqueGenres = getUniqueGenres(data);
	console.group("Q1. What are the unique genres of movies?")
	console.log(uniqueGenres);
	console.groupEnd();
	outputElement.innerText += `\n\nUnique Genres of Movies: \n${uniqueGenres.join(", ")}`;
}

function Question2() {
	let uniqueDirectorsCount = countUniqueDirectors(data);
	console.group("Q2. How many unique directors are there?")
	console.log(uniqueDirectorsCount);
	console.groupEnd();
	outputElement.innerText += `\n\nNo. of Unique Directors: ${uniqueDirectorsCount}`;
}

function Question3() {
	let totalRevenue = sumRevenue(data);
	console.group("Q3. What is the total revenue of all movies?")
	console.log(`$${totalRevenue.toLocaleString()}`);
	console.groupEnd();
	outputElement.innerText += `\n\nTotal Revenue: $${totalRevenue.toLocaleString()}`;
}

function Question4(year1, year2) {
	let releasedMoviesCount = numberOfMoviesReleased(data, year1, year2);
	console.group("Q4. How many movies were released between 2012 and 2014 (included) ?")
	console.log(releasedMoviesCount);
	console.groupEnd();
	outputElement.innerText += `\n\nNo. of Movies released between ${year1} and ${year2}: ${releasedMoviesCount}`;
}

function Question5(rating, genre) {
	let averageMovieRating = getAverageGenreRating(data, rating, genre);
	console.group("Q5. What is the average rating on website A for comedy movies?")
	console.log(`${averageMovieRating.toFixed(2)} / 10`);
	console.groupEnd();
	outputElement.innerText += `\n\nAverage Rating on Website A for ${genre} is: ${averageMovieRating.toFixed(2)} / 10`;
}

function Question6(year) {
	let beforeOrAfterYear = industryMoreProfit(data, year);
	console.group(`Q6. Has the industry made more profit before ${year} (included) or after?`)
	console.log(beforeOrAfterYear);
	console.groupEnd();
	outputElement.innerText += `\n\nIndustry made more profit before ${year} (included) or After?\n${beforeOrAfterYear}`;
}

function Question7(genre, minRating, ratingSource) {
	let averageBudget = calculateAverageBudget(data, genre, minRating, ratingSource).toFixed(2);
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
