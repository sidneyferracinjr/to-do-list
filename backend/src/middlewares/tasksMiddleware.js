const validateBody = (req, res, next) => {
    const { title, description, deadline } = req.body;
        const { body} = req;
        if (body.title == undefined) {
           return res.status(400).json({ message: 'The field "tittle" is required' });
        }

        if (body.title == '') {
           return res.status(400).json({ message: '"title cannot be empty"' });
        }

        next();
}

module.exports = {
    validateBody,
};