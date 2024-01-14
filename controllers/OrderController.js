import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import AdminsModel from '../models/Admins.js';
import OrderModel from '../models/Order.js';
import StockModel from '../models/Stock.js';

dotenv.config();

export const save = async (req, res) => {
	try {
		const combinedData = req.body;
		const existingOrder = await OrderModel.findOne({ user_id: combinedData.user_id });
		if (existingOrder) {
			return res.status(409).json({ message: 'User order already exists' });
		}
		const newOrder = new OrderModel({
			user_id: combinedData.user_id,
			username: combinedData.username,
			created_at: combinedData.created_at,
			status: combinedData.status,
			cart: combinedData.cart,
			info: {
				promo: combinedData.info.promo,
				points: combinedData.info.points,
				name: combinedData.info.name,
				phone: combinedData.info.phone,
				address: combinedData.info.address,
				comment: combinedData.info.comment,
			},
		});
		const validationError = newOrder.validateSync();
		if (validationError) {
			console.log(validationError);
			throw new Error('Data validation error');
		}
		const savedOrder = await newOrder.save();

		// Update the stock by decrementing the ordered quantity for each product and flavor
		for (const cartItem of combinedData.cart) {
			const productCode = cartItem.product.code;
			const flavorsInCart = cartItem.flavorsInCart;
			for (const flavorItem of flavorsInCart) {
				const flavorName = flavorItem.flavour;
				const orderedQuantity = flavorItem.quantity;
				const productInStock = await StockModel.findOne({ code: productCode });
				if (!productInStock) {
					console.error(`Product with code ${productCode} not found in stock.`);
				} else {
					const flavorInProduct = productInStock.flavours.find(
						(flavor) => flavor.flavour === flavorName,
					);
					if (!flavorInProduct) {
						console.error(
							`Flavor "${flavorName}" not found in product with code ${productCode}.`,
						);
					} else {
						const updatedAmount = parseInt(flavorInProduct.amount) - orderedQuantity;
						if (updatedAmount < 0) {
							console.error(
								`Ordered quantity (${orderedQuantity}) exceeds available stock for flavor "${flavorName}" in product with code ${productCode}.`,
							);
						} else {
							flavorInProduct.amount = updatedAmount.toString();
							await StockModel.updateOne(
								{ code: productCode },
								{ $set: { flavours: productInStock.flavours } },
							);
						}
					}
				}
			}
		}

		// Fetch admin emails
		const admins = await AdminsModel.find({}, { email: 1 });
		const adminList = admins.map((admin) => admin.email);
		// Send email to admins from admin_list
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_PASS,
			},
		});
		// Generate the HTML content of the email using the order data
		const itemDetails = savedOrder.cart
			.map((item) => {
				const totalQuantity = item.flavorsInCart.reduce(
					(total, flavor) => total + flavor.quantity,
					0,
				);
				const totalQuantityPrice = totalQuantity * item.product.price;

				const flavorsDetails = item.flavorsInCart
					.map((flavor) => {
						return `
							<tr style="display:flex;">
								<td>${flavor.flavour}</td>
								<td style="margin-left: auto; padding-left: 20px;">x ${flavor.quantity}</td>
							</tr>
						`;
					})
					.join('');

				const productInfo = `
					<td>
						${item.product.name}<br>
						<i>${totalQuantity} x ${item.product.price} MDL</i>
					</td>
					<td>
						<table style="width: 100%">
							${flavorsDetails}
						</table>
					</td>
					<td>${totalQuantityPrice} MDL</td>
				`;

				return `
					<tr>
						${productInfo}
					</tr>
				`;
			})
			.join('');

		const totalFlavorsPrice = savedOrder.cart.reduce((total, item) => {
			const totalQuantity = item.flavorsInCart.reduce(
				(total, flavor) => total + flavor.quantity,
				0,
			);
			const totalQuantityPrice = totalQuantity * item.product.price;
			return total + totalQuantityPrice;
		}, 0);

		const rows = [];
		const totalPriceWithPoints = totalFlavorsPrice - savedOrder.info.points;

		if (savedOrder.info.promo !== '') {
			rows.push(`<tr><td>Promo code:</td><td>${savedOrder.info.promo}</td></tr>`);
		}
		if (savedOrder.info.points !== 0) {
			rows.push(`<tr><td>Points used:</td><td>${savedOrder.info.points} points</td></tr>`);
		}
		rows.push(`<tr><td>Total Price:</td><td>${totalPriceWithPoints} MDL</td></tr>`);

		const addressLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
			savedOrder.info.address,
		)}`;
		const htmlContent = `
			<p>A new order has been created.</p>
			<h2>Order Details:</h2>
			<table border="1" cellspacing="0" cellpadding="5">
				<thead>
					<tr>
						<th>Product</th>
						<th>Flavors</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					${itemDetails}
				</tbody>
			</table>
			<table border="1" cellspacing="0" cellpadding="5" style="margin-top: 20px;">
				<tbody>
					${rows.join('')}
				</tbody>
			</table>
			<h3>User Info:</h3>
			<p>Name: ${savedOrder.info.name}</p>
			<p>Phone: ${savedOrder.info.phone}</p>
			<p>Address: <a href="${addressLink}" target="_blank">${savedOrder.info.address}</a></p>
			<p>Comment: ${savedOrder.info.comment}</p>
		 `;
		// Get the current date in MM.DD format
		const currentDate = new Date().toLocaleDateString('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit',
		});
		const subject = `New Order Created - ${currentDate} - @${combinedData.username} (${combinedData.user_id})`;
		// Email content
		const mailOptions = {
			from: process.env.GMAIL_USER,
			to: adminList.join(','),
			subject: subject,
			text: 'A new order has been created.',
			html: htmlContent,
		};
		// Send the email
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		res.status(201).json(savedOrder);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to save order',
		});
	}
};
