// dev dependencies
// const morgan = require("morgan");
// production
require("dotenv").config();
const server = require("./api/server");

// dev code
// server.use(morgan("dev"));

// production
const port = process.env.PORT || "5000"; 
server.listen(port,()=>console.log(`server is listening at ${port}`));