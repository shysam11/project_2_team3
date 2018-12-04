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
    """Return the homepage."""
    return render_template("index.html")

@app.route("/teamCompare.html")
def teamCompare():
    """Return the homepage."""
    return render_template("teamCompare.html")

@app.route("/seasonCompare.html")
def seasonCompare():
    """Return the homepage."""
    return render_template("seasonCompare.html")    

@app.route("/teams")
def teams():
    """Return a list of team names for drop down display."""
    teamList = session.query(NHLYear.teamName).distinct()

    # Create a dictionary from the row data and append to a list of all_passengers
    
    return jsonify(list(teamList))

@app.route("/seasons")
def seasons():
    """Return a list of available seasons for drop down display."""    
    #seasons = engine.execute("select distinct(concat(Season_Start, '-', Season_End)) as season from nhl_year order by Season_Start");    
    seasonsList = {
        "season": ["1993-1994", "1994-1995", "1995-1996"]
    };
        
    # Return a list of the team names (teamName)
    return jsonify(seasonsList);

if __name__ == "__main__":
    app.run(debug=True)
