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
	  	// If either team stats are null output message of "Cannot compare lack of data"
  		// else render chart of stats
	  });
  	});
  // render stats
}
// Initialize the dashboard - update code
initTeam();