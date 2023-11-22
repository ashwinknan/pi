const sequelize = require('./sequelize');
require('./models/participant');
require('./models/interview');
require('./models/study');

sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
});
