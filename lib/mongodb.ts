import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb+srv://jeerihaveli:jee@admin$2025@jeerihaveli.lekk9m3.mongodb.net/?retryWrites=true&w=majority&appName=JeeRiHaveli"
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
} else {
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
}

export default clientPromise 