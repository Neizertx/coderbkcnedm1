
import usersDAO from '../persistence/DAOs/factory.js';
const UsersDAOS = usersDAO.usersDAO

class UsersServices {
  allUsers = async () => {
    try {
      const users = await UsersDAOS.getAllUsers(); 
      return users;
    } catch (error) {
      return error;
    }
  };

  createUser = async (objUser) => {
    try {
      const users = await UsersDAOS(objUser); 
      return users;
    } catch (error) {
      return error;
    }
  };
}

export default new UsersServices(UsersDAOS);
