const { MongoClient } = require('mongodb');

    // Connection URI
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Database and collection names
    const dbName = 'todolist';
    const collectionName = 'tasks';
    
    // Connect to MongoDB
    client.connect(async (err) => {
      if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
      }
    
      console.log('Connected to MongoDB');
    
      // Get reference to the database
      const db = client.db(dbName);
    
      // Get reference to the tasks collection
      const tasksCollection = db.collection(collectionName);
    
      // Example: Insert a task
      const taskToInsert = {
        task: 'Complete the MongoDB tutorial',
        dueDate: new Date('2023-12-31'),
        completed: false,
      };
    
      const insertResult = await tasksCollection.insertOne(taskToInsert);
      console.log('Inserted task:', insertResult.ops[0]);
    
      // Example: Retrieve tasks
      const tasks = await tasksCollection.find({}).toArray();
      console.log('All tasks:', tasks);
    
      // Close the connection
      client.close();
    });