const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
      username: {
          type: String,
          required: [true, "Username is required"]
      },

      password: {
          type: String,
          required: [true, "Password is required"]
      }
  },

  // Schema constructor settings
  {
      timestamps: {
          createdAt: "dateAdded",
          updatedAt: "dateUpdated"
      }
  }
);

const User = mongoose.model("User", userSchema);
                         //   |
                         // "User" -> "user" -> "users" collection


module.exports = User;
