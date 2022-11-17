import { Prisma, PrismaClient } from "@prisma/client";    
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';

var jwt = require('jsonwebtoken');
const fs = require('fs');

import bcrypt from 'bcrypt';
const saltRounds = 10;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const express = require("express");
const app = express();

app.use(cors());

app.use(function(req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();  
})

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const prisma = new PrismaClient();

function verifyJWT(req: Request, res: Response, next: NextFunction) {
    var token = req.headers['authorization'];
    if (!token)
        return res.send({ auth: false, message: 'Token não informado.' });

    var publicKey = fs.readFileSync('./public.key', 'utf8');
    jwt.verify(token, publicKey, { algorithm: ["RS256"] }, function (err: any, decoded: any) {
        if (err)
            return res.send({ auth: false, message: 'Token inválido.' });

        req.userId = decoded.id;
        console.log("User Id: " + decoded.id)
        next();
    });
}



app.post('/login', async (request: any, response: any, next: any) => {
    const body = request.body;
    const password = request.body.password;
    const username = request.body.username;

    const login = await prisma.users.findMany({
        where: {
            username: body.username,
        },
    });

    if (login.length > 0) {
        bcrypt.compare(password, login[0].password, (error, result) => {
            if (result) {
                const id = username;
                var privateKey = fs.readFileSync('./private.key', 'utf8');
                var token : any = jwt.sign({ id }, privateKey, {
                    expiresIn: 600, // 5min 
                    algorithm: "RS256"
                });
                console.log("Fez login e gerou token!");
                return response.status(200).send({ auth: true, token: token, user: login });
            } else {
                return response.json({error: 'Usuário ou senha errado(s)'})
            }
        })
    } else {
        return response.json({error: 'Usuário não encontrado.'})
    }  
});


// ================
// Listar usuário
// ================
app.get('/user', verifyJWT, async (req: any, res: any) => {
    const user = await prisma.users.findMany({
        where: {
            username: req.userId,
        },
    });
    
    return res.json({user: user});
});


// =====================
// Registrar usuário
// =====================
app.post('/user_registration', async  (req: any, res: any) => {
    const body = req.body
    const password = req.body.password;

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
        }).catch(e => {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    console.log(
                        'There is a unique constraint violation, a new user cannot be created with this email'
                      )
                }
            }
        })
        return res.json(user);
    })
});

// ===============
// Rota de logout
// ===============
app.post('/logout', function (req: any, res: any) {
    console.log("Fez logout e cancelou o token!");
    res.status(200).send({ auth: false, token: null });
});

// ==============================================
// Adicionar personagem para determinado usuário
// ==============================================
app.post('/users/:username/characters', async (req: any, res: any) => {
    const id = req.params.username;
    const body = req.body;



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
            similarity: body.similarity,
        }
    }).catch(e => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                  )
            }
        }
    })

    return res.json(character);
})

// ===========================================
// Listar personagens de determinado usuário
// ===========================================
app.get('/users/:username/characters', async (req: any, res: any) => {
    let username = req.params.username;
    const characters = await prisma.characters.findMany({
        where: {
            usersUsername: username,
        }
    });
    return res.status(200).json({characters: characters});
});

// ==========================================
// Excluir personagem de determinado usuário
// ==========================================
app.post('/users/:username/characters/:characters/delete', async (req: any, res: any) => {
    const deleteCharacter = await prisma.characters.delete({
        where: {
            name_usersUsername: {
                name: req.params.characters,
                usersUsername: req.params.username,
            }
        }
    })
        
    return res.status(200).json({deleteCharacter: deleteCharacter});
})

app.get('/users/:username/characters/order', async (req: any, res: any) => {
    let username = req.params.username;
    const characters = await prisma.characters.findMany({
        where: {
            usersUsername: username,
        },
        orderBy: {
            similarity: 'desc',
        },
        take: 3,
    })
    return res.status(200).json({order: characters})
})


app.listen(1111);