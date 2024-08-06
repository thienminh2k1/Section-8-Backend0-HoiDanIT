const { json } = require('express')
const connection = require('../config/database')
const { getAllUsers, getUserById, getUpdateUser, deleteUserById, createUser } = require('../services/CRUDService')

const getHomepage = async (req, res) => {
    let results = await getAllUsers()
    return res.render('home.ejs', { listUsers: results })
}

const getHoiDanIT = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    console.log('>>>> check req.body', req.body)
    let { email, name, city } = req.body
    await createUser(email, name, city)
    
    res.redirect('/')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id
    let user = await getUserById(userId)
    res.render('update.ejs', {userEdit: user})
}

const postUpdateUser = async (req, res) => {
    let { email, name, city, userId } = req.body
    await getUpdateUser(email, name, city, userId)    
    res.redirect('/')  
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id
    console.log('check id :',userId)
    let user = await getUserById(userId)
    res.render('delete.ejs', {userEdit: user}) 
}

const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId
    await deleteUserById(id)
    res.redirect('/')
}

module.exports = {
    getHomepage,
    getHoiDanIT,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
}