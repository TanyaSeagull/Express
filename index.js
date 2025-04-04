const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

let comments = [
    {
        id: uuidv4(),
        username: 'Todd',
        comment: 'LOL that is so funny!'
    },
    {
        id: uuidv4(),
        username: 'Skyler',
        comment: 'I like to go birdwatching'
    },
    {
        id: uuidv4(),
        username: 'Cyberkitty',
        comment: 'Has anyone seen my keys?'
    },
    {
        id: uuidv4(),
        username: 'Jamie',
        comment: 'Just finished my workout!'
    },
    {
        id: uuidv4(),
        username: 'Riley',
        comment: 'This recipe changed my life!'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({ username, comment, id: uuidv4() })
    res.redirect('/comments');
})

app.get('/comments/:id', (req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    if (!comment) {
        return res.status(404).send('Comment not found');
    }
    res.render('comments/show', { comment });
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const updatedComment = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = updatedComment;
    res.redirect('/comments');
})

app.get('/tacos', (req, res) => {
    res.send('Get /tacos response');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    comments = comments.filter(c => c.id !== id); 
    res.redirect('/comments');
})

app.post('/tacos', (req, res) => {
    const {meat, qty} = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos`);
})

app.listen(3000, () => {
    console.log("on port 3000")
})