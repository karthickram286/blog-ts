import User from '../models/user.model';

const addUser = async (user: any) => {
  if (user instanceof User) {
    await user.save();
  } else {
    throw new Error('Passed object is not of the type User');
  }
};

const getUser = async (username: string) => {
  let user = await User.findAll({
    where: {
      username: username
    }
  });

  return user;
};

export {
  addUser,
  getUser
};