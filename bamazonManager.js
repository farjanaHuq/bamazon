var mysql = require("mysql");
var inquirer = require("inquirer");

//creating connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "bamazon"
});


//Reads products from the database
connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    managerPrompt();
});

//views products from database
function viewProductsForSale(){

    console.log("Displaying all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        res.forEach(element => {
           var products = [
                'Product Id: '      +  `${element.item_id}`,
                'Product Name: '    + `${element.product_name}`,
                'Department Name: ' + `${element.department_name}`,
                'Price:'            + `${element.price}`,
                'Stock Quantity: '  + `${element.stock_quantity}`
            ].join("\n");
           console.log(products + "\n");  
        });
        managerPrompt(); 
    });
    
}


//Looks through the tables to find low inventory
function viewLowInventory(){

    console.log ("Low Inventory.");
    connection.query("SELECT * FROM products WHERE stock_quantity < ?", [5000], function(err, res){
        if(err) throw err;  
        res.forEach(element => {
            var products = [
                 'Product Id: '      + `${element.item_id}`,
                 'Product Name: '    + `${element.product_name}`,
                 'Department Name: ' + `${element.department_name}`,
                 'Price:'            + `${element.price}`,
                 'Stock Quantity: '  + `${element.stock_quantity}`
             ].join("\n");
            console.log(products + "\n");  
         });
         managerPrompt(); 
    });
}

// add more to the inventory that is selected
function addToInventory(amount, stockQuantity, id) {
    // console.log(" Add more amount to the inventory.");
    connection.query("UPDATE  products SET stock_quantity = ? WHERE item_id = ? ", [stockQuantity + amount, id], 
           function (err, res) {
                if (err) throw err;
                console.log("");
                managerPrompt();
            });
}


//add new products to the database
function addNewProduct(product_name, department_name, price, stock_quantity, product_sales){
   
    //console.log ("Add New Product.");
    var sql = `INSERT INTO  products (product_name, department_name, price, stock_quantity, product_sales) 
                            VALUES (?, ?, ?, ?, ?)`;

    // var sql = `INSERT INTO  products (product_name, department_name, price, stock_quantity) 
    //                         VALUES ("knife", "kitchen Appliance", 12.99, 1234)`;
  
    connection.query(sql, [product_name, department_name, price, stock_quantity, product_sales], function (err, res) {
            if (err) throw err;
                 
            console.log("walla ");
           managerPrompt();
           manageMorePrompt();
        });
    ;    
}

//display a prompt that will let the manager "add more" of any item currently in the store.
function addToInventoryPrompt(){
    
      console.log("Add to inventory.");
      
      inquirer
        .prompt([   
            {
                type: "input",
                message: "Select a product.",
                name: "id"
            } ,  
            {
                type: "input",
                message: "Enter the current stock quantity.",
                name: "stockQuantity"
            },    
            {
                type: "input",
                message: "How much would you like to add to your inventory? ",
                name: "amount"
            },
            
           
        ])
        .then(answers => {
                var id = Number(answers.id);
                var stockQuantity = Number(answers.stockQuantity);
                var amount = Number(answers.amount);
                if ((!(id > 0))&&(typeof amount !== 'number' || amount < 1)&&(stockQuantity>0)) {
                    // if user enters a non-number or negative number, notify them and reprompt
                    console.log('Invalid entry. Please enter a number greater than 0.');
                    addToInventoryPrompt();
                }
                else {
                    console.log("Updated product amount.")
                    addToInventory(amount,stockQuantity, id);
                }
            ;
        });
    ;
}

//user prompt to add a new product
function addNewProductPrompt(){
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the product name.",
                name: "product_name"
            },
            {
                type: "input",
                message: "Enter the department name.",
                name: "department_name"
            },
            {
                type: "input",
                message: "Enter the price of the product.",
                name: "price"
            },
            {
                type: "input",
                message: "Enter the stock quantity of the product.",
                name: "stock_quantity"
            },
            {
                type: "input",
                message: "Enter the total product sales.",
                name: "product_sales"
            },
        ])
        .then(answers => {
             addNewProduct(answers.product_name, answers.department_name, answers.price, answers.stock_quantity, amount.product_sales);
             console.log("New item has been added.");
        });
    ;
}
//user prompt to give Manager the options to choose 
function managerPrompt() {  
    
    inquirer
        .prompt([
            {
                type: "list",
                name: "info",
                message: "Select your choice from below.",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }
           
        ])
        .then(answers => {
           console.log(answers);
          
            if(answers.info === "View Products for Sale"){
                viewProductsForSale();
            }
            else if(answers.info === "View Low Inventory"){
                viewLowInventory();
            }
            else if(answers.info === "Add to Inventory"){
                 addToInventoryPrompt();
            }
            else if (answers.info === "Add New Product"){             
                    addNewProductPrompt();     
            }
        });
       
    ;
}

function manageMorePrompt() {
    inquirer
        .prompt([
            {
                type: "confrim",
                message: "Do you wanna manage other departments? (y/n)",
                name: "confirmManage"
            }
        ])
        .then(answers => {
            if(answers.confirmManage === 'y'){
               managerPrompt();
            }
            else{
                console.log("Finished supervising.");
            }
            
        });
    ;
}


