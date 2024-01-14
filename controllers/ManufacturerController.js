import ManufacturerModel from '../models/Manufacturer.js';

export const getAll = async (req, res) => {
	try {
		const manufacturers = await ManufacturerModel.find();

		res.json(manufacturers);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Failed to get manufacturers',
		});
	}
};
