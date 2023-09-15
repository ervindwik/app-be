const { User } = require("../models");

class UsersRepository {


    // ------------------------- Handle Get All Users ------------------------- //

    static async handleGetAllUsers(){
        const handleGetAllUsers = await User.findAll();

        return handleGetAllUsers;
    };

    // ------------------------- End Handle Get All Users ------------------------- //


    // ------------------------- End Handle Get User By Id ------------------------- //

    static async handleGetUserById({ id }){
        const handleGetUserById = await User.findOne({
            where: { id }
        });

        return handleGetUserById;
    }

    // ------------------------- End Handle Get User By Id ------------------------- //



    // ------------------------- Get User By Username  ------------------------- //

    static async getUserByUsername({ username }) {
        const getUserUsername = await User.findOne({
            where: {
                username: username
            }
        });

        return getUserUsername;
    };

    // ------------------------- End Get User By Username  ------------------------- //


    static async registerUser({ nama, username, password}) {
        const registeredUser = User.create({
            nama,
            username,
            password 
        });

        return registeredUser;
    };


    // ------------------------- Register User  ------------------------- //
    
    static async createNewUser({ nama, username, password, nomorKaryawan, tglLahir }) {
        const createdUser = User.create({
            nama,
            username,
            password,
            nomorKaryawan,
            tglLahir
        });

        return createdUser;
    };
    
    // ------------------------- End Register User  ------------------------- //


    
    // ------------------------- Update User (Complete Account Info)  ------------------------- //
    
    static async handleUpdateUsers({ id, nama, username, password, nomorKaryawan, tglLahir }) {

        const updatedUser = await User.update({
            nama,
            username,
            password,
            nomorKaryawan,
            tglLahir
        }, {
            where: { id },
        });

        return updatedUser;
        
    };

    // ------------------------- End Update User (Complete Account Info)  ------------------------- //


    // ------------------------- Handle Delete Users ------------------------- //

    static async handleDeleteUsers({ id }) {
        
        const deletedUsers = await User.destroy({ where: { id } });

        return deletedUsers;
    }

    // ------------------------- End Handle Delete Users ------------------------- //


    // ------------------------- Handle Get User Change Password ------------------------- //

    static async handleUserChangePassword({ id, password }){

        const changePassword = await User.update({
            password
        }, {
            where: { id },
        });

        return changePassword;
    }

    // ------------------------- End Handle Get User Change Password ------------------------- //
};

module.exports = UsersRepository;