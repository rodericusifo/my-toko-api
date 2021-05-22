import mongoose from 'mongoose';

class DBConfig {
    static connectDB(): void {
        const pathURI = process.env.DB_HOST!;
        const connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
        // do connection
        mongoose.connect(pathURI, connectionOptions);
        // failed to connect
        mongoose.connection.on(
            'error',
            console.error.bind(console, 'connection error:')
        );
        // successfully connect
        mongoose.connection.once('open', () => {
            console.log('Successfully connected to database');
        });
    }
}

export { DBConfig };
