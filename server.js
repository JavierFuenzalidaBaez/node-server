//@imports
const express = require("express");
const path = require("path");
const cors = require("cors");
const fileupload = require("express-fileupload");

//@routes
const exampleRouters = require("./app/routes/example");

//@constants
const PATH_TEMP_FILES = path.join(__dirname, "temp");
const PORT = 3000;
const CORS_OPTIONS = {
  origin: "*",
};

const app = express();

//@config app
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: PATH_TEMP_FILES,
    debug: true,
  })
);

//@all routes
app.use(exampleRouters);

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
