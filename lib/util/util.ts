const schemaValidate = async (schema: any, object: any) => {
  let isValid = await schema.validate(object);
  if (isValid.error) {
    console.log(isValid.error.details);
    return false;
  }
  return true;
};

export {
  schemaValidate
}