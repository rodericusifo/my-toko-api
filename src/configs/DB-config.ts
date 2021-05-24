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

        mongoose.connect(pathURI, connectionOptions);

        mongoose.connection.on(
            'error',
            console.error.bind(console, 'connection error:')
        );

        mongoose.connection.once('open', () => {
            console.log('Successfully connected to database');
        });
    }
}

export { DBConfig };
