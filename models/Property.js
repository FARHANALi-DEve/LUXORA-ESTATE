import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true, index: true },
  name: { type: String, required: true }, location: String, city: String, country: String,
  price: Number, beds: Number, baths: Number, area: Number, category: String, tag: String,
  image: String, gallery: [String], description: String, features: [String],
  featured: Boolean, status: String
}, { timestamps: true });
export default mongoose.models.Property || mongoose.model('Property', schema);
