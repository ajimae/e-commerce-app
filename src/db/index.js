export default class Database {
	constructor(database, config) {
    this.database = database;
    this.config = config;
	}

	connect() {
    // create database
    // return this.database.connect(this.config);
    return this.database.connect(this.config, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}
