var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');


var total_ProductSales = 0.00;
var total_profit = 0.0;

//creating connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "bamazon"
});


//connects to the database
connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    console.log("Please Select your choice.");
    supervisorPrompt();
    console.log("\n");
   // viewDepartments();
});

//Reads departments from the database
function viewDepartments(){
    console.log("Displaying all departments...n");
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) 
        throw err;
        // Log all results of the SELECT statement
        //console.log(res);
        res.forEach(element => {
            var departments = [
                 'Department Id: '      + `${element.department_id}`,
                 'Department Name: '    + `${element.department_name}`,
                 'OverHead Costs:'      + `${element.over_head_costs}`,
                //  'Product Sales'        + `${total_ProductSales}`,
                //  'Total Profit'         + `${total_profit}`
             ].join("\n");
            console.table(departments);  
         });
        ;
        viewProductSalesbyDepartmentPrompt(res);
    });
}


//creates a new department
function createNewDepartment(departmentName, overHeadCosts) {
    console.log("Add New Department.");
    var sql = `INSERT INTO  departments (department_name, over_head_costs) 
                            VALUES (?,?)`;

    connection.query(sql, [departmentName, overHeadCosts], function (err, res) {
        if (err) throw err;
        console.log(" ");
        superviseAgain();
    });
    ;
}


//user prompt to add a new product
function createNewDepartmentPrompt() {
    inquirer
        .prompt([

            {
                type: "input",
                message: "Enter the department name.",
                name: "departmentName"
            },
            {
                type: "input",
                message: "Enter the overhead costs of the department.",
                name: "overHeadCosts"
            }
        ])
        .then(answers => {
            createNewDepartment(answers.departmentName, answers.overHeadCosts);
            console.log("New department has been added.");
        });
    ;
}


//views products by giving department ID as an input
function viewProductSalesbyDepartmentPrompt(res) {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please input the department ID.",
                name: "departmentID"
            },
        ])
        .then(answers => {
            var ID = Number(answers.departmentID)-1;
           // console.log(ID);

            connection.query(`SELECT product_sales FROM bamazon.products
            WHERE bamazon.products.department_name = ?
            `, [res[ID].department_name], function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    res.forEach(element => {
                        total_ProductSales += (element.product_sales);
                    });
                    console.log("Total product sale : " + total_ProductSales);

                });

            ;
            connection.query(`SELECT over_head_costs FROM bamazon.departments
            WHERE bamazon.departments.department_name = ?
            `, [res[ID].department_name], function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    var overHeadCosts = parseInt(result.over_head_costs);
                    console.log("Over head cost " + overHeadCosts);
                    total_profit = parseFloat(total_ProductSales - overHeadCosts);
                    console.log(typeof total_profit);
                    console.log("Total profit : " + total_profit);
                    supervisorPrompt();
                });
            ;
            
        });

    ;
}
function supervisorPrompt() {

    inquirer
        .prompt([
            {
                type: "list",
                name: "info",
                message: "Select your choice from below.",
                choices: ["View Product Sales by Department", "Create New Department"]
            },

        ])
        .then(answers => {
            console.log(answers);

            if (answers.info === "View Product Sales by Department") {
                viewDepartments();
            }
            else if (answers.info === "Create New Department") {
                createNewDepartmentPrompt();
            }
            else {
                console.log("No option has been choosen.");
            }       

        });
    ;
}

function superviseAgain() {
    inquirer
        .prompt([
            {
                type: "confrim",
                message: "Do you wanna supervise other departments? (y/n)",
                name: "confirmSupervise"
            }
        ])
        .then(answers => {
            if(answers.confirmSupervise === 'y'){
               supervisorPrompt();
            }
            else{
                console.log("Finished supervising.");
            }
            
        });
    ;
}
