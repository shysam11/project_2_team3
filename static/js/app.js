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

function getTeamImage(location, team_name) {
  console.log('GetImage for:', team_name);
    var name = location + team_name.split(" ").join("_")+".png"
    return name    
 }

function init() {
  console.log('init');
 // Grab a reference to the dropdown select element
}
// Initialize the dashboard - update code
init();