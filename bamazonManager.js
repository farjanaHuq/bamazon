var mysql = require("mysql");
var inquirer = require("inquirer");

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
                'Product Name: '    +  `${element.product_name}`,
                'Department Name: ' + `${element.department_name}`,
                'Price:'            + `${element.price}`,
                'Stock Quantity: '  +`${element.stock_quantity}`
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
                 'Product Id: '      +  `${element.item_id}`,
                 'Product Name: '    +  `${element.product_name}`,
                 'Department Name: ' + `${element.department_name}`,
                 'Price:'            + `${element.price}`,
                 'Stock Quantity: '  +`${element.stock_quantity}`
             ].join("\n");
            console.log(products + "\n");  
         });
         managerPrompt(); 
    });
}

// add more to the inventory that is selected
function addToInventory(amount, id) {
    // console.log(" Add more amount to the inventory.");
    connection.query("SELECT * FROM products WHERE item_id = ? ", [id], function (err, res) {
        if (err) throw err;
        //console.log(res);
        console.log(res.stock_quantity);
        var updateSotck = parseInt(res.stock_quantity) + amount;
        console.log(amount);
        console.log(typeof updateSotck);
        console.log(`${updateSotck} amount has been added.` );
            var products = [
                'Product Id: '      + `${res.item_id}`,
                'Product Name: '    + `${res.product_name}`,
                'Department Name: ' + `${res.department_name}`,
                'Price:'            + `${res.price}`,
                'Stock Quantity: '  + `${res.stock_quantity + amount}`
            ].join("\n");

            // console.log(products + "\n");
        
        managerPrompt();
    });
}


//add new products to the database
function addNewProduct(product_name, department_name, price, stock_quantity){
   
    console.log ("Add New Product.");
    var sql = `INSERT INTO  products (product_name, department_name, price, stock_quantity) 
                            VALUES (?,?, ?, ?)`;

    // var sql = `INSERT INTO  products (product_name, department_name, price, stock_quantity) 
    //                         VALUES ("knife", "kitchen Appliance", 12.99, 1234)`;
  
    connection.query(sql, [product_name, department_name, price, stock_quantity], function (err, res) {
            if (err) throw err;
            var newProduct = [
                'Product Id: '      + `${res.item_id}`,
                'Product Name: '    + `${res.product_name}`,
                'Department Name: ' + `${res.department_name}`,
                'Price:'            + `${res.price}`,
                'Stock Quantity: '  + `${res.stock_quantity}`
            ].join("\n");

            console.log(newProduct + "\n");
            console.log(res);
            managerPrompt();
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
                message: "How many would you like to add to your inventory? ",
                name: "amount"
            }
        ])
        .then(answers => {
                var id = Number(answers.id);
                var amount = Number(answers.amount);
                if ((!(id > 0))&&(typeof amount !== 'number' || amount < 1)) {
                    // if user enters a non-number or negative number, notify them and reprompt
                    console.log('Invalid entry. Please enter a number greater than 0.');
                    addToInventoryPrompt();
                }
                else {
                    console.log("Updated product amount.")
                    addToInventory(amount, id);
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
            }
        ])
        .then(answers => {
             addNewProduct(answers.product_name, answers.department_name, answers.price, answers.stock_quantity);
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
           else{
               managerPrompt();
               console.log("No option has been choosen.");
           }

        });
    ;
}
