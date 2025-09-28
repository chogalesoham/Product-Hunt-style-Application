import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String },
    description: { type: String },
    websiteUrl: { type: String },
    logoUrl: { type: String },
    category: {
      type: String,
      enum: ['AI', 'SaaS', 'Devtools'],
      required: true,
    },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  },
  { timestamps: true },
);

const productModel = mongoose.model('Product', productSchema);
export default productModel;
