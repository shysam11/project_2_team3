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
  	// If the team stats is null output message of "No Data for Season"
  	// else render chart of stats
  });
  // render stats
}
// Initialize the dashboard
initIndex();