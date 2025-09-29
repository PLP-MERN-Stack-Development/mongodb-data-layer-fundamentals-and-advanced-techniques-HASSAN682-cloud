# 📚 PLP Bookstore — MongoDB Project

A modular MongoDB-based bookstore system designed for diagnostics, sponsor-ready reporting, and full-stack integration. Includes CRUD operations, advanced queries, aggregation pipelines, and indexing — deployable locally or via MongoDB Atlas.

---

## 🚀 Setup Options

### 🔧 Option A: Local MongoDB
1. Install MongoDB: [Download here](https://www.mongodb.com/try/download/community)
2. Start server:
   ```bash
   mongod

Connect via shell:

mongo

☁️ Option B: MongoDB Atlas (Cloud)

Create a free cluster at mongodb.com/cloud/atlas

Whitelist your IP and create a database user

Connect using MongoDB Compass or shell:

mongo "mongodb+srv://<your-cluster-url>"

🐳 Optional: Docker Setup

docker run -d -p 27017:27017 --name plp-mongo mongo

To connect:

mongo --host localhost --port 27017

🗂️ Database & Collection

use plp_bookstore
db.createCollection("books")

📥 Insert Sample Data

Run insert_books.js in the Mongo shell or Compass:

db.books.insertMany([
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    published_year: 1988,
    price: 12.99,
    in_stock: true,
    pages: 208,
    publisher: "HarperOne"
  },
  // Add 9+ more books
])

🔧 Basic CRUD Operations

// Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } })

// Find books by a specific author
db.books.find({ author: "Robert C. Martin" })

// Update the price of a specific book
db.books.updateOne({ title: "Clean Code" }, { $set: { price: 24.99 } })

// Delete a book by its title
db.books.deleteOne({ title: "The Alchemist" })

🔍 Advanced Queries

// In stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection: title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sort by price
db.books.find().sort({ price: 1 }) // Ascending
db.books.find().sort({ price: -1 }) // Descending

// Pagination (5 per page)
db.books.find().skip(0).limit(5) // Page 1
db.books.find().skip(5).limit(5) // Page 2

📊 Aggregation Pipelines

// Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
])

// Author with most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Group by publication decade
db.books.aggregate([
  { $project: { decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

⚡ Indexing

// Index on title
db.books.createIndex({ title: 1 })

// Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

🧠 Author

HASSAN MOHAMMED SAIDICT Technician | Full-Stack Developer | Smart City StrategistSpecializing in MERN stack, sponsor-ready dashboards, and modular diagnostics.

🌐 GitHub Pages (Optional)

To showcase this project:

Create a docs/ folder with screenshots or markdown guides

Enable GitHub Pages in repository settings

Set source to main → /docs

📎 License

MIT — free to use, modify, and share.

