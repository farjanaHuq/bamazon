DROP DATABASE bamazon;
CREATE DATABASE bamazon;
USE bamazon;

DROP TABLE IF exists products;
CREATE TABLE products (
    item_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    product_name TEXT NOT NULL,
    department_name TEXT NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    stock_quantity INTEGER NOT NULL
);


INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("Kitchen Scissor", "Kitchen Appliance", 14.00, 4786);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Rice Cooker", "Kitchen Appliance", 59.99, 1085);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("SLow COoker", "Kitchen Appliance", 54.98, 12456);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Knife", "Kitchen Appliance", 29.99, 15282);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Microwave", "Kitchen Appliance", 109.99, 7841);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Spoon", "Kitchen Appliance", 9.99, 15682);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Toaster", "Kitchen Appliance", 29.99, 6289);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Teapot", "Kitchen Appliance", 99.99, 3589);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bowl", "Kitchen Appliance", 9.99, 5674);


