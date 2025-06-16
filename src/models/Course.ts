import mongoose, { model } from 'mongoose';

const CourseSchema = new mongoose.Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 }
}, { timestamps: true });

export default model('Course', CourseSchema);