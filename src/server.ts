import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 3000;

// Kết nối database trước khi khởi động server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed', error);
    process.exit(1);
  });