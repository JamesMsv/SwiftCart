-- SELECT routine_name
-- FROM information_schema.routines
-- WHERE routine_type = 'PROCEDURE'
--   AND routine_schema = 'bvmw9qxqtrx6jrtksk8s';

-- AddAppPkg
-- DeleteAppPkg
-- GetAppsPkg
-- GetProductPkg
-- GetUserCount
-- GET_TICKET
-- InsertProductPkg
-- PUT_TICKET

-- SHOW CREATE PROCEDURE bvmw9qxqtrx6jrtksk8s.InsertProductPkg;

desc bvmw9qxqtrx6jrtksk8s.product_master;
desc PRODUCT_MASTER;

select * from bvmw9qxqtrx6jrtksk8s.product_master;
drop table bvmw9qxqtrx6jrtksk8s.product_master;
commit;
DELETE FROM bvmw9qxqtrx6jrtksk8s.product_master;
commit;
INSERT INTO bvmw9qxqtrx6jrtksk8s.PRODUCT_MASTER 
(product_code, product_name, category,brand, price, discount,
 url, product_description)
VALUES 
('MIA0002',
 'BrandX Smartphone', 
 'Electronics', 
 'BrandX', 
 99, 
 10, 
 'http://example.com/image.jpg', 
 'This is a sample product description.');

SELECT * FROM bvmw9qxqtrx6jrtksk8s.PRODUCT_MASTER;

commit;
-- ALTER TABLE table_name
-- MODIFY COLUMN column_name new_datatype;

-- ALTER TABLE bvmw9qxqtrx6jrtksk8s.PRODUCT_MASTER
-- MODIFY COLUMN PRODUCT_DESCRIPTION VARCHAR(2000);

-- ALTER TABLE bvmw9qxqtrx6jrtksk8s.PRODUCT_MASTER
-- ADD COLUMN RATINGS INT DEFAULT 0;



CREATE TABLE bvmw9qxqtrx6jrtksk8s.category_master (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255)
);

INSERT INTO bvmw9qxqtrx6jrtksk8s.category_master (category_name, description)
VALUES  
('Electronics', 'Devices and gadgets'),
('Clothing', 'Apparel and fashion items'),
('Home Appliances', 'Appliances for home use'),
('Books', 'Printed and digital books'),
('Sports', 'Sports equipment and apparel'),
('Toys', 'Children\'s toys and games'),
('Beauty', 'Beauty products and cosmetics'),
('Automotive', 'Car accessories and parts'),
('Health', 'Health and wellness products'),
('Furniture', 'Home furniture and decor');

SELECT * FROM bvmw9qxqtrx6jrtksk8s.category_master;

CREATE TABLE bvmw9qxqtrx6jrtksk8s.category_product_master (
  category_product_id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  product_name VARCHAR(50) NOT NULL
);

INSERT INTO bvmw9qxqtrx6jrtksk8s.category_product_master 
(category_id, product_name) VALUES 
((SELECT CATEGORY_ID  FROM bvmw9qxqtrx6jrtksk8s.category_master  
where category_name='Electronics'),'Laptop');
commit;

SELECT * FROM bvmw9qxqtrx6jrtksk8s.category_master;
SELECT * FROM bvmw9qxqtrx6jrtksk8s.category_product_master;

select cpe1_0.category_product_id,cpe1_0.category_id,cpe1_0.product_name 
from bvmw9qxqtrx6jrtksk8s.category_product_master cpe1_0 where cpe1_0.product_name=;

DROP PROCEDURE IF EXISTS bvmw9qxqtrx6jrtksk8s.InsertProductPkg;

CREATE PROCEDURE bvmw9qxqtrx6jrtksk8s.InsertProductPkg(
  IN p_name VARCHAR(50),
  IN p_category VARCHAR(50),
  IN p_brand VARCHAR(50),
  IN p_price INT,
  IN p_discount INT,
  IN p_url VARCHAR(500),
  IN p_description VARCHAR(1000),
  OUT p_status TEXT  -- fallback if JSON not supported
)
BEGIN
  DECLARE p_code VARCHAR(20);

  -- Generate random product code (3 letters + 5 digits + 2 letters)
  SET p_code = CONCAT(
    CHAR(FLOOR(65 + (RAND() * 26))),
    CHAR(FLOOR(65 + (RAND() * 26))),
    CHAR(FLOOR(65 + (RAND() * 26))),
    FLOOR(11111 + (RAND() * 99999)),
    CHAR(FLOOR(65 + (RAND() * 26))),
    CHAR(FLOOR(65 + (RAND() * 26)))
  );

  -- Insert into PRODUCT_MASTER table
  INSERT INTO bvmw9qxqtrx6jrtksk8s.PRODUCT_MASTER
  (
    product_code,
    product_name,
    category,
    brand,
    price,
    discount,
    url,
    product_description
  )
  VALUES (
    p_code,
    p_name,
    p_category,
    p_brand,
    p_price,
    p_discount,
    p_url,
    p_description
  );

  -- Return status as JSON string
  SET p_status = CONCAT(
    '{\"Status\":\"Success\", \"product_code\":\"', p_code, '\"}'
  );
END;
