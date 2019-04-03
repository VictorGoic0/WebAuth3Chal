const fs = require("fs");
const faker = require("faker");
const bcrypt = require("bcryptjs");

const createFakeUser = () => ({
  username: faker.internet.userName(),
  password: faker.internet.password()
});

exports.seed = function(knex, Promise) {
  const fakeUsers = [];

  for (let i = 0; i < 100; i++) {
    fakeUsers.push(createFakeUser());
  }

  fs.writeFileSync("./authTestInfo.json", JSON.stringify({ users: fakeUsers }));

  fakeUsers.map(user => {
    user.password = bcrypt.hashSync(user.password, 8);
    user.department = "placeholder department";
  });

  return knex("users").insert(fakeUsers);
};
