import UserModel from '../models/Users.js';

export const getPoints = async (req, res) => {
	try {
		const { user_id } = req.body;
		const user = await UserModel.findOne({ user_id });
		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			});
		}
		const points = user.points;
		res.json(points);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Failed to get points',
		});
	}
};
