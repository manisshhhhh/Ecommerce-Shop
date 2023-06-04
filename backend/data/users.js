import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Manish Yadav',
        email: 'manish@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Gunjan Verma',
        email: 'gunjan@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    }

];

export default users;