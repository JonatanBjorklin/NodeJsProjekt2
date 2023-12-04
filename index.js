const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

 const createUser = async (name, email, phone, img) =>  {
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                img,
            },
        });

        console.log('User created:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

module.exports = {
    createUser,
};