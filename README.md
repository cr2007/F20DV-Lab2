
# F20DV Lab 2

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/cr2007/F20DV-Lab2)

<div align="center">
	<table>
		<tr>
			<td><b><a href="lab2_tutorial5.html">Tutorial 5</a></b></td>
			<td><b><a href="lab2_tutorial6.html">Tutorial 6</a></b></td>
			<td><b><a href="lab2_tutorial7.html">Tutorial 7</a></b></td>
		</tr>
	</table>
</div>


## Introduction to D3

- **Name:** Chandrashekhar Ramaprasad ([cr2007](mailto:cr2007@hw.ac.uk))
- **Course:** Data Visualization and Analytics ([**F20DV**](https://curriculum.hw.ac.uk/coursedetails/F20DV?termcode=202324))

---

#### Progress
![57%](https://progress-bar.dev/57)

- [X] [Loading Data](#exercise-loading-data)
- [X] [Basic Transformations](#exercise-basic-transformations)
- [ ] [Aggregations](#exercise-aggregations)
- [ ] [Let's Make a Histogram](#exercise-lets-make-a-histogram)

---

## Tutorial 5: D3 Fetch

#### Exercise: Loading Data

[Lab 2 - Tutorial 5](https://cr2007.github.io/F20DV-Lab2/lab2_tutorial5.html)

> How many records are there in the dataset?

There are 1001 records in the dataset

> In what format is the dataset structured, inside the application?

The dataset is structured as an **array of objects**.<br>
Each object represents a row in the CSV file.

<br>

The Console output is also displayed in the HTML page within a `<div>`.

Two extra attributes have been added: **`profits`** and **`commercialSuccess`** as part of the exercise

### Code

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

<script>hljs.highlightAll();</script>

<details>
<summary><code>main.js</code></summary>
<pre><code class="language-javascript">"use strict";

// ... (Previous Code from Lab 1)

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

console.log(data); // Print the data to the console
</code></pre>
</details>

---
<div align="right">
	<a href="#progress">Back To Top ↥</a>
</div>

## Tutorial 6: JS Data Structures and Operations

#### Exercise: Basic Transformations

[Lab 2 - Tutorial 6](https://cr2007.github.io/F20DV-Lab2/lab2_tutorial6.html)

> What are the unique genres of movie?

Drama, Crime, Action, Fantasy, Comedy, Thriller, Adventure, Animation, Horror, Mystery

> How many unique directors are there?

12

> What’s the total sum of revenue in the industry?

$101,381,590.19

> How many movies were released between 2012 and 2014 (included)?

**284** movies

> What is the average rating on website A for comedy movies?

4.98 / 10

> Has the industry made more profit before 2015 (included) or after?

Before

> What’s the average budget of drama movies with a rating above 70% on website C?

$82,706.66

### Code

<details>
<summary><code>main.js</code></summary>
<pre><code class="language-javascript">"use strict";

// ... (Previous Code from Tutorial 6)

/**
 * This function returns an array of unique genres from the provided data.
 *
 * @param {Array} data - The data array containing movie objects.
 * @returns {Array} An array of unique genres.
 */
function getUniqueGenres(data) {
	let genres = data.map((d) => d.genre);

	let uniqueGenres = new Set(genres);

	return [...uniqueGenres];
}


/**
 * This function returns the count of unique directors from the provided data.
 *
 * @param {Array} data - The data array containing movie objects.
 * @returns {number} The count of unique directors.
 */
function countUniqueDirectors(data) {
	let directors = data.map((d) => d.director);

	let uniqueDirectors = new Set(directors);

	return [...uniqueDirectors].length;
}


/**
 * Calculates the total revenue from an array of data.
 *
 * @param {Array} data - The data array containing movie objects.
 * @returns {number} The total revenue.
 */
function sumRevenue(data) {
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
	let genreMovies = data.filter((d) => d.genre === genre);

	let ratings = genreMovies.map((d) => d[rating]);

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

</code></pre>
</details>

---
<div align="right">
	<a href="#progress">Back To Top ↥</a>
</div>

## Tutorial 7: D3 Array

[Lab 2 - Tutorial 7](https://cr2007.github.io/F20DV-Lab2/lab2_tutorial7.html)

#### Exercise: Aggregations



#### Exercise: Let's Make a Histogram


### Code
<details>
<summary><code>main.js</code></summary>
<pre><code class="language-javascript">
</code></pre>
</details>

---
<div align="right">
	<a href="#progress">Back To Top ↥</a>
</div>
