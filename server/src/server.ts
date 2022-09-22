import express from "express";
import { PrismaClient } from "@prisma/client";    
import cors from 'cors';
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

const app = express();
app.use(cors());
const prisma = new PrismaClient();

app.use(express.json());

// Registrar usuário
app.post('/user_registration', async (request, response) => {
    const body = request.body

    const user = await prisma.users.create({
        data: {
            username: body.username,
            password: body.password,
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
});


app.post('/login', async (request, response) => {
    const body = request.body;

    const login = await prisma.users.findMany({
        where: {
            username: body.username,
            password: body.password,
        },
    });

    if (login.length > 0) {
        return response.json({success: login})
    } else {
        return response.json({error: 'Usuário ou senha errado(s)'})
    }
    
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