const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const { PORT_DB, IP_SERVER, API_VERSION } = require("./config");

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose.connect(
  `mongodb://${IP_SERVER}:${PORT_DB}/reportsDB`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) {
      console.log("Connection error");
      throw err;
    } else {
      app.listen(PORT, () => {
        console.log("------------- SERVER ON -------------");
        console.log(`SERVER: http://${IP_SERVER}:${PORT}/api/${API_VERSION}/`);
      });
    }
  }
);
