import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/phonebook'

const getAll = () => axios.get(baseUrl)

const create = newEntry => axios.post(baseUrl,newEntry)

const update = (id, updatedEntry) => axios.put(`${baseUrl}/${id}`, updatedEntry)

const deleteEntry = (id) => axios.delete(`${baseUrl}/${id}`)


export default {getAll, create, update, deleteEntry}