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
	  	// If the either season is null output message of "unable to compare seasons"
  		// else render chart of stats
	  });
  	});
}
// Initialize the dashboard - update code
initSeasons();