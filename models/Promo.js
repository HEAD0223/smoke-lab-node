import mongoose from 'mongoose';

const PromoSchema = new mongoose.Schema(
	{
		user_id: {
			type: Number,
			required: true,
		},
		promoName: {
			type: String,
			required: true,
		},
		usage: {
			type: Number,
			required: true,
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
	},
	{
		collection: 'promos',
	},
);

export default mongoose.model('Promo', PromoSchema);
