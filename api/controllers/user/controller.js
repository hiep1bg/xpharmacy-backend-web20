import userModel from './user';

const register = (body) => {
    return new Promise((resolve, reject) => {
        if (!body.username || !body.password) {
            reject({
                status: 400,
                err: "Incorrect username/password"
            })
        } else {
            userModel.create(body)
                .then(user => resolve(user._id))
                .catch(err => reject(err))
        }
    })
}

const getAllUsers = (page) => {
    return new Promise((resolve, reject) => {
        userModel.find({})
            .limit(15)
            .skip((page - 1) * 15)
            .exec()
            .then(users =>
                resolve(users)
            ).catch(err => reject(err))
    })
}

const getOneUser = (id) => {
    return new Promise((resolve, reject) => {
        userModel.findById(id)
            .exec()
            .then(user => resolve(user))
            .catch(err => reject(err))
    })
}

const changeUserPassword = (id, password) => {
    return new Promise((resolve, reject) => {
        userModel.findByIdAndUpdate(id, {password}, {new: true}, (err, user) => {
            if(err) return reject(err);
            else{
                resolve(user)
            }
        })
    })
}

export {
    register,
    getAllUsers,
    getOneUser,
    changeUserPassword
}

