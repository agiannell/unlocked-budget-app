const bcrypt = require('bcryptjs'),
      saltRounds = 10;

module.exports = {
    register: async(req, res) => {
        const { firstName, lastName, email, password } = req.body,
              profile_pic = 'https://unlocked-default-pic.s3-us-west-1.amazonaws.com/default-profile-pic.svg',
              db = req.app.get('db');

        const [ foundUser ] = await db.users.check_user(email);
        if(foundUser) {
            return res.status(400).send('email already in use');
        };

        let salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const [ newUser ] = await db.users.register_user(firstName, lastName, email, hash, profile_pic);

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
    },
    getUser: async(req, res) => {
        if(req.session.user) {
            return res.status(200).send(req.session.user)
        }
        res.status(404).send('user not found')
    }
}