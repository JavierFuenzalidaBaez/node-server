//@imports
const fs = require("fs");
const Queue = require("bull");
const parseexcel = require("xlsx-parse-stream");
const through = require("through2");

//@constants
const lineQueue = new Queue("line_queue", "redis://redis:6380");

lineQueue.process((job, done) => {
  const { data } = job;
  setTimeout(() => {
    try {
      console.log(data);
      done();
    } catch (err) {
      done(new Error(err));
    }
  }, 2000);
});

exports.exampleTest = (req, res) => {
  const { file } = req.files;

  fs.createReadStream(file.tempFilePath)
    .pipe(parseexcel())
    .pipe(
      through.obj((row, _, cb) => {
        // row = the parsed object!
        lineQueue.add(
          { data: row },
          {
            attempts: 1,
          }
        );
        cb();
      })
    );

  res.send("example massive load success!");
};
