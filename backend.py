import psycopg2 as p
import flask as f
# import flask_limiter as fl
import os

flask: f.Flask = f.Flask(__name__)
application = flask
#limiter: fl.Limiter = fl.Limiter(
    #app = flask,
    #key_func = lambda: f.request.remote_addr
#)

@flask.route("/")
@flask.route("/home")
def home():
    return f.render_template("home.html")

@flask.route("/services")
def services():
    return f.render_template("services.html")

@flask.route("/book")
def book():
    return f.render_template("book.html")

@flask.route("/products")
def products():
    return f.render_template("products.html")

@flask.route("/location")
def location():
    return f.render_template("location.html")

@flask.route("/aboutUs")
def aboutUs():
    return f.render_template("aboutUs.html")

@flask.route("/reviews")
def reviews():
    return f.render_template("reviews.html")

def establishConnection():
    connection: p.connection = p.connect(
        user = "postgres.yiixwhdstrtfxihpcjvz",
        password = "Free3000Delahoya202",
        host = "aws-0-eu-north-1.pooler.supabase.com",
        dbname = "postgres",
        sslmode = "require"
    )
    connection.autocommit = True
    return connection

def defineMasterId(name: str) -> int:
    match name:
        case "Вадим Толстік":
            return 1
        case "Єлизавета Анохіна":
            return 2
        case "Анна Кононенко":
            return 3
        case "Арміне Караханян":
            return 4
        case "Дарʼя Куриленко":
            return 5
        case "Аврора Котляр":
            return 6
        case "Єлизавета Теплинська":
            return 7
        case "Ірина Білоусова":
            return 8
        case _:
            return None

@flask.route("/submit", methods = ["POST"])
#@limiter.limit("5 per hour")
def submit():
    connection = establishConnection()

    firstName: str = f.request.form.get("firstName")
    lastName: str = f.request.form.get("lastName")
    phoneNumber: str = f.request.form.get("phoneNumber")
    serviceCategory: str = f.request.form.get("serviceCategory")
    serviceType: str = f.request.form.get("serviceType")
    master: str = f.request.form.get("master")
    date: str = f.request.form.get("date")
    time: str = f.request.form.get("time")
    comment: str = f.request.form.get("comment")

    masterId: int = defineMasterId(master)

    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO appointments VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s, %s, DEFAULT);", (firstName, lastName, phoneNumber, serviceCategory, serviceType, masterId, date, time, comment))

    connection.close()

    return f.render_template("book.html")

def getAppointments(date: str) -> list:
    connection: p.connection = establishConnection()
    appointments: list = []

    with connection.cursor() as cursor:
        cursor.execute("SELECT a_time, master_id, service_category FROM appointments WHERE a_date = %s;", (date,))
        appointments = cursor.fetchall()

    connection.close()

    transformedAppointments: list = [(row[0].hour, row[1], row[2]) for row in appointments]
    return transformedAppointments

@flask.route("/sendHours", methods = ["POST"])
#@limiter.limit("10 per minute")
def sendHours():
    date: str = f.request.form.get("date")
    return f.jsonify(getAppointments(date))

if __name__ == "__main__":
    port: int = int(os.environ.get("PORT", 5000))
    flask.run(host="0.0.0.0", port = port, debug = True)