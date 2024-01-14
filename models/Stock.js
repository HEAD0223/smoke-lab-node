import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema(
	{
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
	{
		collection: 'stock',
	},
);

export default mongoose.model('Stock', StockSchema);
