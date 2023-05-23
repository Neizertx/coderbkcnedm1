import { userModel } from '../../mongo/models/user.model.js';


export default class UserMongoManger {
  async getAllUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(objUser) {
    try {
    
      const newUser = await userModel.create(objUser);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
}
