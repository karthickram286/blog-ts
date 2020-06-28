import Joi from '@hapi/joi';

const PostSchema = Joi.object({
  id: Joi.string()
        .uuid()
        .required(),

  title: Joi.string()
          .max(30)
          .required,
  
  body: Joi.string()
          .max(5000)
          .required(),

  author_id: Joi.string()
              .required(),

  created_at: Joi.string()
                .required()
});

export default UserSchema;