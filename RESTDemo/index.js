const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');


// CRUD operations
// Express was used to get into the views folder. Request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// UUID is used to render randomized id's.
// GET to render usernames and comments on webpage. (Read)
const comments = [
    {   
        id:uuid(),
        username: 'Pepe',
        comment: 'lol that is so funny!'
    },
    {
        id:uuid(),
        username: 'Pancho',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id:uuid(),
        username: 'Sancho',
        comment: 'Plz delete your account'
    },
    {
        id:uuid(), 
        username: 'Xolo',
        comment: 'woof'
    }
]



app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

//Renders a form; new
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

//Extracts data to post.
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid()})
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.commnet;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params; 
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const {meat, qty} = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
    console.log("ON PORT 3000!")
})


// GET /comments - list all comments
// POST /COMMENTS -creates a new comment
// GET /comments/:id - Get one comment (Using ID)
// PATCH /comments/:ID - Update one comment
//DELETE / comments/:id - Destroy one comment


