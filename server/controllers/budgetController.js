module.exports = {
    createGroup: (req, res) => {
        const { user_id, groupName } = req.body,
              db = req.app.get('db');

        db.budget.create_group(user_id, groupName)
            .then(group => res.status(200).send(group))
            .catch(err => res.status(500).send(err));
    },
    createCategory: (req, res) => {
        const { group_id, user_id, categoryName, categoryAmount } = req.body,
              db = req.app.get('db');

        db.budget.create_category(group_id, user_id, categoryName, categoryAmount)
            .then(cat => res.status(200).send(cat))
            .catch(err => res.status(500).send(err));
    },
    getUserGroups: (req, res) => {
        const { userId } = req.params,
              db = req.app.get('db');

        db.budget.get_user_groups(userId)
            .then(groups => res.status(200).send(groups))
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
    },
    getCategories: (req, res) => {
        const { groupId } = req.params,
              db = req.app.get('db');
        
        db.budget.get_categories(groupId)
            .then(cat => res.status(200).send(cat))
            .catch(err => res.status(500).send(err));
    },
    updateGroup: (req, res) => {
        const { groupName } = req.body,
              { groupId } = req.params,
              db = req.app.get('db');

        db.budget.update_group(groupId, groupName)
            .then(group => res.status(200).send(group))
            .catch(err => res.status(500).send(err));
    },
    updateCategory: (req, res) => {
        const { catName, catAmount } = req.body,
              { catId } = req.params,
              db = req.app.get('db');

        db.budget.update_category(catId, catName, catAmount)
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err));
    },
    deleteGroup: (req, res) => {
        const { groupId } = req.params,
              db = req.app.get('db');

        db.budget.delete_group(groupId)
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err));
    },
    deleteCategory: (req, res) => {
        const { catId } = req.params,
              db = req.app.get('db');

        db.budget.delete_category(catId)
            .then(cat => res.status(200).send(cat))
            .catch(err => res.status(500).send(err));
    },
    categorySum: (req, res) => {
        const { userId, groupName } = req.params,
              db = req.app.get('db');

        db.budget.get_category_sum(userId, groupName)
            .then(sum => {
                res.status(200).send(sum)
            })
            .catch(err => res.status(500).send(err));
    },
    expenseSum: (req, res) => {
        const { userId } = req.params,
              db = req.app.get('db');

        db.budget.get_expense_sum(userId)
            .then(sum => {
                res.status(200).send(sum)
            })
            .catch(err => res.status(500).send(err));
    },
    getUserCategories: (req, res) => {
        const { userId } = req.params,
              db = req.app.get('db');

        db.budget.get_user_categories(userId)
            .then(cat => {
                res.status(200).send(cat);
            })
            .catch(err => res.status(500).send(err));
    }
}