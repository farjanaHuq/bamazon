DROP DATABASE bamazon;
CREATE DATABASE bamazon;
USE bamazon;


DROP TABLE IF exists products;
CREATE TABLE products (
    item_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    product_name TEXT NOT NULL,
    department_name TEXT NOT NULL,
    price DOUBLE(10 , 2 ) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    product_sales DOUBLE(10 , 2 ) NOT NULL
);



INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES ("Kitchen Scissor", "Kitchen Appliance", 14.00, 4786, 0.00);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Rice Cooker", "Kitchen Appliance", 59.99, 1085, 0.00);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("SLow COoker", "Kitchen Appliance", 54.98, 12456, 0.00);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Knife", "Kitchen Appliance", 29.99, 15282, 0.00);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Microwave", "Kitchen Appliance", 109.99, 7841, 0.00);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Spoon", "Kitchen Appliance", 9.99, 15682, 0.00);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Toaster", "Kitchen Appliance", 29.99, 6289, 0.00);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Teapot", "Kitchen Appliance", 99.99, 3589, 0.00);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Bowl", "Kitchen Appliance", 9.99, 5674, 0.00);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Strainer", "Kitchen Appliance", 4.99, 6675, 0.00);

SELECT * FROM products WHERE department_name = "Kitchen Appliance";

UPDATE products 
SET product_sales = 0
where department_name = "Kitchen Appliance";

DROP TABLE IF exists departments ;
CREATE TABLE departments (
    department_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    department_name TEXT NOT NULL,
    over_head_costs INTEGER NOT NULL
);

INSERT INTO departments(department_name, over_head_costs)
VALUES ( "Kitchen Appliance", 1000);
INSERT INTO departments(department_name, over_head_costs)
VALUES ( "Electronics", 4000);
INSERT INTO departments(department_name, over_head_costs)
VALUES ( "Clothing", 6000);



