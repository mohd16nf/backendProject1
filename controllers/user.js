const User = require('../models/user')


const homeRoute = async (req, res) => {
    try {
        const allDbUsers = await User.find({});
        const html = `
        <ul>
            ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}<li/>`).join('')}
        </ul>`

        res.send(html);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server Error');
    }
};

const handleAllUsers = async (req, res) =>{
    const allDbUsers = await User.find({})
    res.status(200).send(allDbUsers)
}


const getUserById = async (req, res) =>{
    const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({erro: 'user not found'})
        return res.json(user)
}

const updateUserById = async (req, res) => {
    try {
        // Extract user details from the request body
        const { first_name, last_name, email, gender, jobTitle } = req.body;

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                first_name: first_name || undefined, // Update if provided
                last_name: last_name || undefined,
                email: email || undefined,
                gender: gender || undefined,
                jobTitle: jobTitle || undefined,
            },
            { new: true, runValidators: true } // Return the updated user and run validators
        );

        if (!updatedUser) {
            return res.status(404).json({ status: 'User not found' });
        }

        return res.json({ status: 'Success', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ status: 'Error updating user', error: error.message });
    }
};


const deleteUserById = async(req, res) =>{
    // delete user with the id
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: 'User deleted successfully'})
}

const createUser = async (req, res) => {
    // Create user with the provided data
    const newUser = req.body;

    // Validate required fields
    if (
        !newUser ||
        !newUser.first_name ||
        !newUser.last_name ||
        !newUser.gender ||
        !newUser.email ||
        !newUser.jobTitle
    ) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        // Create a new user document in the database
        const result = await User.create({
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            gender: newUser.gender, // Corrected this line
            jobTitle: newUser.jobTitle
        });

        console.log(result);
        return res.status(201).json({ msg: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error creating user' });
    }
}




module.exports ={
    homeRoute,
    handleAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createUser
}