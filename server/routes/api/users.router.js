const router = require('express').Router();
const { User, Result, Level } = require('../../db/models');
const bcrypt = require('bcrypt');
const fileupload = require('../../utils/fileupload');

//GET All Users
router.get('/loadAll', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Result,
          include: [
            {
              model: Level,
            },
          ],
        },
      ],
    });
    res.json(users);
  } catch ({ message }) {
    res.json({ message });
  }
});

//GET One User
router.get('/profile/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username } });
    res.json(user);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put('/updateLevel', async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { level } = req.body;

    const user = await User.findOne({
      where: { id },
    });

    if (user) {
      const result = await User.update(
        { user_level: level },
        { where: { id } }
      );

      if (result[0]) {
        res.json({ message: 'success' });
        return;
      }
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put('/updateTheme', async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { theme_id } = req.body;

    const user = await User.findOne({
      where: { id },
    });

    if (user) {
      const result = await User.update({ theme_id }, { where: { id } });

  if (result[0]) {
      const user = await User.findOne({ where: { id } })
      res.json({ message: 'success', user })
      return
  }
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

//Update User
router.put('/update', async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { email, password } = req.body;
    let data = {};
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      res.status(401).json({ message: 'Эта почта нам не нравится.' });
      return;
    }

    if (req.files) {
      const file = req.files.url;
      const img = await fileupload(file);
      data.img = img;
    }
    if (password.length > 0) {
      const hash = await bcrypt.hash(password, 10);
      data.password = hash;
    }
    if (email) {
      data.email = email;
    }

    const result = await User.update(data, { where: { id } });

    if (result[0]) {
      const user = await User.findOne({ where: { id } });
      res.json({ message: 'success', user });
      return;
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
