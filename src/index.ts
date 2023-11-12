// Import necessary modules from Mongoose
import { Document, Schema, model, Model, connect } from 'mongoose';

// Define an interface for the document
interface IExample extends Document {
  name: string;
  age: number;
  email: string;
}

// Define a schema for your MongoDB collection
const exampleSchema: Schema<IExample> = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
});

// Create a model using the schema
const ExampleModel: Model<IExample> = model('Example', exampleSchema);

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
const mongoDBUri = 'mongodb://127.0.0.1:27017/test';
connect(mongoDBUri, { })
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Example usage of the model
    const newExample = new ExampleModel({
      name: 'John Doe',
      age: 25,
      email: 'john.doe@example.com',
    });

    // Save the document to the MongoDB collection
    newExample.save()
      .then((result) => {
        console.log('Document saved:', result);
      })
      .catch((error) => {
        console.error('Error saving document:', error);
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
