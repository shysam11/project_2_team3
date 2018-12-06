from flask_sqlalchemy import SQLAlchemy
# PyMySQL 
import pymysql
pymysql.install_as_MySQLdb()

from flask import Flask, jsonify, render_template

#################################################
# Flask Setup
#################################################

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Roscoe1963@localhost/nhl'
db = SQLAlchemy(app)

db.reflect()

class NHLYear(db.Model):
	__tablename__ = 'view_nhl_year'

#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
	# Return the homepage.
	return render_template("index.html")

@app.route("/teamCompare.html")
def teamCompare():
# Return the homepage.
	return render_template("teamCompare.html")

@app.route("/seasonCompare.html")
def seasonCompare():
	# Return the homepage.
	return render_template("seasonCompare.html")    

@app.route("/teams")
def teams():
	# Return a list of team names for drop down display.
	teamList = db.session.query(NHLYear.teamName).distinct().order_by("teamName")

	# Create a dictionary from the row data and append to a list of display teams    
	# initialize the team dictionary and increment variable

	team_dict = []
	i = 0

	# iterate through the returned values and append to the dictionary

	for team in teamList:
		temp_team = {}
		temp_team["id"] = i
		temp_team["name"] = team.teamName
		team_dict.append(temp_team)
		i +=1

	return jsonify(team_dict)

@app.route("/seasons")
def seasons():
	
	# Return a list of team names for drop down display.
	seasonsList = db.session.query(NHLYear.Season_start, NHLYear.Season_end).distinct().order_by("Season_start")

	# Create a dictionary from the row data and append to a list of display teams    
	# initialize the team dictionary and increment variable

	seasons_dict = []
	i = 0

	# iterate through the returned values and append to the dictionary

	for season in seasonsList:
		temp_season = {}
		temp_season["id"] = i
		temp_season["season"] = season.Season_start + "-" + season.Season_end
		seasons_dict.append(temp_season)
		i +=1

	return jsonify(seasons_dict)

@app.route("/teamStats/<team>/<season>")
def teamStats(team, season):
	
	# Parse the season value to start and end dates for the query
	seasons = season.split("-")
	# 
	sel=[
	NHLYear.ID,
	NHLYear.Rk,
	NHLYear.teamName,
	NHLYear.AvAge,
	NHLYear.GP,
	NHLYear.W,
	NHLYear.L,
	NHLYear.T,
	NHLYear.OL,
	NHLYear.PTS,
	NHLYear.PTSpct,
	NHLYear.GF,
	NHLYear.GA,
	NHLYear.SOW,
	NHLYear.SOL,
	NHLYear.SRS,
	NHLYear.SOS,
	NHLYear.TG_G,
	NHLYear.EVGF,
	NHLYear.EVGA,
	NHLYear.PP,
	NHLYear.PPO,
	NHLYear.PPpct,
	NHLYear.PPA,
	NHLYear.PPOA,
	NHLYear.PKpct,
	NHLYear.SH,
	NHLYear.SHA,
	NHLYear.PIM_G,
	NHLYear.oPIM_G,
	NHLYear.S,
	NHLYear.Spct,
	NHLYear.SA,
	NHLYear.SVpcT,
	NHLYear.PDO,
	NHLYear.Season_start,
	NHLYear.Season_end]

	seasonsList = db.session.query(*sel).filter(NHLYear.teamName == team).filter(NHLYear.Season_start == seasons[0]).all()

	# Create a dictionary from the row data and append to a list of display teams    
	# initialize the team dictionary and increment variable

	teamStats = {}	
	for result in seasonsList:
		teamStats["ID"]=result[0]
		teamStats["Rk"]=result[1]
		teamStats["teamName"]=result[2]
		teamStats["AvAge"]=result[3]
		teamStats["GP"]=result[4]
		teamStats["W"]=result[5]
		teamStats["L"]=result[6]
		teamStats["T"]=result[7]
		teamStats["OL"]=result[8]
		teamStats["PTS"]=result[9]
		teamStats["PTSpct"]=result[10]
		teamStats["GF"]=result[11]
		teamStats["GA"]=result[12]
		teamStats["SRS"]=result[13]
		teamStats["SOS"]=result[14]
		teamStats["TG_G"]=result[15]
		teamStats["EVGF"]=result[16]
		teamStats["EVGA"]=result[17]
		teamStats["PP"]=result[18]
		teamStats["PPO"]=result[19]
		teamStats["PPpct"]=result[20]
		teamStats["PPA"]=result[21]
		teamStats["PPOA"]=result[22]
		teamStats["PKpct"]=result[23]
		teamStats["SH"]=result[24]
		teamStats["SHA"]=result[25]
		teamStats["PIM_G"]=result[26]
		teamStats["oPIM_G"]=result[27]
		teamStats["S"]=result[28]
		teamStats["Spct"]=result[29]
		teamStats["SA"]=result[30]
		teamStats["SVpcT"]=result[31]
		teamStats["PDO"]=result[32]
		teamStats["Season_start"]=result[33]
		teamStats["Season_end"]=result[34]

	return jsonify(teamStats)

if __name__ == "__main__":
	app.run(debug=True)
