import dotenv from 'dotenv';
import app from './src/app';

dotenv.config();

// unhandledRejection
process.on('unhandledRejection', function (reason, promise) {
	console.error('Unhandled rejection', { reason: reason, promise: promise });
});

process.on('uncaughtException', function (err) {
	console.error(err.stack);
});

// Start
app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`));

export default app;
