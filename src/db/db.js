import { MongoClient } from "mongodb";
let dbConnection;

export const connectToDb = async () => {
  if (dbConnection) return dbConnection; 
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    dbConnection = client.db("Reverse-Image-Database");
    console.log("Connected to the database");
    return dbConnection;
  } catch (err) {
    console.error("Failed to connect to the database", err);
    throw err;
  }
};

export const getDb = () => dbConnection;
