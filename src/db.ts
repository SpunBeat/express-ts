import { connect, connection } from 'mongoose';

export const db = {
  connectTo: (dbUrl = 'mongodb://localhost:27017/test') => {
    // 1. Mongoose Configuration
    connect(dbUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    
    // 2. Mongoose Hooks
    const db = connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', console.log.bind(console, 'Connected'))
  }
} 
