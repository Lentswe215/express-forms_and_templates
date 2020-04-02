let {Pool} = require("pg");

let pool = new Pool({
    user: "user",
    password: "pass",
    host: "localhost",
    port: 5432,
    database: "visitordb"
});

class Visitors {
    constructor(fullName, age, dateOfVisit, timeOfVisit, assistedBy, comments) {
        this.fullName = fullName;
        this.age = age;
        this.dateOfVisit = dateOfVisit;
        this.timeOfVisit = timeOfVisit;
        this.assistedBy = assistedBy;
        this.comments = comments;
        this.myTryCatch = () => {
            try {
                this.myQuery;
            } catch (err) {
                throw err;
            }
        };

        this.myCallBack = err => {
            if (err) {
                throw Error(`${this.errorMessage} ${err}`);
            } else {
                console.log(this.message);
            }
        };
    }

    async createTable() {
        this.myTryCatch;
        this.myQuery = await pool.query("CREATE TABLE visitors(visitorID SERIAL PRIMARY KEY, fullname VARCHAR(50), visitorsage INT, dateofvisit DATE, timeofvisit TIME, assistedBy VARCHAR(50), comments VARCHAR(100), unique(fullname))", this.myCallBack);
        this.message = "Table successfully created";
        this.errorMessage = "Table couldn't created";
    }
    async addNewVisitor() {
        this.myTryCatch;
        this.myQuery = await pool.query("INSERT into visitors(fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments) values ($1,$2,$3,$4,$5,$6)", [
            this.fullName,
            this.age,
            this.dateOfVisit,
            this.timeOfVisit,
            this.assistedBy,
            this.comments
        ], this.myCallBack);
        this.errorMessage = "Visitor couldn't be added";
        this.message = "Visitor successfully added";
    }

    async listAllVisitors() {
        this.myTryCatch;
        let results = (this.myQuery = await pool.query("SELECT * from visitors"));
        console.table(results.rows);
        this.errorMessage = "Visitors cannot be listed";
    }

    async deleteVisitor() {
        this.myTryCatch;
        this.myQuery = await pool.query("DELETE from visitors WHERE fullname = $1", [this.fullName], this.myCallBack);
        this.errorMessage = "Visitor couldn't be deleted";
        this.message = "Visitor successfully deleted";
    }

    async updateVisitorInfo(columnToUpdate, newInfo) {
        this.myTryCatch;
        this.myQuery = await pool.query("UPDATE visitors SET " + columnToUpdate + " = $1 WHERE fullname = $2", [
            newInfo, this.fullName
        ], this.myCallBack);
        this.errorMessage = "Unable to update visitor information";
        this.message = "Visitor successfully updated";
    }
    async selectOneVisitor(visitorID) {
        this.myTryCatch;
        let results = (this.myQuery = await pool.query("SELECT * FROM visitors WHERE visitorid = $1", [visitorID]));
        console.table(results.rows);
        this.errorMessage = "Visitor cannot be selected";
    }

    async deleteAllVisitors() {
        this.myTryCatch;
        this.myQuery = pool.query("DELETE from visitors", this.myCallBack);
        this.message = "Visitors Successfully deleted";
        this.errorMessage = "Unable to delete visitor";
    }
}
module.exports = {
    Visitors
};
