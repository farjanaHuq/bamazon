DROP DATABASE bamazon;
CREATE DATABASE bamazon;
USE bamazon;


DROP TABLE IF exists products;
CREATE TABLE products (
    item_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    product_name TEXT NOT NULL,
    department_name TEXT NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    product_sales DOUBLE NOT NULL
);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES ("Kitchen Scissor", "Kitchen Appliance", 14.00, 4786, 0.0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Rice Cooker", "Kitchen Appliance", 59.99, 1085,0.0);
INSERT INTO products(product_name, department_name, price, stock_quantity,  product_sales)
VALUES ("SLow COoker", "Kitchen Appliance", 54.98, 12456, 0.0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Knife", "Kitchen Appliance", 29.99, 15282, 0.0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Microwave", "Kitchen Appliance", 109.99, 7841, 0.0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Spoon", "Kitchen Appliance", 9.99, 15682, 0.0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Toaster", "Kitchen Appliance", 29.99, 6289, 0.0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Teapot", "Kitchen Appliance", 99.99, 3589, 0.0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Bowl", "Kitchen Appliance", 9.99, 5674, 0.0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Strainer", "Kitchen Appliance", 4.99, 6675, 0.0);


