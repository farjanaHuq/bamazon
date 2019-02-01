var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "bamazon_department"
});


//Reads products from the database
connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    supervisorPrompt();
});

//Reads departments from the database
function viewProductSalesbyDepartment() {
    console.log("Displaying all departments...\n");
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) 
        throw err;
        // Log all results of the SELECT statement
        //console.log(res);
        res.forEach(element => {
            var departments = [
                 'Department Id: '      + `${element.department_id}`,
                 'Department Name: ' + `${element.department_name}`,
                 'OverHead Costs:'            + `${element.over_head_costs}`,
             ].join("\n");
            console.log(departments + "\n");  
         });
        ;
        supervisorPrompt();
    });
}

function createNewDepartment(departmentName, overHeadCosts){
    console.log ("Add New Department.");
    var sql = `INSERT INTO  departments (department_name, over_head_costs) 
                            VALUES (?,?)`;
  
    connection.query(sql, [departmentName, overHeadCosts], function (err, res) {
            if (err) throw err;
                 
            console.log(" ");
            supervisorPrompt();
        });
    ;    
}


//user prompt to add a new product
function createNewDepartmentPrompt(){
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
function supervisorPrompt(){

    inquirer
    .prompt([
        {
            type: "list",
            name: "info",
            message: "Select your choice from below.",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ])
    .then(answers => {
       console.log(answers);
      
        if(answers.info === "View Product Sales by Department"){
            viewProductSalesbyDepartment();
        }
        else if(answers.info === "Create New Department"){
             createNewDepartmentPrompt();
        }
       else{
           supervisorPrompt();
           console.log("No option has been choosen.");
       }

    });
;
}

//insert a column called product sales
// calculate total_profit from defference between over_head_costs and product_sales