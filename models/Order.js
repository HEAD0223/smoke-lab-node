import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
	product: {
		code: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		manufacturer: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		volume: {
			type: String,
			required: true,
		},
		flavours: [
			{
				flavour: {
					type: String,
					required: true,
				},
				amount: {
					type: String,
					required: true,
				},
				gradient1: {
					type: String,
					required: true,
				},
				gradient2: {
					type: String,
					required: true,
				},
				image: {
					type: String,
					required: true,
				},
			},
		],
	},
	flavorsInCart: [
		{
			flavour: {
				type: String,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
		},
	],
});

const OrderSchema = new mongoose.Schema(
	{
		user_id: {
			type: Number,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
		status: {
			type: String,
			required: true,
		},
		cart: {
			type: [CartSchema],
			required: true,
		},
		info: {
			promo: { type: String, default: '' },
			points: { type: Number, default: 0 },
			name: { type: String, required: true },
			phone: { type: String, required: true },
			address: { type: String, required: true },
			comment: { type: String, default: '' },
		},
	},
	{
		collection: 'orders',
	},
);

export default mongoose.model('Order', OrderSchema);
