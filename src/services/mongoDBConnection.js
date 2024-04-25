import mongoose from "mongoose";

let isConnected = false;

export function mongoDBConnection(uri = "mongodb+srv://guptavaibhav24042001:sYfgvKUm7OyJRYjp@cluster0.nyjqcwe.mongodb.net/todocrud2") {
  if (!isConnected && uri) {
    mongoose
      .connect(uri)
      .then(() => console.log(`MongoDB connected in ${uri}!!`))
      .catch(console.error);
    isConnected = true;
  }else{
    console.log("error")
  }
}
