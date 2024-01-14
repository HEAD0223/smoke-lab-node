import StockModel from '../models/Stock.js';

export const getAll = async (req, res) => {
	try {
		const products = await StockModel.find();

		res.json(products);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Failed to get products',
		});
	}
};
