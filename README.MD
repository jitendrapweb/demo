## API Endpoints

### 1. `POST /book`
- *Description:* Receives a new book entry and processes it.
- *Request Body:* JSON containing at least `title` and `author`.
- *Processing Logic:*
  - Check Redis to see if the book entry has been processed before.
  - If the book is not in Redis or has only a `received` status, proceed with processing.
  - Store the book entry in Redis with a status of `received`.
  - Send the book entry to a RabbitMQ queue for further processing.

### 2. Queue Processing
- Another part of the application reads from the RabbitMQ queue, processes the book message, and updates the Redis status for the book entry to `processed`.

## Redis Usage
- *Purpose:* Cache the book entries with two possible states:
  - `received`: When the book has been initially processed and queued.
  - `processed`: When the book has been processed from the queue.

## RabbitMQ Usage
- *Purpose:* Handle the queuing system to receive and process book entries from the API.

## Edge Cases
- If a book entry with the status `processed` is submitted again, it should not be reprocessed.
- Proper error handling is implemented to manage exceptions and provide meaningful error messages.

## Requirements

1. *Node.js* (v14+)
2. *Redis* (for caching)
3. *RabbitMQ* (for queue management)

## Installation and RUN

1. *Install Dependencies*
   ```bash
   npm isntall
   npm start

2. *In Another Tab use:*
    ```bash
    npm run consumer