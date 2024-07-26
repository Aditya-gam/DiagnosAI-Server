// src/models/user.js
const dynamoDB = require('../config/db');

class User {
  static async getUserByEmail(email) {
    const params = {
      TableName: "Users",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email
      }
    };

    try {
      const data = await dynamoDB.query(params).promise();
      return data.Items[0]; // Assuming email is unique
    } catch (err) {
      console.error('DynamoDB Error', err);
      return null;
    }
  }

  static async createUser(userData) {
    const params = {
      TableName: "Users",
      Item: userData
    };

    try {
      await dynamoDB.put(params).promise();
      return userData;
    } catch (err) {
      console.error('DynamoDB Error', err);
      return null;
    }
  }
}

module.exports = User;
