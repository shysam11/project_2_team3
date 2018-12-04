function buildTeams(listId) {
  console.log('buildTeams:');
  
  // get the list of teams
  var selector = d3.select("#"+listId);

  d3.json("/teams").then((teamList) => {
    teamList.team.forEach((team) => {
      selector
      .append("option")
      .text(team)
      .property("value", team);
    });
  });
}
function buildSeasons(listId) {
  console.log('buildSeasons:');
  
  // get the list of teams
  var selector = d3.select("#"+listId);

  d3.json("/seasons").then((seasonsList) => {
    seasonsList.season.forEach((season) => {
      selector
      .append("option")
      .text(season)
      .property("value", season);
    });
  });
}

function init() {
  console.log('init');
 // Grab a reference to the dropdown select element
}
// Initialize the dashboard
init();