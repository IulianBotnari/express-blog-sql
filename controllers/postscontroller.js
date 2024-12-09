
const { json } = require('express')
const posts = require('../db')

const connection = require('../db/connection.js')

const fs = require(`fs`)

const getPosts = (req, res) => {

    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err })

        const responseData = {
            data: result
        }

        res.status(200).json(responseData)
    })
}
const getId = (req, res) => {

    const id = req.params.id

    console.log(id)

    const sql = `SELECT * FROM posts WHERE id=?`

    const sqlTags = `
        SELECT tags.*
        FROM tags
        JOIN post_tag on tags.id = post_tag.tag_id
        WHERE post_tag.post_id = ?`


    connection.query(sql, [id], (err, result) => {


        if (err) return res.status(500).json(err)

        if (!result) return res.json('Post not exist')



        // const post = result

        // console.log(post[0]);



        connection.query(sqlTags, [id], (err, tagsResults) => {

            console.log(tagsResults);

            if (err) return res.status(500).json(err)

            if (!tagsResults) return res.json('Tag not exist')









            return res.json(post = {
                ...result[0],
                tags: tagsResults
            })
        })




    })











    // const singlePost = posts.find(element => element.id === req.params.id)

    // if (!singlePost) {
    //     return res.status(404).json({ error: `404` })
    // } else {
    //     res.status(200).json({ data: singlePost })
    // }
}

const getPostsByTag = (req, res) => {

    let insertTag = req.params.tags
    const includedTag = posts.filter(element => element.tags.includes(insertTag))

    if (includedTag.length === 0) {
        return res.status(404).json({ error: `Nessun post trovato` });
    }

    res.status(200).json({ data: includedTag });
};


const addPost = (req, res) => {
    const newPost = {
        title: req.body.title,
        id: req.body.id,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
        published: req.body.published,
    }

    posts.push(newPost)

    fs.writeFileSync(`./db.js`, `module.exports = ${JSON.stringify(posts, null, 4)}`)

    return res.status(201).json(posts)
}

const updatePost = (req, res) => {
    const findPost = posts.find(element => element.title.toLowerCase() === req.params.title)

    if (!findPost) {
        return res.status(404).json({ error: "Post not found" })
    }

    findPost.title = req.body.title
    findPost.slug = req.body.slug
    findPost.content = req.body.content
    findPost.image = req.body.image
    findPost.tags = req.body.tags

    fs.writeFileSync(`./db.js`, `module.exports = ${JSON.stringify(posts, null, 4)}`)

    return res.status(200).json(posts)
}


const deletePost = (req, res) => {

    const id = req.params.id

    const sqlDelete = `SELECT * FROM posts WHERE id=${id}`


    connection.query(sqlDelete, [id], (err, result) => {

        console.log(result);


        if (err) return res.json(err)

        if (!result.data) return res.json('Post to delete not found')


        return res.json(result)


    })





    // const cancPost = posts.find(element => element.id === req.params.id)
    // console.log(cancPost);


    // if (!cancPost) {
    //     return res.status(404).json({ error: "Post not found" })
    // }

    // posts.splice(posts.indexOf(cancPost), 1)

    // fs.writeFileSync(`./db.js`, `module.exports = ${JSON.stringify(posts, null, 4)}`)

    // return res.status(200).json(posts)
}






module.exports = {

    getPosts,
    getId,
    getPostsByTag,
    addPost,
    updatePost,
    deletePost
};