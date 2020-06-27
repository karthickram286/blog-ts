import User from '../models/user.model';

const addUser = async (user: any) => {
  await user.save();
}

const getUser = async (username: string) => {
  let user = await User.findOne({
    username: username
  });

  return user;
}

export {
  addUser,
  getUser
}