

import UsersServices from './../services/users.services.js';

class UsersControlls {
  

  getAllUsers = async (req, res) => {
    try {
      const users = await UsersServices.allUsers();
      // res.json({ message: ' Usuarios', users: users });
    } catch (error) {
      res.json({ message: 'Error', error });
    }
  };

  createUser = async (req, res) => {
    const obj = req.body;

    try {
      const newUser = await UsersServices.createUser(obj);
      res.json({ message: ' Usuario Creado', user: newUser });
    } catch (error) {
      res.json({ message: 'Error', error });
    }
  };
}

export default new UsersControlls();
