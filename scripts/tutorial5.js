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

let data = await d3.csv("data/movies_mock.csv", (d) => {
	// for each row d, return a new object
	return {
		year: new Date(+d.year, 0, 1), // convert "Year" column to Date
		make: d.Make
	}
})

console.log(data);
