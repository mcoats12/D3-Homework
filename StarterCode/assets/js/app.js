// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv")
  .then(function(healthData) {

  // Parse Data/Cast as numbers
  // ==============================
  healthData.forEach(function(data) {
    data.income = +data.income;
    data.smokes = +data.smokes;
  });

  // Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([35000, d3.max(healthData, d => d.income)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([5, d3.max(healthData, d => d.smokes)+3])
    .range([height, 0]);

  // Create axis functions
  // ==============================
  var xAxis = d3.axisBottom(xLinearScale);
  var yAxis = d3.axisLeft(yLinearScale)

  // Create Circles
  // ==============================
  chartGroup.selectAll("circle")
      .data(healthData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.income))
      .attr("cy", d => yLinearScale(d.smokes))
      .attr("r", "15")
      .attr("class", "stateCircle")

// Add Labels
// ==============================
  chartGroup.selectAll("text")
    .data(healthData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.income))
    .attr("y", d => yLinearScale(d.smokes))
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
    .attr("class","stateText")

  // Append Axes to the chart
  // ==============================
  chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

  chartGroup.append("g")
      .call(yAxis);

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("% of Population who Smoke");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Medium Income");
});
