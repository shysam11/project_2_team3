function initIndex() {
  console.log('initIndex');
 // Grab a reference to the dropdown select element
 buildTeams("teams");
 buildSeasons("seasons");
}

function getTeamStats() {
  // Get the input value for team and season
  var team = document.getElementById("teams").value
  var season = document.getElementById("seasons").value

  // get the stats of team from season
  d3.json("/teamStats/"+ team + "/" + season).then((teamStats) => {
  	console.log(teamStats)
  // add a variable to connect to the html div in index.html
  var bodyContent = document.getElementById("bodyContent")
  bodyContent.innerHTML=""
  bodyContent.innerHTML+="<img class=\"team_logo\" src=\"" + getTeamImage('/static/Images/', team) + "\" alt=\"" + team + "\">"
  // check if the returned data is equal to nulls
  if (Object.keys(teamStats).length==0){
    bodyContent.innerHTML+="<p>No data was found for " + team + " season " + season + "</p>"
  }
    else{

    var totChart = {
      "chartTitle": "Total Win Loss Record for " + teamStats.Season_start + " - " + teamStats.Season_end,
      "chartLabels": ["Total Wins", "Total Losses", "Games Played", "Points Earned"],
      "chartData": [teamStats.W, teamStats.L, teamStats.GP, teamStats.PTS],
      "chartText": "Totals",
      "chartColor": ["#722349", "#e63f0b","#3c5e3a", "#098aaa"]
    }
    var goalChart = {
      "chartTitle": "Goalie Record for " + + teamStats.Season_start + " - " + teamStats.Season_end,
      "chartLabels": ["Goals For", "Goals Against"],
      "chartData": [teamStats.GF, teamStats.GA],
      "chartText": "Goalie Stats",
      "chartColor": ["#722349", "#e63f0b"]
    }
    var shootingChart = {
      "chartTitle": "Shooting Record for " + teamStats.Season_start + " - " + teamStats.Season_end,
      "chartLabels": ["Shots on Goal", "Goals For", "Shots Against", "Goals Against"],
      "chartData": [teamStats.S, teamStats.GF, teamStats.SA, teamStats.GA],
      "chartText": "Shooting Stats",
      "chartColor": ["#722349", "#e63f0b","#3c5e3a", "#098aaa"]
    }
    var powerPlayChart = {
      "chartTitle": "Power Plays Comparison for " + teamStats.Season_start + " - " + teamStats.Season_end,
      "chartLabels": [teamStats.teamName, "Opponents"],
      "chartData": [teamStats.PP,teamStats.PPO,teamStats.oPIM_G,teamStats.PPA,teamStats.PPOA,teamStats.PIM_G],
      "chartText": "Power Play Stats",
      "chartColor": ["#722349", "#e63f0b","#3c5e3a", "#098aaa"]
      // "chartTitle": "Shooting Record for " + teamStats.Season_start + " - " + teamStats.Season_end,
      // "chartLabels": ["Shots on Goal", "Goals For", "Shots Against", "Goals Against"],
      // "chartData": [teamStats.S, teamStats.GF, teamStats.SA, teamStats.GA],
      // "chartText": "Shooting Stats",
      // "chartColor": ["#722349", "#e63f0b","#3c5e3a", "#098aaa"]
    }
    drawBarChart(totChart, "bodyContent", "chartTot")
    drawDoughnut(goalChart, "bodyContent", "chartGoalie")
    drawHorzBar(shootingChart, "bodyContent", "chartShooting")
    drawBubble(powerPlayChart,"bodyContent", "chartPwrPlay")
    }
  });
  // render stats
}
function drawBarChart(chartData, containerID, chartID){
  // append the canvas to the container to draw the chart
  $("#"+containerID).append("<canvas id=\"" + chartID +"\"></canvas>")
  var ctx = document.getElementById(chartID).getContext('2d');
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: chartData.chartLabels,
          datasets: [{
              label: chartData.chartTitle,
              data: chartData.chartData,
              backgroundColor: chartData.chartColor,
              borderColor: chartData.chartColor,
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}
function drawDoughnut(chartData, containerID, chartID){
  // append the canvas to the container to draw the chart
  $("#"+containerID).append("<canvas id=\"" + chartID +"\"></canvas>")
  var ctx = document.getElementById(chartID).getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: chartData.chartLabels,
      datasets: [
        {
          label: chartData.chartTitle,
          backgroundColor: chartData.chartColor,
          data: chartData.chartData
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: chartData.chartTitle
      }
    }
});
}
function drawHorzBar(chartData, containerID, chartID){
  // append the canvas to the container to draw the chart
  $("#"+containerID).append("<canvas id=\"" + chartID +"\"></canvas>")
  var ctx = document.getElementById(chartID).getContext('2d');
  new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: chartData.chartLabels,
      datasets: [
        {
          label: chartData.chartText,
          backgroundColor: chartData.chartColor,
          data: chartData.chartData
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: chartData.chartTitle
      }
    }
});
}
function drawBubble(chartData, containerID, chartID){
   // append the canvas to the container to draw the chart
  $("#"+containerID).append("<canvas id=\"" + chartID +"\"></canvas>")
  var ctx = document.getElementById(chartID).getContext('2d');
  new Chart(ctx, {
    type: 'bubble',
    data: {
      labels: "plchldr",
      datasets: [
        {
          label: [chartData.chartLabels[0]],
          backgroundColor: "rgba(255,221,50,0.2)",
          borderColor: "rgba(255,221,50,1)",
          data: [{
            x: chartData.chartData[0],
            y: chartData.chartData[1],
            r: chartData.chartData[2]
          }]
    },{
          label: [chartData.chartLabels[1]],
          backgroundColor: "rgba(60,186,159,0.2)",
          borderColor: "rgba(60,186,159,1)",
          data: [{
            x: chartData.chartData[3],
            y: chartData.chartData[4],
            r: chartData.chartData[5]
          }]
    }]
  },options: {
      title: {
        display: true,
        text: 'Power Play Opportunities and Goals Scored by Power Play Minutes Per Game'
      }, scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Power Play Opportunities"
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Goals Scored"
          }
        }]
      }
    }
});
}
// Initialize the dashboard - update code
initIndex();
