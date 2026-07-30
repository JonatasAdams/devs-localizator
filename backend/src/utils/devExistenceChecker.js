module.exports = function DevExistenceChecker(github_username, res) {
    if (!github_username) {
        return res.status(400).json({ error: 'Favor informar um usuário válido' });
    };
};