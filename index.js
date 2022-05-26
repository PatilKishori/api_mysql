let express = require("express");
let bodyparser = require("body-parser");
let mysql = require("mysql");
let app = express();
app.use(express.json());

app.post("/save", async (req, res)=>{
    let data = req.body.data;

    let con = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"nodemysql"
    });
    return new Promise((resolve, reject)=>{
        con.connect((err) => {
            if (err) {
                data = {
                    status: "failed",
                    message: "Connection error"
                };
                reject(data);
            }
            else {
                let query = "INSERT INTO users(name, email, mobileno) ";
                query += "VALUES('" + data.name + "', '" + data.email + "', '" + data.mobileno + "')";
                return new Promise((resolve, reject)=>{
                    con.query(query, (err, res) => {
                        if (err) {
                            console.log(err);
                            data = {
                                status: "failed",
                                message: err.sqlMessage
                            };
                            reject(data);
                        }
                        else {
                            data = {
                                status: "success",
                                message: "data inserted"
                            };
                            resolve(data);
                        }
                    });
                }).then(
                    (result)=>{
                        resolve(result);
                    },
                    (err)=>{
                        reject(err);
                    }
                );
            }
        });
    }).then(
        (result)=>{
            res.send(result);
        },
        (err)=>{
            res.send(err);
        }
    );
    //res.send(data);
});



app.listen(8081,()=>{
    console.log("website running in 8081");
});