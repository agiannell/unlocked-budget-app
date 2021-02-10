module.exports = {
    getUserTransactions: (req, res) => {
        const { userId } = req.params,
              db = req.app.get('db');

        db.transactions.get_trans_by_user(userId)
            .then(trans => {
                res.status(200).send(trans)
            })
            .catch(err => res.status(500).send(err))
    },
    createTransaction: (req, res) => {
        const { user_id, catId, type, name, date, amount, notes } = req.body,
              db = req.app.get('db');

        db.transactions.create_transaction(user_id, catId, type, name, date, amount, notes)
            .then(trans => {
                res.status(200).send(trans)
            })
            .catch(err => res.status(500).send(err))
    },
    getSumByCategory: (req, res) => {
        const { catId } = req.params,
              db = req.app.get('db');

        db.transactions.get_sum_by_cat(catId)
            .then(sum => {
                res.status(200).send(sum[0])
            })
            .catch(err => res.status(500).send(err))

    },
    deleteTransaction: (req, res) => {

    }
}