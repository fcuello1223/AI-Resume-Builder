import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected Succesfully!");
    });

    let mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MongoDB environment variable not set!");
    }

    if (mongoURI.endsWith("/")) {
      mongoURI = mongoURI.slice(0, -1);
    }

    const projectName = "resume-builder";

    await mongoose.connect(`${mongoURI}/${projectName}`);
  } catch (error) {
    console.error("Error Connecting to MongoDB: ", error);
  }
};

export default connectDB;
