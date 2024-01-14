import mongoose from 'mongoose';

const AdminsSchema = new mongoose.Schema(
	{
		user_id: {
			type: Number,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		email: {
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
	},
	{
		collection: 'admins',
	},
);

export default mongoose.model('Admins', AdminsSchema);
