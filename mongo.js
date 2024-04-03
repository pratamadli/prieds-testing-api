const mongoose = require("mongoose");
const DB_URL = process.env.MONGO_URI;
const loadModels = require("./models");

module.exports = () => {
  console.log("DB_URL",process.env.MONGO_URI);

  const connect = () => {
    mongoose.Promise = global.Promise;
    mongoose
      .connect(process.env.MONGO_URI, {
        // keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify:false,
        dbName: process.env.DB_NAME,
      })
      .then(() => {
        let dbStatus = `*    DB Connection: OK\n****************************\n`;
        if (process.env.NODE_ENV !== "test") {
          // Prints initialization
          console.log("RUN SERVER");
            console.log("****************************");
            console.log("*    Starting Server       *");
            console.log(`*    Port: ${process.env.PORT || 3001}     *`);
          //   console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`);
            console.log(`*    Database: MongoDB     *`);
            console.log(dbStatus);
            console.log("****************************");
        }
      })
      .catch((err) => {
        let dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`;
        console.error(dbStatus);
      });
  };

  mongoose.set("strictQuery", false);
  connect();

  mongoose.connection.on("error", console.log);
  mongoose.connection.on("disconnected", connect);

  loadModels();
};
