module.exports = {
    updateUserInfo: (req, res) => {
        const { firstName, lastName, userEmail } = req.body,
              { user_id } = req.params,
              db = req.app.get('db');

        db.users.update_user_info(user_id, firstName, lastName, userEmail)
            .then(user => {
                res.status(200).send(user[0])
            })
            .catch(err => res.status(500).send(err))
    }
}