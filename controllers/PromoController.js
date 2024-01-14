import PromoModel from '../models/Promo.js';

export const getAll = async (req, res) => {
	try {
		const promos = await PromoModel.find();
		res.json(promos);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Failed to get promos',
		});
	}
};
