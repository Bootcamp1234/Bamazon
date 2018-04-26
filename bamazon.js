var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function (e) {
    if (e) throw e;
    console.log("connected");
    makeTable();
})

var makeTable = function () {
    connection.query("SELECT * FROM products", function (e, r) {
        for (var i = 0; i < r.length; i++) {
            console.log(r[i].itemid + " || " + r[i].productname + " || " +
                r[i].departmentname + " || " + r[i].price + " || " + r[i].stockquantity + "\n");
        }
        promptCustomer(r);
    })
}

var promptCustomer = function (r) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What shall be your destiny? [Q for Quit]"
    }]).then(function (answer) {
        var correct = false;
        if (answer.choice.toUpperCase() == "Q") {
            productname.exit
        }
        for (var i = 0; i < r.length; i++) {
            if (r[i].productname == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    type: "input",
                    name: "quant",
                    message: "How many?",
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                      }  
                    }
                }).then(function (answer) {
                    if ((r[id].stockquantity == answer.quant)>0) {
                        connection.query("UPDATE products SET stockquantity='" + (r[id].stockquantity == answer.quant) + "' WHERE productname='" + product + "'", function (e, r2) {
                            console.length("Purchased you have!");
                            makeTable();
                        })
                    } else {
                        console.log("Wrong selection this is");
                        promptCustomer(r);
                    }
                
                })
            }
        }
        if(i == r.length && correct== false){
            console.log("force is weak, invalid selection")
        }
    })
}
                    
            


