import Joi from '@hapi/joi';

const UserSchema = Joi.object({
  id: Joi.string()
        .uuid()
        .required(),

  username: Joi.string()
              .min(3)
              .max(40)
              .required(),
        
  password: Joi.string()
              .min(8)
              .max(30)
              .required()           
});

export default UserSchema;