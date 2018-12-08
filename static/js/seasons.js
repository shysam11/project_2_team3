function initSeasons() {
  console.log('seasons');
 // Grab a reference to the dropdown select element
 buildTeams("team");
 buildSeasons("season1");
 buildSeasons("season2");
}

function getSeasonCompare() {
  var team = document.getElementById("team").value
  var season1 = document.getElementById("season1").value
  var season2 = document.getElementById("season2").value

  // get the stats of team from season
  d3.json("/teamStats/"+ team + "/" + season1).then((season1Stats) => {
     d3.json("/teamStats/"+ team + "/" + season2).then((season2Stats) => {
     console.log("season1:", season1Stats)
     console.log("season2:", season2Stats)
     if ((Object.keys(season1Stats).length==0) || (Object.keys(season2Stats).length==0))
     {
       if (Object.keys(season1Stats).length==0)
       {
         bodyContent.innerHTML+="<p>No data was found for " + team + " season " + season1Stats + "</p>"
       }
       else
       {
         bodyContent.innerHTML+="<p>No data was found for " + team + " season " + season2Stats + "</p>"
       }
     }
     else {
       var totChart = {
         // "chartTitle": ["1","1","1","1","1","1","1","1"],
         "chartLabels": ["Wins " + season1Stats.Season_start  + " - " + season1Stats.Season_end , "Losses " + season1Stats.Season_start  + " - " + season1Stats.Season_end , "Games "  + season1Stats.Season_start  + " - " + season1Stats.Season_end , "Points "  + season1Stats.Season_start  + " - " + season1Stats.Season_end ,"Wins " + season2Stats.Season_start  + " - " + season2Stats.Season_end , "Losses " + season2Stats.Season_start  + " - " + season2Stats.Season_end , "Games "  + season2Stats.Season_start  + " - " + season2Stats.Season_end , "Points "  + season2Stats.Season_start  + " - " + season2Stats.Season_end ],
         "chartData": [season1Stats.W, season1Stats.L, season1Stats.GP, season1Stats.PTS, season2Stats.W, season2Stats.L, season2Stats.GP, season2Stats.PTS],
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
              label: "Comparison by Seasons",//chartData.chartTitle,
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
initSeasons();

// "chartTitle": "Power Plays Comparison for " + season1.teamName + " " + season1.Season_start + " - " + season1.Season_end + " and " + season2.teamName + " " + season2.Season_start + " - " + season2.Season_end,
// "chartLabels": [season1.teamName, "Opponents of " season1.teamName+ season1.Season_start + " - " + season1.Season_end, season2.teamName, "Opponents of " season2.teamName+ season2.Season_start + " - " + season2.Season_end],
// "chartData": [season1.PP,season1.PPO,season1.oPIM_G,season1.PPA,season1.PPOA,season1.PIM_G,season2.PP,season2.PPO,season2.oPIM_G,season2.PPA,season2.PPOA,season2.PIM_G],
// "chartColor": ["#722349", "#e63f0b","#3c5e3a", "#098aaa","#722349", "#e63f0b","#3c5e3a", "#098aaa"],
