from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
# PyMySQL 
import pymysql
pymysql.install_as_MySQLdb()

from flask import Flask, jsonify, render_template

#################################################
# Database Setup
#################################################
engine = create_engine("mysql://root:Roscoe1963@localhost/nhl_db")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
NHLYear = Base.classes.nhl_year

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

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
	teamList = session.query(NHLYear.teamName).distinct().order_by("teamName")

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
	seasonsList = session.query(NHLYear.Season_Start, NHLYear.Season_End).distinct().order_by("Season_Start")

	# Create a dictionary from the row data and append to a list of display teams    
	# initialize the team dictionary and increment variable

	seasons_dict = []
	i = 0

	# iterate through the returned values and append to the dictionary

	for season in seasonsList:
		temp_season = {}
		temp_season["id"] = i
		temp_season["season"] = season.Season_Start + "-" + season.Season_End
		seasons_dict.append(temp_season)
		i +=1

	return jsonify(seasons_dict)

@app.route("/teamStats/<team>/<season>")
def teamStats(team, season):
	
	# Parse the season value to start and end dates for the query
	seasons = season.split("-")
	# 
	sel=[
	NHLYear.id,
	NHLYear.Rk,
	NHLYear.teamName,
	NHLYear.GP,
	NHLYear.W,
	NHLYear.L,
	NHLYear.T,
	NHLYear.PTS,
	NHLYear.PTSpct,
	NHLYear.GF,
	NHLYear.GA,
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
	NHLYear.SVpct,
	NHLYear.PDO,
	NHLYear.Season_Start,
	NHLYear.Season_End]

	seasonsList = session.query(*sel).filter(NHLYear.teamName == team).filter(NHLYear.Season_Start == seasons[0]).all()

	# Create a dictionary from the row data and append to a list of display teams    
	# initialize the team dictionary and increment variable

	teamStats = {}	
	for result in seasonsList:
		teamStats["id"]=result[0]
		teamStats["Rk"]=result[1]
		teamStats["teamName"]=result[2]
		teamStats["GP"]=result[3]
		teamStats["W"]=result[4]
		teamStats["L"]=result[5]
		teamStats["T"]=result[6]
		teamStats["PTS"]=result[7]
		teamStats["PTSpct"]=result[8]
		teamStats["GF"]=result[9]
		teamStats["GA"]=result[10]
		teamStats["SRS"]=result[11]
		teamStats["SOS"]=result[12]
		teamStats["TG_G"]=result[13]
		teamStats["EVGF"]=result[14]
		teamStats["EVGA"]=result[15]
		teamStats["PP"]=result[16]
		teamStats["PPO"]=result[17]
		teamStats["PPpct"]=result[18]
		teamStats["PPA"]=result[19]
		teamStats["PPOA"]=result[20]
		teamStats["PKpct"]=result[21]
		teamStats["SH"]=result[22]
		teamStats["SHA"]=result[23]
		teamStats["PIM_G"]=result[24]
		teamStats["oPIM_G"]=result[25]
		teamStats["S"]=result[26]
		teamStats["Spct"]=result[27]
		teamStats["SA"]=result[28]
		teamStats["SVpct"]=result[29]
		teamStats["PDO"]=result[30]
		teamStats["Season_Start"]=result[31]
		teamStats["Season_End"]=result[32]

	return jsonify(teamStats)

if __name__ == "__main__":
	app.run(debug=True)
