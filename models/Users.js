import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema(
	{
		user_id: {
			type: Number,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		language: {
			type: String,
			required: true,
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
		points: {
			type: Number,
			default: 0,
		},
		purchase_amount: {
			type: Number,
			default: 0,
		},
	},
	{
		collection: 'users',
	},
);

export default mongoose.model('Users', UsersSchema);
