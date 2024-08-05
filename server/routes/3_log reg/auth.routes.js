const jwtConfig = require('../../config/jwtConfig');
const bcrypt = require('bcrypt');
const generateTokens = require('../../utils/generateToken');

/////////////
const { User } = require('../../db/models'); // Change here your Model and in your code
/////////////

const authRouter = require('express').Router();

authRouter.post('/reg', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      return res.status(400).json({ message: 'incorrect values' });
    }

    const userInDB = await User.findOne({ where: { email } });

    if (userInDB) {
      return res.status(400).json({ message: 'email is already used' });
    }

    const user = (
      await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      })
    ).get();

    delete user.password;

    const { refreshToken, accessToken } = generateTokens({ user });

    res
      .cookie(jwtConfig.refresh.type, refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      })
      .json({ message: 'you redigstred!', user, accessToken });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.trim() === '' || password.trim() === '') {
      return res.status(400).json({ message: 'incorrect values' });
    }

    const user = (await User.findOne({ where: { email } })).get();

    const passDB = user.password;
    const isValid = await bcrypt.compare(password, passDB);

    if (!isValid) {
      return res.status(400).json({ message: 'incorrect password' });
    }

    delete user.password;

    const { refreshToken, accessToken } = generateTokens({ user });

    res
      .cookie(jwtConfig.refresh.type, refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      })
      .json({ message: 'you loggin', user, accessToken });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

authRouter.delete('/logout', async (req, res) => {
  try {
    res
      .clearCookie(jwtConfig.refresh.type)
      .json({ accessToken: '', message: 'You logouted! Bye!' });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = authRouter;
