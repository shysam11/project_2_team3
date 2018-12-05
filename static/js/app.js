function buildTeams(listId) {
  console.log('buildTeams:');
  
  // get the list of teams
  var selector = d3.select("#"+listId);

  d3.json("/teams").then((teamList) => {
    teamList.forEach((team) => {
      selector
      .append("option")
      .text(team.name)
      .property("value", team.name);
    });
  });
}
function buildSeasons(listId) {
  console.log('buildSeasons:');
  
  // get the list of teams
  var selector = d3.select("#"+listId);

  d3.json("/seasons").then((seasonsList) => {
    seasonsList.forEach((item) => {
      selector
      .append("option")
      .text(item.season)
      .property("value", item.season);
    });
  });
}

function init() {
  console.log('init');
 // Grab a reference to the dropdown select element
}
// Initialize the dashboard
init();