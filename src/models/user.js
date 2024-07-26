import dynamoDB from "../config/db.js";

class User {
  static async getUserByEmail(email) {
    const params = {
      TableName: "Users",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    try {
      const data = await dynamoDB.query(params).promise();
      return data.Items[0]; // Assuming email is unique
    } catch (err) {
      console.error("DynamoDB Error", err);
      return null;
    }
  }

  static async createUser(userData) {
    const params = {
      TableName: "Users",
      Item: userData,
    };

    try {
      await dynamoDB.put(params).promise();
      return userData;
    } catch (err) {
      console.error("DynamoDB Error", err);
      return null;
    }
  }

  static async updateLastLogin(email) {
    const params = {
      TableName: "Users",
      Key: {
        email: email,
      },
      UpdateExpression: "set last_login = :last_login",
      ExpressionAttributeValues: {
        ":last_login": new Date().toISOString(),
      },
      ReturnValues: "UPDATED_NEW",
    };

    try {
      const data = await dynamoDB.update(params).promise();
      return data.Attributes;
    } catch (err) {
      console.error("DynamoDB Error", err);
      return null;
    }
  }
}

export default User;
