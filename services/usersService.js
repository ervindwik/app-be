const usersRepository = require("../repositories/usersRepository");
const bcrypt = require("bcrypt");
const UsersRepository = require("../repositories/usersRepository");

const SALT_ROUND = 10;

class UsersService {

    // ------------------------- Handle Get All Users ------------------------- //

    static async handleGetAllUsers() {

        const handleGetAllUsers = await usersRepository.handleGetAllUsers();

        return {
            status: true,
            status_code: 200,
            message: "Berhasil mendapatkan semua data users",
            data: {
                get_all_users: handleGetAllUsers,
            },
        };
    };

    // ------------------------- End Handle Get All Users ------------------------- //


    // ------------------------- Handle Get User By Id ------------------------- //

    static async handleGetUserById({ id }) {
        const handleGetUserById = await usersRepository.handleGetUserById({ id });

        return {
            status: true,
            status_code: 200,
            message: "Berhasil mendapatkan data user berdasarkan id",
            data: {
                user_by_id: handleGetUserById,
            },
        };
    };

    // ------------------------- End Handle Get User By Id ------------------------- //

    // ------------------------- CreateUser ------------------------- //

    static async handleCreateUser({ nama, username,password,nomorKaryawan, tglLahir}) {

        // ------------------------- Payload Validation ------------------------- //

        if (!nama) {
            return {
                status: false,
                status_code: 400,
                message: "Nama wajib diisi!",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!nomorKaryawan) {
            return {
                status: false,
                status_code: 400,
                message: "Nomor Karyawan wajib diisi!",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!username) {
            return {
                status: false,
                status_code: 400,
                message: "Username wajib diisi!",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!password) {
            return {
                status: false,
                status_code: 400,
                message: "Password wajib diisi!",
                data: {
                    registered_user: null,
                },
            };
        } else if ( password.length < 8 ) {
            return {
                status: false,
                status_code: 400,
                message: "Password minimal 8 karakter!",
                data: {
                    registered_user: null,
                },
            };
        }

        const getUserByUsername = await usersRepository.getUserByUsername({username});

        if (getUserByUsername){
            return {
                status: false,
                status_code: 400,
                message: "Username sudah digunakan!",
                data: {
                    registered_user: null,
                },
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
            const createdUser = await usersRepository.createNewUser({
                nama,
                username,
                password: hashedPassword,
                nomorKaryawan,
                tglLahir
            });

            return {
                status: true,
                status_code: 201,
                message: "Berhasil mendaftarkan user!",
                data: {
                    registered_user: createdUser,
                },
            };
        }
    }

    // ------------------------- End  CreateUser ------------------------- //


    // ------------------------- Handle Update Users ------------------------- //

    static async handleUpdateUsers({ id, nama, username,password,nomorKaryawan, tglLahir}) {

        const getUserById = await usersRepository.handleGetUserById({ id });
        const getUserByUsername = await usersRepository.getUserByUsername({username});

        if (getUserById.id == id ) {
            if (getUserByUsername){
                return {
                    status: false,
                    status_code: 400,
                    message: "Username sudah digunakan!",
                    data: {
                        registered_user: null,
                    },
                }
            } else{
                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
                const updatedUser = await usersRepository.handleUpdateUsers({
                    id,
                    nama,
                    username,
                    password : hashedPassword,
                    nomorKaryawan,
                    tglLahir,
                });

                return {
                    status: true,
                    status_code: 200,
                    message: "User berhasil melengkapi info akun!",
                    data: {
                        updated_user: updatedUser,
                    },
                };
            }    

        } else {
            return {
                status: false,
                status_code: 401,
                message: "Resource Unauthorized",
                data: {
                    updated_user: null,
                },
            };
        }
    };

    // ------------------------- End Handle Update Users ------------------------- //



    // ------------------------- Handle Delete Users ------------------------- //

    static async handleDeleteUsers({ id }) {

        const handleGetUserById = await usersRepository.handleGetUserById({ id });

        if (handleGetUserById.id == id) {

            const deletedUsers = await usersRepository.handleDeleteUsers({ id });

            return {
                status: true,
                status_code: 200,
                message: "User berhasil di hapus",
                data: {
                    deleted_users: deletedUsers,
                },
            };
        } else {
            return {
                status: true,
                status_code: 401,
                message: "Resource Unauthorized",
                data: {
                    deleted_users: null,
                },
            };
        }
    }

    // ------------------------- End Handle Delete Users ------------------------- //


    static async handleUserChangePassword({id, password}) {
        
        const getUserById = await UsersRepository.handleGetUserById({ id });

        if (getUserById.id == id) {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
            let newPass = hashedPassword;
            
            let newPassword = {
                password: newPass ? newPass : getUserById.password,
            };
    
            const updatePassword = await usersRepository.handleUserChangePassword({
                id,
                password:hashedPassword
            });

            return {
                status: true,
                status_code:200,
                message: newPassword,
                data: {
                    updated_password_user: updatePassword,
                },
            }
        }else {
            return{
                status: false,
                status_code: 401,
                message: "Data Undifined",
                data: {
                    updated_password_user: null,
                },
            };
        }
    };


};

module.exports = UsersService;