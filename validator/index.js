exports.userSignupValidator = (req, res, next) => {
  // since we have express-validator, we can use the following prompt
  req.check ('name', 'Name is required').notEmpty()
  req.check ('email', 'Email must be between 30 to 32 charachters')
      .matches(/.+\@.+\..+/)
      .withMessage('Email must contain @')
      .isLength({
        min: 4,
        max: 32
      });

      req.check('password', 'Password is required').notEmpty()
      req.check('password')
      .isLength({min: 6})
      .withMessage('Password must contain at least 6 charachters')
      .matches(/\d/) // at least one digit
      .withMessage("Password must contain a number");

      const errors = req.validationErrors();
      if (errors) {
        // map through each error
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
      }
       next();
    };
