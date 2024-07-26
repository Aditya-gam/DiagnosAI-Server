// src/config/createUserTable.js
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB();

const params = {
  TableName: "Users",
  KeySchema: [
    { AttributeName: "email", KeyType: "HASH" }, // Partition key
  ],
  AttributeDefinitions: [{ AttributeName: "email", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

dynamoDB.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
