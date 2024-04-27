require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../../utils/authUtils');
const configJWT = require('../../middleware/configJWT');
const { Op } = require('sequelize');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client({
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  // https://github.com/MomenSherif/react-oauth/issues/12#issuecomment-1131408898
  redirectUri: 'postmessage',
});

router.post('/authorization', async (req, res) => {
  let user;
  try {
    const { username, password } = req.body;

    user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({
        message: 'Такого пользователя нет или пароль неверный',
      });
      return;
    }
    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      res.status(401).json({
        message: 'Такого пользователя нет или пароль неверный',
      });
      return;
    }
    user = await User.findOne({
      where: { id: user.id },
      attributes: ['id', 'username', 'img', 'email', 'user_level', 'theme_id'],
    });

    const { accessToken, refreshToken } = generateTokens({ user });

    res
      .status(200)
      .cookie(configJWT.access.type, accessToken, {
        maxAge: configJWT.access.expiresIn,
        httpOnly: true,
      })
      .cookie(configJWT.refresh.type, refreshToken, {
        maxAge: configJWT.refresh.expiresIn,
        httpOnly: true,
      })
      .json({ message: 'success', user });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/registration', async (req, res) => {
  let user;
  const regex = new RegExp('^[a-zA-Z0-9]+$');
  try {
    const { username, email, password, checkPassword } = req.body;
    if (username.includes(' ') || !regex.test(username)) {
      res.status(401).json({
        message:
          'Username должен состоять из латинских бук и не содержать пробелы!',
      });
      return;
    }

    if (password !== checkPassword) {
      res.status(401).json({ message: 'Пароли не совпадают!' });
      return;
    }

    user = await User.findOne({
      where: { [Op.or]: [{ username: username }, { email: email }] },
    });

    if (user) {
      res.status(401).json({ message: 'Такой пользователь уже есть!' });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    user = await User.create({
      username,
      email,
      img: '/img/avatars/default.png',
      password: hash,
    });

    user = await User.findOne({
      where: { id: user.id },
      attributes: ['id', 'username', 'img', 'email', 'user_level', 'theme_id'],
    });

    const { accessToken, refreshToken } = generateTokens({ user });
    res
      .cookie(configJWT.access.type, accessToken, {
        maxAge: configJWT.access.expiresIn,
        httpOnly: true,
      })
      .cookie(configJWT.refresh.type, refreshToken, {
        maxAge: configJWT.refresh.expiresIn,
        httpOnly: true,
      })
      .json({ message: 'success', user });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/check', async (req, res) => {
  try {
    if (res.locals.user) {
      const user = await User.findOne({
        where: { id: res.locals.user.id },
        attributes: [
          'id',
          'username',
          'img',
          'email',
          'user_level',
          'theme_id',
        ],
      });

      res.json({ message: 'success', user });
      return;
    }
    res.json({ message: 'Сначала войдите в свой аккаунт' });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/logout', (req, res) => {
  try {
    res.clearCookie(configJWT.access.type).clearCookie(configJWT.refresh.type);
    res.json({ message: 'success' });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/google', async (req, res) => {
  try {
    const googleRes = await client.getToken(req.body.code);
    const info = await client.getTokenInfo(googleRes.tokens.access_token);
    console.log(info.email);
    const email = info.email;
    const index = email.indexOf('@');
    const username = email.slice(0, index);
    console.log(username);
    const user = await User.findOrCreate({
      where: { google_id: info.sub },
      defaults: {
        username,
        password: info.sub,
        email,
        img: '/img/avatars/default.png',
      },
    });

    const { accessToken, refreshToken } = generateTokens({ user: user[0] });
    res
      .cookie(configJWT.access.type, accessToken, {
        maxAge: configJWT.access.expiresIn,
        httpOnly: true,
      })
      .cookie(configJWT.refresh.type, refreshToken, {
        maxAge: configJWT.refresh.expiresIn,
        httpOnly: true,
      })
      .json({ message: 'success', user: user[0] });
  } catch (error) {}
});

module.exports = router;
