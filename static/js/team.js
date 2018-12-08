function initTeam() {
  console.log('team1');
 // Grab a reference to the dropdown select element
 buildTeams("team1");
 buildTeams("team2");
 buildSeasons("seasons"); 
}

function getTeamCompare() {
    // Get the input value for team and season
  var team1 = document.getElementById("team1").value
  var team2 = document.getElementById("team2").value
  var season = document.getElementById("seasons").value
   
  // get the stats of team from season
  d3.json("/teamStats/"+ team1 + "/" + season).then((team1Stats) => {
  	 d3.json("/teamStats/"+ team2 + "/" + season).then((team2Stats) => {
	 	 console.log("team1:", team1Stats)
	 	 console.log("team2:", team2Stats)	
	  	if ((Object.keys(team1Stats).length==0) || (Object.keys(team2Stats).length==0))
     {
       if (Object.keys(team1Stats).length==0)
       {
         bodyContent.innerHTML+="<p>No data was found for " +  " team " + team1Stats + seasons + "</p>"
         //bodyContent.innerHTML+="<p>No data was found for " + team + " season " + season1Stats + "</p>"
       }
       else
       {
         bodyContent.innerHTML+="<p>No data was found for " +  " team " + team2Stats + seasons + "</p>"
       }
     }
     else {
       var totChart = {
         // "chartTitle": ["1","1","1","1","1","1","1","1"],
         "chartLabels": ["Wins " + team1Stats.Season_start  + " - " + team1Stats.Season_end , "Losses " + team1Stats.Season_start  + " - " + team1Stats.Season_end , "Games "  + team1Stats.Season_start  + " - " + team1Stats.Season_end , "Points "  + team1Stats.Season_start  + " - " + team1Stats.Season_end ,"Wins " + team2Stats.Season_start  + " - " + team2Stats.Season_end , "Losses " + team2Stats.Season_start  + " - " + team2Stats.Season_end , "Games "  + team2Stats.Season_start  + " - " + team2Stats.Season_end , "Points "  + team2Stats.Season_start  + " - " + team2Stats.Season_end ],
         "chartData": [team1Stats.W, team1Stats.L, team1Stats.GP, team1Stats.PTS, team2Stats.W, team2Stats.L, team2Stats.GP, team2Stats.PTS],
         "chartText": "Totals",
         "chartColor": ["#722349", "#e63f0b","#3c5e3a", "#00FFFF", "#722349", "#e63f0b","#3c5e3a", "#00FFFF"],
         // "chartTitle2": "Total Win Loss Record for " + season1.Season_start + " - " + season1.Season_end + " and " + season2.Season_start + " - " + season2.Season_end,
         // "chartLabels2": ["Total Wins", "Total Losses", "Games Played", "Points Earned"],
         // "chartData2": [season1.W, season1.L, season1.GP, season1.PTS,season2.W, season2.L, season2.GP, season2.PTS],
         // "chartText2": "Totals",
         // "chartColor2": ["#722349", "#e63f0b","#3c5e3a", "#098aaa","#722349", "#e63f0b","#3c5e3a", "#098aaa"]
       }
       // var goalChart = {
       //   "chartTitle": "Goalie Record for " + + season1.Season_start + " - " + season1.Season_end,
       //   "chartLabels": ["Goals For", "Goals Against"],
       //   "chartData": [season1.GF, season1.GA],
       //   "chartText": "Goalie Stats",
       //   "chartColor": ["#722349", "#e63f0b"],
       //   "chartTitle2": "Goalie Record for " + + season2.Season_start + " - " + season2.Season_end,
       //   "chartLabels2": ["Goals For", "Goals Against"],
       //   "chartData2": [season2.GF, season2.GA],
       //   "chartText2": "Goalie Stats",
       //   "chartColor2": ["#722349", "#e63f0b"]
       // }
       // var shootingChart = {
       //   "chartTitle": "Shooting Record for " + season1.Season_start + " - " + season1.Season_end + " and " + season2.Season_start + " - " + season2.Season_end,
       //   "chartLabels": ["Shots on Goal", "Goals For", "Shots Against", "Goals Against","Shots on Goal", "Goals For", "Shots Against", "Goals Against"],
       //   "chartData": [season1.S, season1.GF, season1.SA, season1.GA,season2.S, season2.GF, season2.SA, season2.GA],
       //   "chartText": "Shooting Stats",
       //   "chartColor": ["#722349", "#e63f0b","#3c5e3a", "#098aaa","#722349", "#e63f0b","#3c5e3a", "#098aaa"],
       //   "chartTitle2": "Shooting Record for " + season2.Season_start + " - " + season2.Season_end,
       //   "chartLabels2": ["Shots on Goal", "Goals For", "Shots Against", "Goals Against"],
       //   "chartData2": [season2.S, season2.GF, season2.SA, season2.GA],
       //   "chartText2": "Shooting Stats",
       //   "chartColor2": ["#722349", "#e63f0b","#3c5e3a", "#098aaa"]
       // }
       // var powerPlayChart = {
       //   "chartTitle": "Power Plays Comparison for " + season1.teamName + " " + season1.Season_start + " - " + season1.Season_end + " and " + season2.teamName + " " + season2.Season_start + " - " + season2.Season_end,
       //   "chartLabels": [season1.teamName, "Opponents of " season1.teamName+ season1.Season_start + " - " + season1.Season_end, season2.teamName, "Opponents of " season2.teamName+ season2.Season_start + " - " + season2.Season_end],
       //   "chartData": [season1.PP,season1.PPO,season1.oPIM_G,season1.PPA,season1.PPOA,season1.PIM_G,season2.PP,season2.PPO,season2.oPIM_G,season2.PPA,season2.PPOA,season2.PIM_G],
       //   "chartColor": ["#722349", "#e63f0b","#3c5e3a", "#098aaa","#722349", "#e63f0b","#3c5e3a", "#098aaa"],
       //   "chartTitle2": "Power Plays Comparison for " + season2.Season_start + " - " + season2.Season_end,
       //   "chartLabels2": [season2.teamName, "Opponents " + season2.Season_start + " - " + season2.Season_end],
       //   "chartData2": [season2.PP,season2.PPO,season2.oPIM_G,season2.PPA,season2.PPOA,season2.PIM_G],
       //   "chartText2": "Power Play Stats",
       //   "chartColor2": ["#722349", "#e63f0b","#3c5e3a", "#098aaa"]
         // "chartTitle": "Shooting Record for " + season1.Season_start + " - " + teamStats.Season_end,
         // "chartLabels": ["Shots on Goal", "Goals For", "Shots Against", "Goals Against"],
         // "chartData": [teamStats.S, teamStats.GF, teamStats.SA, teamStats.GA],
         // "chartText": "Shooting Stats",
         // "chartColor": ["#722349", "#e63f0b","#3c5e3a", "#098aaa"]
       }
       drawBarChart(totChart, "bodyContent", "chartTot")
       // drawDoughnut1(goalChart, "bodyContent", "chartGoalie1")
       // drawDoughnut2(goalChart, "bodyContent", "chartGoalie2")
       // drawHorzBar(shootingChart, "bodyContent", "chartShooting")
       // drawBubble(powerPlayChart,"bodyContent", "chartPwrPlay")
     })
     // If the either season is null output message of "unable to compare seasons"
     // else render chart of stats

   });
   };

// function drawBarChart(chartData, containerID, chartID){
//  // append the canvas to the container to draw the chart
//  $("#"+containerID).append("<canvas id=\"" + chartID +"\"></canvas>")
//  var ctx = document.getElementById(chartID).getContext('2d'); //
//  new Chart(ctx, {
//      type: 'bar',
//      data: {
//          labels: chartData.chartLabels,
//          datasets: [{
//              label: chartData.chartTitle,
//              data: chartData.chartData,
//              backgroundColor: chartData.chartColor,
//              borderColor: chartData.chartColor,
//              borderWidth: 1
//          }]
//      },
//      options: {
//          scales: {
//              yAxes: [{
//                  ticks: {
//                      beginAtZero:true
//                  }
//              }]
//          }
//      }
//  });
// }

function drawBarChart(chartData, containerID, chartID){
  // append the canvas to the container to draw the chart
  $("#"+containerID).append("<canvas id=\"" + chartID +"\"></canvas>")
  var ctx = document.getElementById(chartID).getContext('2d');
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: chartData.chartLabels,
          datasets: [{
              label: "Comparison by Teams",//chartData.chartTitle,
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

// function drawDoughnut1(chartData, containerID, chartID){
//   // append the canvas to the container to draw the chart
//   $("#"+containerID).append("<canvas id=\"" + chartID +"\"></canvas>")
//   var ctx = document.getElementById(chartID).getContext('2d');
//   new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//       labels: chartData.chartLabels,
//       datasets: [
//         {
//           label: chartData.chartTitle,
//           backgroundColor: chartData.chartColor,
//           data: chartData.chartData
//         }
//       ]
//     },
//     options: {
//       title: {
//         display: true,
//         text: chartData.chartTitle
//       }
//     }
// });
// }
// function drawDoughnut2(chartData, containerID, chartID){
//   // append the canvas to the container to draw the chart
//   $("#"+containerID).append("<canvas id=\"" + chartID +"\"></canvas>")
//   var ctx = document.getElementById(chartID).getContext('2d');
//   new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//       labels: chartData.chartLabels2,
//       datasets: [
//         {
//           label: chartData.chartTitle2,
//           backgroundColor: chartData.chartColor2,
//           data: chartData.chartData2
//         }
//       ]
//     },
//     options: {
//       title: {
//         display: true,
//         text: chartData.chartTitle2
//       }
//     }
// });
// }
// function drawHorzBar(chartData, containerID, chartID){
//   // append the canvas to the container to draw the chart
//   $("#"+containerID).append("<canvas id=\"" + chartID +"\"></canvas>")
//   var ctx = document.getElementById(chartID).getContext('2d');
//   new Chart(ctx, {
//     type: 'horizontalBar',
//     data: {
//       labels: chartData.chartLabels,
//       datasets: [
//         {
//           label: chartData.chartText,
//           backgroundColor: chartData.chartColor,
//           data: chartData.chartData
//         }
//       ]
//     },
//     options: {
//       legend: { display: false },
//       title: {
//         display: true,
//         text: chartData.chartTitle
//       }
//     }
// });
// }
// function drawBubble(chartData, containerID, chartID){
//    // append the canvas to the container to draw the chart
//   $("#"+containerID).append("<canvas id=\"" + chartID +"\"></canvas>")
//   var ctx = document.getElementById(chartID).getContext('2d');
//   new Chart(ctx, {
//     type: 'bubble',
//     data: {
//       labels: "plchldr",
//       datasets: [
//         {
//           label: [chartData.chartLabels[0]],
//           backgroundColor: "rgba(255,221,50,0.2)",
//           borderColor: "rgba(255,221,50,1)",
//           data: [{
//             x: chartData.chartData[0],
//             y: chartData.chartData[1],
//             r: chartData.chartData[2]
//           }]
//     },{
//           label: [chartData.chartLabels[1]],
//           backgroundColor: "rgba(60,186,159,0.2)",
//           borderColor: "rgba(60,186,159,1)",
//           data: [{
//             x: chartData.chartData[3],
//             y: chartData.chartData[4],
//             r: chartData.chartData[5]
//           }]
//     },{
//       label: [chartData.chartLabels[2]],
//       backgroundColor: "rgba(255,221,50,0.2)",
//       borderColor: "rgba(255,221,50,1)",
//       data: [{
//         x: chartData.chartData[6],
//         y: chartData.chartData[7],
//         r: chartData.chartData[8]
//       }]
// },{
//   label: [chartData.chartLabels[3]],
//   backgroundColor: "rgba(255,221,50,0.2)",
//   borderColor: "rgba(255,221,50,1)",
//   data: [{
//     x: chartData.chartData[9],
//     y: chartData.chartData[10],
//     r: chartData.chartData[1]
//   }]
// },]
//   },options: {
//       title: {
//         display: true,
//         text: 'Power Play Opportunities and Goals Scored by Power Play Minutes Per Game'
//       }, scales: {
//         yAxes: [{
//           scaleLabel: {
//             display: true,
//             labelString: "Power Play Opportunities"
//           }
//         }],
//         xAxes: [{
//           scaleLabel: {
//             display: true,
//             labelString: "Goals Scored"
//           }
//         }]
//       }
//     }
// });
// }
// Initialize the dashboard - update code
initTeam();