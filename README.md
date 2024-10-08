
# F20DV Lab 2

<table>
	<tr>
		<td><b><a href="https://cr2007.github.io/F20DV-Lab1">← Lab 1</a></b></td>
		<td><b>Lab 2</b></td>
		<td><b><a href="https://cr2007.github.io/F20DV-Lab3">Lab 3 →</a></b></td>
	</tr>
</table>


[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/cr2007/F20DV-Lab2)

<div align="center">
	<table>
		<tr>
			<td><b><a href="lab2_tutorial5.html">Tutorial 5</a></b></td>
			<td><b><a href="lab2_tutorial6.html">Tutorial 6</a></b></td>
			<td><b><a href="lab2_tutorial7.html">Tutorial 7</a></b></td>
			<td><b><a href="lab2_tutorial8.html">Tutorial 8</a></b></td>
		</tr>
	</table>
</div>


## Data Transformations

- **Name:** Chandrashekhar Ramaprasad ([cr2007](mailto:cr2007@hw.ac.uk))
- **Course:** Data Visualization and Analytics ([**F20DV**](https://curriculum.hw.ac.uk/coursedetails/F20DV?termcode=202324))

---

#### Progress
![100%](https://progress-bar.dev/100)

- [X] [Loading Data](#exercise-loading-data)
- [X] [Basic Transformations](#exercise-basic-transformations)
- [X] [Aggregations](#exercise-aggregations)
- [X] [Let's Make a Histogram](#exercise-lets-make-a-histogram)
- [X] [Formatting Data](#exercise-lets-make-a-histogram)

---

## Tutorial 5: D3 Fetch

[Lab 2 - Tutorial 5](https://cr2007.github.io/F20DV-Lab2/lab2_tutorial5.html)

#### Exercise: Loading Data

> How many records are there in the dataset?

There are 1000 records in the dataset

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

[Lab 2 - Tutorial 6](https://cr2007.github.io/F20DV-Lab2/lab2_tutorial6.html)

#### Exercise: Basic Transformations

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

Answered the following questions using D3 methods.

The answer to most questions can be found in the [Tutorial 7 web page](https://cr2007.github.io/F20DV-Lab2/lab2_tutorial7.html).

> Group the movies by Director and then by Genre.
>
> Group the movies by Year and then Genre, and get the number of movies for each subset.
>
> Distribute the entries into 10 equally-sized categories based on budget values.
>
> What are the average profits by Director?
>
> What are the total revenues by Genre?
>
> Construct a new array, each entry with two values: the Director name and their ratio of commercial success (profitable / total number of movies)
>
> Are there any common entries in both the top 10 Comedy (by revenue) and the top 10 directed by Professor Plum (by revenue)?


#### Exercise: Let's Make a Histogram

Created a Histogram class (using the BarChart class as a starting point).

Rendered the class using the dataset provided

### Code
<details>
<summary><code>main.js</code></summary>
<pre><code class="language-javascript">"use strict";

// Code from past tutorials (loading data)

/* Aggregations Exercise */

function Question1() {
    // Use d3.groups to group the data by director and then by genre
    let value = d3.groups(data, (d) => d.director, (d) => d.genre);

    // Log the grouped data
    console.group("Q1: Group the movies by Director and then by Genre.");
        console.log(value);
    console.groupEnd();
}

function Question2() {
    // Use d3.rollup to group the data by release year and genre, and count the number of movies for each subset
    let moviesPerYear = d3.rollup(data, (v) => v.length, (d) => d.releaseDate.getFullYear(), (d) => d.genre);

    // Log the grouped data
    console.group("Q2. Group the movies by Year and then Genre, and get the number of movies for each subset.");
        console.log(moviesPerYear);
    console.groupEnd();
}

function Question3() {
    // Create a bin generator with the value accessor function set to the budget property of the data elements
    // and the number of thresholds (bins) set to 10
    let budgetBins = d3.bin().value(d => d.budget).thresholds(10)(data);

    // Log the bins
    console.group("Q3. Distribute the entries into 10 equally-sized categories based on budget values.");
        console.log(budgetBins);
    console.groupEnd();
}

function Question4() {
    // Use d3.flatRollup to group the data by director and calculate the average profits for each director
    let avgProfits = d3.flatRollup(data, v => d3.mean(v, d => d.profits), d => d.director);

    // Log the average profits by director
    console.group("Q4. What are the average profits by Director?");
        console.log(avgProfits);
    console.groupEnd();
}

function Question5() {
    // Use d3.flatRollup to group the data by genre and calculate the total revenues for each genre
    let totalRevenues = d3.flatRollup(data, v => d3.sum(v, d => d.revenues), d => d.genre);

    // Log the total revenues by genre
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

    // Calculate the ratio of commercial success for each director
    let ratio = d3.map(directors, d => [d, numSuccessByDirector.get(d) / numMoviesByDirector.get(d)]);

    // Log the success rate by director
    console.group("Q6. Construct a new array, each entry with two values: the Director name and their ratio of commercial success (profitable / total number of movies)");
        console.log("Success Rate by Director:\n", ratio);
    console.groupEnd();
}

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

/* Histogram Code */
let histogram1 = new Histogram("div#histogram1", 800, 500, [10, 40, 60, 25]);
let profits = data.map(d => d.profits);
histogram1.setLabels("Profits", "Frequencies").render(profits, 20);
</code></pre>
</details>

<details>
<summary><code>histogram.js</code></summary>
<pre><code class="language-javascript">export default class Histogram {
    // Attributes (you can make those private too)
    width; height; margin;    // Size
    svg; chart; bars;         // Selections
    axisX; axisY;             // Axes
    labelX; labelY;           // Labels
    scaleX; scaleY;           // Scales
    data;                     // Internal Data

    /*
    - container: DOM selector
    - width: visualization width
    - height: visualization heigh
    - margin: chart area margins [top, bottom, left, right]
    */
    constructor(container, width, height, margin) {
        this.width  = width;
        this.height = height;
        this.margin = margin;

        this.svg = d3.select(container).append("svg")
            .classed("histogram", true)
            .attr("width", this.width).attr("height", this.height);

        this.chart = this.svg.append("g")
            .attr("transform", `translate(${this.margin[2]}, ${this.margin[0]})`);

        this.bars = this.chart.selectAll("rect.bar");

        // Axes
        this.axisX = this.svg.append("g")
            .attr("transform", `translate(${this.margin[2]}, ${this.height - this.margin[1]})`);
        this.axisY = this.svg.append("g")
            .attr("transform", `translate(${this.margin[2]}, ${this.margin[0]})`);

        // Labels
        this.labelX = this.svg.append("text").classed("legend", true)
            .attr("transform", `translate(${this.width / 2}, ${this.height})`)
            .style("text-anchor", "middle").attr("dy", -5);

        this.labelY = this.svg.append("text").classed("legend", true)
            .attr("transform", `translate(0, ${this.margin[0]})rotate(-90)`)
            .style("text-anchor", "end").attr("dy", 15);
    }

    #updateScales() {
        let chartWidth  = this.width  - this.margin[2] - this.margin[3],
            chartHeight = this.height - this.margin[0] - this.margin[1];

        let rangeX = [0, chartWidth],
            rangeY = [chartHeight, 0];

        let domainX = [d3.min(this.data, d => d[1]), d3.max(this.data, d => d[2])],
            domainY = [0, d3.max(this.data, (d) => d[0])];

        this.scaleX = d3.scaleLinear(domainX, rangeX);
        this.scaleY = d3.scaleLinear(domainY, rangeY).nice();
    }

    #updateAxes() {
        let axisGenX = d3.axisBottom(this.scaleX),
            axisGenY = d3.axisLeft(this.scaleY).tickFormat(d3.format(".0%"));

        this.axisX.call(axisGenX);
        this.axisY.call(axisGenY);
    }

    // Private methods
    // data is in the format [[key, value], ...]
    #updateBars() {
        this.bars = this.bars
            .data(this.data, (d) => d[0])
            .join("rect")
            .classed("bar", true)
            .attr("x", (d) => this.scaleX(d[1]) + 0.5)
            .attr("y", (d) => this.scaleY(d[0]))
            .attr("width", d => this.scaleX(d[2]) - this.scaleX(d[1]) - 1)
            .attr("height", (d) => this.scaleY(0) - this.scaleY(d[0]));
    }

    // Public API

    // The dataset parameter needs to be in a generic format,
    // so that it works for all future data
    // here we assume a [[k, v], ...] format for efficiency
    render(dataset, thresholds = 10) {
        // bin generator
        let binGen = d3.bin().thresholds(thresholds);

        // generate data: [[ratio, bin_lower, bin_uppper], ...]
        this.data = binGen(dataset).map((d) => [d.length / dataset.length, d.x0, d.x1]);
        this.#updateScales();
        this.#updateBars();
        this.#updateAxes();
        return this; // to allow chaining
    }

    setLabels(labelX = "values", labelY = "frequencies") {
        this.labelX.text(labelX);
        this.labelY.text(labelY);
        return this; // to allow chaining
    }
}
</code></pre>
</details>

<details>
<summary><code>histogram.css</code></summary>
<pre><code class="language-css">svg.histogram {
    fill: #3F94D3;
    stroke: #003C71;
    stroke-width: 2px;
    border: #FBFAF2 1px solid;
}

text {
    font-family: sans-serif;
    font-size: 12px;
    fill: #121212;
    stroke: none;
}

@media (prefers-color-scheme: dark) {
    svg.histogram {
        fill: #52AEFF;
        stroke: #FBFAF2;
        stroke-width: 0.5px;
    }

    svg.histogram text {
        fill: #FBFAF2;
    }
}
</code></pre>
</details>

---
<div align="right">
	<a href="#progress">Back To Top ↥</a>
</div>

## Tutorial 8: D3 Formats

[Lab 2 - Tutorial 8](https://cr2007.github.io/F20DV-Lab2/lab2_tutorial8.html)

#### Exercise: Formatting Data

Reshaped the movie dataset using the JavaScript data transformations, D3 scales, D3 aggregations, and D3 formats.

Displayed the following output in a console output designed in the HTML page.

### Code
<details>
<summary><code>main.js</code></summary>
<pre><code class="language-javascript">"use strict";

// Code from past tutorials (loading data)

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
</code></pre>
</details>

---
<div align="right">
	<a href="#progress">Back To Top ↥</a>
</div>
