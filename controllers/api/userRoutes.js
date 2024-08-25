const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Signup route
router.post('/', async (req, res) => {
  try {
    const existingUser = await User.findOne({ where: { username: req.body.username } });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already in use. Please choose a new username.' });
    }

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password, // The model's beforeCreate hook will hash this
    });

    req.session.user_id = newUser.id;
    req.session.logged_in = true;

    await req.session.save();

    res.status(200).json({ user: newUser.username, message: 'Signup successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res.status(400).json({ message: 'Incorrect username or password, please try again' });
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect username or password, please try again' });
    }

    req.session.user_id = user.id;
    req.session.logged_in = true;

    await req.session.save();

    res.status(200).json({ user: user.username, message: 'You are now logged in!' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


// Logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to logout' });
      }
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
