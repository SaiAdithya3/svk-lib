import mongoose from "mongoose";

export default {
  connectDB: () => {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    mongoose.connection.on("error", (err) => {
      console.log(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });
  },
  disconnect: () => {
    mongoose.disconnect();
  },
};
