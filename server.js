import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }


    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Usuário Deletado com Sucesso!" })

})

app.listen(3000)



// PARA USAR A API SEM O BANCO DE DADOS USE O CODIGO ABAIXO:


// import express from 'express';
// import cors from 'cors';

// const app = express();
// app.use(express.json());
// app.use(cors());

// const users = [];

// // Rota para cadastrar um novo usuário
// app.post('/usuarios', (req, res) => {
//     const { email, name, age } = req.body;

//     // Verifica se o email já está registrado
//     const existingUser = users.find(user => user.email === email);
//     if (existingUser) {
//         return res.status(400).json({ error: 'Email já está em uso' });
//     }

//     // Cria um novo usuário e adiciona ao array
//     const user = { id: users.length + 1, email, name, age };
//     users.push(user);

//     res.status(201).json(user);
// });

// // Rota para listar todos os usuários ou filtrar por nome, email e idade
// app.get('/usuarios', (req, res) => {
//     const { name, email, age } = req.query;
//     let filteredUsers = users;

//     if (name || email || age) {
//         filteredUsers = users.filter(user => {
//             return (name ? user.name === name : true) &&
//                    (email ? user.email === email : true) &&
//                    (age ? user.age === age : true);
//         });
//     }

//     res.status(200).json(filteredUsers);
// });

// // Rota para atualizar um usuário pelo ID
// app.put('/usuarios/:id', (req, res) => {
//     const { id } = req.params;
//     const { email, name, age } = req.body;

//     const userIndex = users.findIndex(user => user.id === parseInt(id));
//     if (userIndex === -1) {
//         return res.status(404).json({ error: 'Usuário não encontrado' });
//     }

//     users[userIndex] = { id: parseInt(id), email, name, age };
//     res.status(200).json(users[userIndex]);
// });

// // Rota para deletar um usuário pelo ID
// app.delete('/usuarios/:id', (req, res) => {
//     const { id } = req.params;

//     const userIndex = users.findIndex(user => user.id === parseInt(id));
//     if (userIndex === -1) {
//         return res.status(404).json({ error: 'Usuário não encontrado' });
//     }

//     users.splice(userIndex, 1);
//     res.status(200).json({ message: "Usuário deletado com sucesso!" });
// });

// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });








