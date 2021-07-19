import mongoose from "mongoose";
import pusher from "pusher";
const url =
  "mongodb+srv://mern:mern@cluster0.opvaq.mongodb.net/mernslack?retryWrites=true&w=majority";
const connected = async () => {
  try {
    const dbConnected = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("Connected");
    const changeStream = mongoose.connection
      .collection("conversations")
      .watch();
    changeStream.on("change", (change) => {
      if (change.operationType === "insert") {
        pusher.trigger("channels", "newChannel", {
          change: change,
        });
      } else if (change.operationType === "update") {
        pusher.trigger("conversation", "newMessage", {
          change: change,
        });
      } else {
        console.log("Error triggering pusher");
      }
    });
  } catch (error) {
    console.log("error while Connecting" + error);
  }
};
export default connected;
