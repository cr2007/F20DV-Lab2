
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
![25%](https://progress-bar.dev/25)

- [X] [Loading Data](#exercise-loading-data)
- [ ] [Basic Transformations](#exercise-basic-transformations)
- [ ] [Aggretions](#exercise-aggregations)
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

The Console output is also displayed in the HTML page within a `<div>`.

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
		releaseDate: new Date(+d.release_year, d.release_month, 1).toLocaleDateString(),
		genre: d.genre,
		director: d.director,
		budget: +d.budget,
		revenues: +d.revenues,
		ratings: [+d.ratings_A, +d.ratings_B, +d.ratings_C],
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

_Insert answer here_

> How many unique directors are there?

_Insert answer here_

> What’s the total sum of revenue in the industry?

_Insert answer here_

> How many movies were released between 2012 and 2014 (included)?

_Insert answer here_

> What is the average rating on website A for comedy movies?

_Insert answer here_

> Has the industry made more profit before 2015 (included) or after?

_Insert answer here_

> What’s the average budget of drama movies with a rating above 70% on website C?


_Insert answer here_

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
