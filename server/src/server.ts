import express from "express";
import { PrismaClient, Users } from "@prisma/client";    
import cors from 'cors';

import bcrypt from 'bcrypt';
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let session = require("express-session");

import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage('./scratch');

const app = express();
app.use(cors());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const expiryDate = new Date(Date.now() + 60 * 60 * 24 * 1000);
const prisma = new PrismaClient();

app.use(express.json());

// Registrar usuário
app.post('/user_registration', async  (request, response) => {
    const body = request.body
    const password = request.body.password;

    await bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            console.log(err);
        }
        const user = await prisma.users.create({
            data: {
                username: body.username,
                password: hash,
                name: body.name,
                weight: body.weight,
                height: body.height,
                blood_type: body.blood_type,
                gender: body.gender,
                sexuality: body.sexuality,
                birth_date: body.birth_date,
                zodiac_sign: body.zodiac_sign,
                mbti: body.mbti,
                occupation: body.occupation,
            }
        })
        return response.json(user);
    })
});

app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: expiryDate,
    },
}))

app.post('/login', async (request, response) => {
    const body = request.body;
    const password = request.body.password;

    const login = await prisma.users.findMany({
        where: {
            username: body.username,
        },
    });

    if (login.length > 0) {
        bcrypt.compare(password, login[0].password, (error, result) => {
            if (result) {
                if (request.session) {
                    request.session.user = login[0];
                }
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', login[0].username);
                return response.json(login);
            } else {
                return response.json({error: 'Usuário ou senha errado(s)'})
            }
        })
    } else {
        return response.json({error: 'Usuário não encontrado.'})
    }  
});

var hours = 1;
var now = new Date().getTime();
var setupTime = localStorage.getItem('setupTime');

app.get('/authenticate', (req , res, next) => {
    if (localStorage.getItem('loggedIn') == 'true') {
        return res.json({sucesso: 'sucesso', username: localStorage.getItem('username')});
    } else {
        return res.json({erro: 'errooo'});
    }
})

if (setupTime == null) {
    console.log("entrei nessep ienis");
    localStorage.setItem('setupTime', now.toString());
} else {
    if(now-parseInt(setupTime) > 60*1000) {
        console.log("pinto");
        localStorage.clear()
        localStorage.setItem('setupTime', now.toString());
    }
}

app.get('/logout',(req,res) => {
    localStorage.clear();
    res.json({sucesso: 'deu certo amem'})
});


// Listar usuários
app.get('/users', async (request, response) => {
    const users = await prisma.users.findMany({
        include: {
            _count: {
                select: {
                    character: true,
                }
            }
        }
    });
    
    return response.json(users);
});


// Adicionar personagem para determinado usuário
app.post('/users/:username/characters', async (request, response) => {
    const id = request.params.username;
    const body = request.body;

    const character = await prisma.characters.create({
        data: {
            usersUsername: id,
            name: body.name,
            weight: body.weight,
            height: body.height,
            blood_type: body.blood_type,
            gender: body.gender,
            sexuality: body.sexuality,
            birthday: body.birthday,
            zodiac_sign: body.zodiac_sign,
            mbti: body.mbti,
            occupation: body.occupation,
        }
    })

    return response.json(character);
}) 

// Listar personagens de determinado usuário
app.get('/users/:username/characters', async (request, response) => {
    const id = request.params.username;

    const characters = await prisma.characters.findMany({
        where: {
            usersUsername: id,
        }
    });
    return response.json(characters);
});




app.listen(1111);