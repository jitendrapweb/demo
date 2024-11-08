const app = require("./config/app");
const { port } = require("./config/environment-vars");


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
