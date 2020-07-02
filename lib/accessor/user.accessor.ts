import User from '../models/user.model';

const addUser = async (user: any) => {
  if (user instanceof User) {
    console.log('addd');
    await user.save();
  } else {
    throw new Error('Passed object is not of the type User');
  }
};

const getUser = async (username: string) => {
  let user = await User.findOne({
    where: {
      username: username
    }
  });

  return user;
};

const getUserById = async (userId: string) => {
  let user = await User.findOne({
    where: {
      id: userId
    }
  });
  return user;
};

const deleteUserById = async (userId: string) => {
  let result = await User.destroy({
    where: {
      id: userId
    }
  });

  return true;
}

export {
  addUser,
  getUser,
  getUserById,
  deleteUserById
};