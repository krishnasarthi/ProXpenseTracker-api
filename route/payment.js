'use strict';

var _ = require('lodash');
var Payment = require('../model/payment.js');
var response = require('../services/response.js');
var queryBuilderService = require('../services/queryBuilder.js');

module.exports = function (app) {
	/* Create */
	app.post('/payment', function (req, res) {
		var payment = new Payment(req.body);
		payment.save(function (err) {
			if (err) {
				res.json({ info: 'Error in saving new Payment' });
			}
			res.json({ info: 'New Payment saved successfully' });
		})
	});

	/* Read */
	app.get('/payment', function (req, res) {
		var queryString = req.query;

		var builder = queryBuilderService.parseQueryString(queryString, Payment);

		builder.searchQuery.exec(function (err, payments) {
			if (err) {
				res.json(response.errorResponse(err));
			}
			response.successObject.data = payments;

			builder.countQuery.exec(function (err, count) {
				if (err) {
					res.json(response.errorResponse(err));
				}
				response.successObject.pageCount = count;
				res.json(response.successResponse(response.successObject));
			});
		});
	});

	/* Read by Id */
	app.get('/payment/:id', function (req, res) {
		Payment.findById(req.params.id, function (err, payment) {
			if (err) {
				res.json({ info: 'Error in finding Payment', error: err });
			}
			res.json({ info: 'Payment found successfully', data: payment });
		});
	});

	/* Update */
	app.put('/payment/:id', function (req, res) {
		Payment.findById(req.params.id, function (err, payment) {
			if (err) {
				res.json({ info: 'Error finding the Payment' });
			}
			if (payment) {
				_.merge(payment, req.body);
				payment.save(function (err) {
					if (err) {
						res.json({ info: 'Error in saving new Payment' });
					}
					res.json({ info: 'Payment saved successfully' });
				});
			}
		});
	});

	/* Delete */
	app.delete('/payment/:id', function (req, res) {
		Payment.findByIdAndRemove(req.params.id, function (err) {
			if (err) {
				res.json({ info: 'Failed to delete Payment' });
			}
			res.json({ info: 'Payment deleted successfully' });
		});
	});

	/* Search API */
	// app.post('/payment/search', function (req, res) {
	// 	var builder = queryBuilderService.parseFilter(req.body, Payment);

	// 	console.log(builder.searchQuery.getQuery());

	// 	builder.searchQuery.exec(function (err, payments) {
	// 		if (err) {
	// 			res.json(response.errorResponse(err));
	// 		}
	// 		response.successObject.data = payments;

	// 		builder.countQuery.exec(function (err, count) {
	// 			if (err) {
	// 				res.json(response.errorResponse(err));
	// 			}
	// 			response.successObject.pageCount = count;
	// 			res.json(response.successResponse(response.successObject));
	// 		});
	// 	});
	// });
};