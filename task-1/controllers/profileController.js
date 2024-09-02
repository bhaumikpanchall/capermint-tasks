const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const user = await User.findById(req.user);
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.json({ msg: 'Profile updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
