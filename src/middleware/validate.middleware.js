module.exports = (schema, property = "body") => {
  return (req, res, next) => {
    const data = { ...req[property] };
    console.log(data);
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      //   const errors = error.details.map((err) => err.message);
      const errMsg = error.details[0]?.message;
      return res.status(400).json({ error: errMsg });
    }

    next();
  };
};
