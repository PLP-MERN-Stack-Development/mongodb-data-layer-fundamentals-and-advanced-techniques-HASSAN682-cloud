//Find all books in a specific genre
db.books.find({ genre: "Fantasy" })

//Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } })

//Find books by a specific author
db.books.find({ author: "J.K. Rowling" })

//update the price of a specific book
db.books.updateOne(
  { title: "The Silent Ocean" },
  { $set: { price: 15.99 } }
)

//Delete a book by its title
db.books.deleteOne({ title: "The Art of Stillness" })

//Write a query to find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

//Use projection to return only the title, author, and price fields in your queries
db.books.find(
  { genre: "Science Fiction" },
  { title: 1, author: 1, price: 1, _id: 0 }
)
 
//Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({ price: 1 }) // Ascending
db.books.find().sort({ price: -1 }) // Descending

//Use the limit and skip methods to implement pagination (5 books per page)
db.books.find().skip(5).limit(5) // Page 2 (assuming 5 books per page)
  .pretty()

  //Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
])

//Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

//Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
  {
    $group: {
      _id: { $substr: ["$published_year", 0, 3] },
      bookCount: { $sum: 1 }
    }
  }
])

//Create an index on the title field for faster searches
db.books.createIndex({ title: 1 })

//Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

//Use the explain() method to demonstrate the performance improvement with your indexes
db.books.find({ title: "The Silent Ocean" }).explain("executionStats")

//create an index
db.books.createIndex({ title: 1 })

//run the same query again
db.books.find({ title: "The Silent Ocean" }).explain("executionStats")