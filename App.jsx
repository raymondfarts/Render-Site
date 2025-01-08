import {useState, useEffect} from 'react'
import PhoneServices from './services/phonebookRequests'
import PhoneBookDisplay from './Components/PhoneBookDisplay'
import AddPersonForm from './Components/AddPersonForm'
import PhoneBookFilter from './Components/PhoneBookFilter'

// Reset SearchForm to update state and show added entries, or save user input to state and pass down as props to addperson component and set state of userinput to empty

const App = () => {

  const [phonebook, setPhonebook] = useState([])
  const [filteredPhonebook, setFilteredPhonebook] = useState([])
  const[updateDB, setUpdatedDB] = useState(0)

  useEffect(() => {
   PhoneServices.getAll()
   .then(response => setPhonebook(response.data))
  }
  ,[updateDB])

  return(
    <>
      <h1 style = {{color: 'rgb(212, 110, 7)', fontSize: '70px'}}>PhoneBook</h1>
      <h2>Find a person</h2>
      <PhoneBookFilter filteredPhonebook= {filteredPhonebook} setFilteredPhonebook = {setFilteredPhonebook} phonebook = {phonebook} />
      <h2>Add a person</h2>
      <AddPersonForm phonebook = {phonebook} setPhonebook = {setPhonebook} />
      <h2>Directory</h2>
      <PhoneBookDisplay phonebook = {phonebook} filteredPhonebook={filteredPhonebook} setPhonebook={setPhonebook} setUpdatedDB={setUpdatedDB}/>
    </>
  )
}

export default App