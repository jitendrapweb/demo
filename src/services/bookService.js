const redisClient = require("../config/redis");
const connectRabbitMQ = require("../config/rabbitmq");

//   Receives a new book entry and processes it.
async function addBook(req, res) {
  const { title, author } = req.body;

  //   Check if title and author are provided
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  //  Check if book has already been processed
  const bookKey = `book:${title}:${author}`;

  //  If the book has been processed, return an error
  const status = await redisClient.get(bookKey);

  if (status === "processed") {
    return res.status(400).json({ error: "Book already processed" });
  }

  //  If the book has not been processed, set the status to "received"
  redisClient.set(bookKey, "received");

  //  Send the book to the RabbitMQ queue
  const channel = await connectRabbitMQ();
  await channel.assertQueue("book_queue", { durable: true });
  channel.sendToQueue(
    "book_queue",
    Buffer.from(JSON.stringify({ title, author }))
  );

  //  Return a success response
  res.status(200).json({ message: "Book received and queued for processing" });
}

module.exports = { addBook };
