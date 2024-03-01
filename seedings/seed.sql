INSERT INTO products (title, sku, price)
	VALUES
		('Knife', 'KITCHEN-007', 200000);

INSERT INTO product_stores(store_id, product_id, quantity)
        SELECT
            1,
            id,
            200
        FROM products
            WHERE sku = 'KITCHEN-007';