var mysql = require("mysql");
var inquirer = require("inquirer");

const EventEmitter = require('eventemitter3');
const emitter = new EventEmitter();

require('events').EventEmitter.defaultMaxListeners = 100;

//variables to store the total product sales and the current stock
var productSales = 0;
var currentStock = 0;

//creating a connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "bamazon"
});
//connecting to the server
connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    readProducts();
});

//Reads products from the database
function readProducts() {
    console.log("Displaying all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) 
        throw err;
        // Log all results of the SELECT statement
        res.forEach(element => {
            var products = [
                 'Product Id: '      + `${element.item_id}`,
                 'Product Name: '    + `${element.product_name}`,
                 'Department Name: ' + `${element.department_name}`,
                 'Price:'            + `${element.price}`,
                 'Stock Quantity: '  + `${element.stock_quantity}`,
                 'Product Sales: '   + `${element.product_sales}`,

             ].join("\n");
            console.log(products + "\n");  
                // prompt user for product ID              
            });
            idPrompt(res);  
          
    });
}

//Updates product quantity to the database
function  updateProduct(amount, stockQuantity, price, ID) {
    var prevProdSale = price*amount;
    var prevStock = stockQuantity-amount;
   
    productSales = prevProdSale + productSales;
    currentStock = prevStock + currentStock;

    connection.query("UPDATE products SET stock_quantity = ?, product_sales  = ? WHERE item_id = ? "
        , [currentStock, productSales, ID],
        function (err, res) {           
            if (err) throw err;
            console.log(" ");
        }    
    );
    purchaseMore();
   // readProducts();
    
}

// userprompt to select a product 
function idPrompt(res) {
   
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter the ID of the product you wish to buy.",
                name: "ID"
            }
        ])
        .then(answers => {
            var ID = Number(answers.ID);
            console.log("ID : " + ID);
            if (!(ID > 0 || ID <= res.length)) {
                // if user enters an invalid product ID, notify them and run the same prompt again
                console.log('Invalid product ID.');
                idPrompt(res);
            } else {
                // if user enters a valid ID, ask them the amount they wish to buy
                purchaseAmountPrompt(res,ID);
            }
        });
    ;
}

//user prompt to select the number of product
function purchaseAmountPrompt(res,ID) {
    inquirer
        .prompt([
            {
                type: "input",
                message: `How many would you like to buy? (${res[ID-1].stock_quantity}) amount in our stock.`,
                name: "purchaseAmount"
            },
           
        ])
        .then(answers => {
            var amount = Number(answers.purchaseAmount);
            if (typeof amount !== 'number' || amount < 1) {
                // if user enters a non-number or negative number, notify them and reprompt
                console.log('Invalid entry. Please enter a number greater than 0.');
                purchaseAmountPrompt(ID);
            }
            else if(amount> res[ID-1].stock_quantity){
                console.log("Sorry, we are out of stock.");
            }
            else {
                updateProduct(amount, res[ID-1].stock_quantity, res[ID-1].price, ID);
            }
        });
    ;
}

function purchaseMore() {
    inquirer
        .prompt([
            {
                type: "confrim",
                message: "Do you wanna purchase more items? (y/n)",
                name: "confirmPurchase"
            }
        ])
        .then(answers => {
            if(answers.confirmPurchase === 'y'){
               readProducts();
            }
            else{
                console.log("Finished with shopping.");
            }
            
        });
    ;
}
