import 'dotenv/config';
import 'babel-polyfill';
import chai from 'chai';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';

import server from '../../index';
import { config } from '../db/config';
import { user } from './fixtures';
import models from '../models';

chai.use(chaiHttp);
const { expect } = chai;
const { NODE_ENV } = process.env;
// const database = new Database(mongoose, config[NODE_ENV].DATABASE_URL);

const { User, Product, Order, Cart } = models;

let token = '';
let userId = '';
let productId = '';

describe('test', () => {
	before((done) => {
		function clearDB() {
			var promises = [User.deleteOne().exec(), Product.deleteOne().exec()];
			Promise.all(promises).then(function () {
				done();
			});
		}

		if (mongoose.connection.readyState === 0) {
			mongoose.connect(config[NODE_ENV].DATABASE_URL, function (err) {
				if (err) throw err;
				return clearDB();
			});
		} else {
			return clearDB();
		}
	});

	describe('user tests', () => {
		it('should register a user when all inputs are correct', (done) => {
			chai.request(server)
				.post('/api/v1/users')
				.send(user)
				.end((error, response) => {
					userId = response.body.data._id;
					token = response.body.data.token;
					if (error) throw new Error(error);
					expect(response.statusCode).equal(201);
					expect(response.body.status).equal('success');
					expect(response.body.data.token).to.be.a('string');
					done();
				});
		});

		it('should sign in a user when credentials are correct', (done) => {
			chai.request(server)
				.get('/api/v1/users')
				.send(user)
				.end((error, response) => {
					if (error) throw new Error(error);
					expect(response.statusCode).equal(200);
					expect(response.body.status).equal('success');
					expect(response.body.data.token).to.be.a('string');
					done();
				});
		});
	});

	describe('product tests', () => {
		it('user should be able to post a products', (done) => {
			chai.request(server)
				.post('/api/v1/products')
				.set('Authorization', `Bearer ${token}`)
				.send({
					name: '53 Smart TV',
					category: 'electronics',
					description: 'Smart TV',
					price: 85000,
				})
				.end((error, response) => {
					if (error) throw new Error(error);
					productId = response.body.data._id;
					expect(response.statusCode).equal(201);
					expect(response.body.status).equal('success');
					expect(response.body.data).to.be.a('object');
					done();
				});
		});

		it('user should be able to get all products', (done) => {
			chai.request(server)
				.get('/api/v1/products')
				.set('Authorization', `Bearer ${token}`)
				.end((error, response) => {
					if (error) throw new Error(error);
					expect(response.statusCode).equal(200);
					expect(response.body.status).equal('success');
					done();
				});
		});

		it('user should be able to get a product', (done) => {
			chai.request(server)
				.get(`/api/v1/product/${productId}`)
				.set('Authorization', `Bearer ${token}`)
				.end((error, response) => {
					if (error) throw new Error(error);
					expect(response.statusCode).equal(200);
					expect(response.body.status).equal('success');
					done();
				});
		});
	});

	describe('cart tests', () => {
		it('should add a product to cart', (done) => {
			chai.request(server)
				.post(`/api/v1/cart`)
				.set('Authorization', `Bearer ${token}`)
				.send({
					productId,
					quantity: 1,
				})
				.end((error, response) => {
					if (error) throw new Error(error);
					expect(response.statusCode).equal(201);
					expect(response.body.status).equal('success');
					done();
				});
		});

		it('should get all items in a cart', (done) => {
			chai.request(server)
				.get(`/api/v1/cart`)
				.set('Authorization', `Bearer ${token}`)
				.end((error, response) => {
					if (error) throw new Error(error);
					expect(response.statusCode).equal(200);
					expect(response.body.status).equal('success');
					done();
				});
    });

		it('should remove all items in a cart', (done) => {
			chai.request(server)
				.get(`/api/v1/cart`)
        .set('Authorization', `Bearer ${token}`)
        .send({ userId, productId })
				.end((error, response) => {
					if (error) throw new Error(error);
					expect(response.statusCode).equal(200);
					expect(response.body.status).equal('success');
					done();
				});
		});
	});
});
