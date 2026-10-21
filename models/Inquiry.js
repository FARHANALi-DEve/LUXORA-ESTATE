import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true }, email: { type: String, required: true },
  phone: String, property: String, message: String,
  requestType: {type: String, enum: ['Inquiry','Viewing'], default:'Inquiry'},
  viewingDate: String, viewingTime: String,
  status: { type: String, enum: ['New','Contacted','Closed'], default: 'New' }
}, { timestamps: true });
export default mongoose.models.Inquiry || mongoose.model('Inquiry', schema);
