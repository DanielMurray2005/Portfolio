from flask import Flask, render_template      

app = Flask(__name__)

@app.route("/home")
@app.route("/")
def home():
    return render_template("home.html")
    
@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/transcript")
def transcript():
    return render_template("courses.html")

@app.route("/mobile")
def mobile():
    return render_template("mobile.html")
    
if __name__ == "__main__":
    app.run(debug=True)