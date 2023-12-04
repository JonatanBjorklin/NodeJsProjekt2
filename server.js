const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');   
const { main } = require('./get-users.js');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(__dirname));
const { editusers } = require('./edit.js');

server.set('port', process.env.PORT || 999);

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

server.get('/', (request,res)=>{
main().then((res) => test(res));
const test = (data) => {
res.render('index.ejs', {
    data: data,
});
}
});

server.get('/create',(request,response)=>{
    response.render('create.ejs', {
    });    
});
server.get('/edit',(request,response)=>{
    response.render('edit.ejs', {
    });    
});

const { createUser } = require('./index.js');

server.post('/create', upload.single('img'), async (request, response) => {
    const { name, email, phone } = request.body;
    const img = request.file ? request.file.filename : null;

    try {
        const newUser = await createUser(name, email, phone, img);

        response.render('create.ejs', {
        });        } catch (error) {
        response.status(500).send('Internal Server Error');
    }
});

server.get('/edit', function (request, response) {  
    response.render('edit.ejs', {
    });    })
server.post('/edit', upload.single('img'), async (request, response) => {
    let { id, email, name, phone } = request.body;
    const img = request.file ? request.file.filename : null;
    edits = {
        id:'',
        name:name,
        email:email,
        phone:phone,
        img:img,
    };
    let changes = {};
    id = Number(id);

    for(var i = 1; i < Object.values(request.body).length; i++){
        if(Object.values(request.body)[i] != ''){
            console.log(Object.values(request.body)[i]);
           changes[Object.keys(edits)[i]] = Object.values(request.body)[i];
        }else{
           continue;
    }}
    if(Object.values(edits)[4] != null){
        changes[Object.keys(edits)[4]] = Object.values(edits)[4];
    }
    try {
        const newUser = await editusers(id, changes);

        response.render('edit.ejs', {
        });        } catch (error) {
            response.render('edit.ejs', {
            });        }
});
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

//Binding to a port
server.listen(999, ()=>{
  console.log('Express server started at port 999');
});