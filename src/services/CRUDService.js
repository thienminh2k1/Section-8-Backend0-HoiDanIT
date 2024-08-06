const connection = require('../config/database')

const createUser = async (email, name, city) => {
    let [results, fields] = await connection.query(   //luu value vao database su dung mysql2 (de hieu vcl)
        `INSERT INTO Users(email, name, city) VALUES (?, ?, ?)`, [email, name, city],   
    )
}

const getAllUsers = async () => {
    let [results, fields] = await connection.query('SELECT * FROM Users')
    // console.log('check results: ', results)
    return results
}

const getUserById = async (userId) => {
    let [results, fields] = await connection.query('SELECT * FROM Users WHERE id = ?', [userId])
    console.log('check results: ', results)
    let user = results && results.length > 0 ? results[0] : {}
    console.log('check user :', user)
    return user
}

const getUpdateUser = async (email, name, city, userId) => {
    let [results, fields] = await connection.query(      
        `UPDATE Users
        SET email = ?, name = ?, city = ?
        WHERE id = ?;`, [email, name, city, userId]
    )
}

const deleteUserById = async (id) => {
    let [results, fields] = await connection.query('DELETE FROM Users WHERE id = ?', [id])
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUpdateUser,
    deleteUserById
}
