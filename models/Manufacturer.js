import mongoose from 'mongoose';

const ManufacturerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		collection: 'manufacturer',
	},
);

export default mongoose.model('Manufacturer', ManufacturerSchema);
