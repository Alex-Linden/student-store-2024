const db = require('../database'); // Assuming you have a database module


class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  // Get all products from the database
  static async getAll() {
    const query = `SELECT * FROM products`;
    try {
      const results = await db.query(query);
      const products = results.map((row) => {
        const { name, price, quantity } = row;
        return new Product(name, price, quantity);
      });
      return products;
    } catch (error) {
      console.error('Error getting all products:', error);
      throw error;
    }
  }
  // Create a new product in the database
  static async create() {
    const query = `INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)`;
    const values = [this.name, this.price, this.quantity];
    try {
      const result = await db.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Read a product from the database by its ID
  static async findById(id) {
    const query = `SELECT * FROM products WHERE id = ?`;
    try {
      const result = await db.query(query, [id]);
      if (result.length > 0) {
        const { name, price, quantity } = result[0];
        return new Product(name, price, quantity);
      }
      return null;
    } catch (error) {
      console.error('Error finding product:', error);
      throw error;
    }
  }

  // Update a product in the database
  static async update() {
    const query = `UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?`;
    const values = [this.name, this.price, this.quantity, this.id];
    try {
      await db.query(query, values);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Delete a product from the database
  static async delete() {
    const query = `DELETE FROM products WHERE id = ?`;
    try {
      await db.query(query, [this.id]);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}

module.exports = Product;