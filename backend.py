import supabase as s
import flask as f
# import flask_limiter as fl
import datetime as dt
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

def establishConnection() -> s.Client:
    url: str = "https://yiixwhdstrtfxihpcjvz.supabase.co"
    key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpaXh3aGRzdHJ0ZnhpaHBjanZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MjA2NTksImV4cCI6MjA3MDQ5NjY1OX0.Kkz6HIigeqKhLuEpBAS7CM36fBuFOmcZzuOy-VsOT0w"
    client: s.Client = s.create_client(url, key)
    return client

def defineMasterId(name: str) -> int | None:
    masterIds : dict[str, int] = {
        "Вадим Толстік": 1,
        "Наталія Полтавченко": 2,
        "Інна Сіра": 3,
        "Єлизавета Анохіна": 4,
        "Анна Кононенко": 5,
        "Інна Нємцева": 6,
        "Ірина Білоусова": 7,
        "Ангеліна Дехніч": 8,
        "Арміне Караханян": 9,
        "Олександра Татаренко": 10
    }
    return masterIds.get(name)

@flask.route("/submit", methods = ["POST"])
#@limiter.limit("5 per hour")
def submit():
    client: s.Client = establishConnection()

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

    client.table("appointments").insert({
        "first_name": firstName,
        "last_name": lastName,
        "phone_number": phoneNumber,
        "service_category": serviceCategory,
        "service_type": serviceType,
        "master_id": masterId,
        "a_date": date,
        "a_time": time,
        "comment": comment
    }).execute()

    return f.render_template("book.html")


def transformAppointments(appointments: list) -> list:
    return [(dt.datetime.strptime(row["a_time"], "%H:%M:%S").time().hour, row["master_id"], row["service_category"]) for row in appointments]

def getAppointments(date: str) -> list:
    client: s.Client = establishConnection()

    response: s.ClientResponse = client.table("appointments").select("a_time, master_id, service_category").eq("a_date", date).execute()
    appointments: list = response.data

    appointments = transformAppointments(appointments)
    return appointments

@flask.route("/sendHours", methods = ["POST"])
#@limiter.limit("10 per minute")
def sendHours():
    date: str = f.request.form.get("date")
    return f.jsonify(getAppointments(date))

if __name__ == "__main__":
    port: int = int(os.environ.get("PORT", 5000))
    flask.run(host="0.0.0.0", port = port, debug = True)