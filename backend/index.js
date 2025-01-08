const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let phonebook = [
    {name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }    
]

const generateId = () => {
    maxId = Math.max(...phonebook.map((person) => Number(person.id)))    
    return maxId + 1
}

app.get('/info',(request, response) => {
    response.send(`Phonebook contains ${phonebook.length} people <br><br> ${new Date()}`)
  })

app.get('/api/phonebook', (request, response) => {
    response.json(phonebook)
})

app.get('/api/phonebook/:id', (request, response) => {
    const id = request.params.id
    const person = phonebook.find((person) => Number(id) === Number(person.id))   
    person ? response.json(person) : response.status(404).end()
})

app.post('/api/phonebook', (request, response) => {
    const body = request.body
    const duplicatePerson = phonebook.find((person) => person.name === body.name)
    

    if(!body.name || !body.number){
        return response.status(400).json({error : "Content Missing"})
    }
    else if(duplicatePerson){
        return response.status(400).json({error : "Person already exists"})
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    phonebook = phonebook.concat(newPerson)

    console.log(body);
    response.json(newPerson)
})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = request.params.id

    const person = phonebook.find((person) => Number(id) === Number(person.id))   

    person ? (response.json({action: 'successfully deleted', target_entry: person}), 
    phonebook = phonebook.filter((person) => Number(id) !== Number(person.id)) , 
    response.status(204).end()) 
    : response.status(404).end()   
})

const PORT = process.env.PORT || 3001
app.listen(PORT)