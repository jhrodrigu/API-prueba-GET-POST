const express = require('express')
const app = express()

app.use(express.json())


// APIS CREADAS
let notes = [{
        "id": 1,
        "content": "Creando un Api 1",
        "date": "2021-12-01:20:04:20.098Z",
        "important": true
    },
    {
        "id": 2,
        "content": "Creando un Api 2",
        "date": "2021-12-01:21:04:20.098Z",
        "important": true
    },
    {
        "id": 3,
        "content": "Creando un Api 3",
        "date": "2021-12-01:22:04:20.098Z",
        "important": true
    },
]


app.get('/', (request, response) => {
    response.send(`<h1>Quieres ver las API</h1>
    
    <p>Ingresa a la siguiente url <a href="http://localhost:3001/api/notes/">http://localhost:3001/api/notes/</a></p>
    `)
})


// MUESTRA TODAS LAS APIS
app.get('/api/notes', (request, response) => {
    response.json(notes)
})


// MUESTRA LAS APIS LAS CUAL LE INDIQUEMOS EL ID
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404)
    }

    console.log({ note })
    response.json(note)
})

// INSERTA UNA NUEVA API
app.post('/api/notes', (request, response) => {
    const note = request.body

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important == 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]

    response.json(newNote)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Sever funciona ${PORT}`)
})