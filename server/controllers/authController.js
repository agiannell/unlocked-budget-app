const bcrypt = require('bcryptjs'),
      saltRounds = 10;

module.exports = {
    register: async(req, res) => {
        const { first_name, last_name, email, password } = req.body,
              profile_pic = '../img/default-profile-pic.svg',
              db = req.app.get('db');

        const [ foundUser ] = await db.users.check_user(email);
        if(foundUser) {
            return res.status(400).send('email already in use');
        };

        let salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const [ newUser ] = await db.users.register_user(first_name, last_name, email, hash, profile_pic);

        req.session.user = newUser;
        res.status(201).send(req.session.user);
    },
    login: async(req, res) => {
        const { email, password } = req.body,
              db = req.app.get('db');

        const [ foundUser ] = await db.users.check_user(email);
        if(!foundUser) {
            return res.status(404).send('account not found');
        };

        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if(!authenticated) {
            return res.status(401).send('password is incorrect')
        };

        delete foundUser.password
        req.session.user = foundUser;
        res.status(202).send(req.session.user)
    },
    logout: async(req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}