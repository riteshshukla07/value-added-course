const express = require('express');
const app = express();
const { createServer } = require('@vercel/node');

app.use(express.json());

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" }
];

// Routes
app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  book ? res.json(book) : res.status(404).send("Book not found");
});

app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");
  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
});

app.delete('/api/books/:id', (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.send("Book deleted");
});

module.exports = app;
