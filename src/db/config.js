import 'dotenv/config';

export const config = {
	development: {
		DATABASE_URL: process.env.DATABASE_URL,
	},
	test: {
		DATABASE_URL: process.env.DATABASE_TEST_URL,
	}
};
