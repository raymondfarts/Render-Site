import PhoneServices from './../services/phonebookRequests'

export default function PhoneBookDisplay ({phonebook, filteredPhonebook, setPhonebook, setUpdatedDB}){
  
    async function handleDelete(event){
      const id = event.target.value
      console.log(id)

      // window.confirm(`Are you sure you want to delete ${phonebook.find((person) => person.id === id).name}?`)
      const replaceNumber = window.confirm(`Are you sure you want to delete ${event.target.name}?`)
      
      replaceNumber ? await PhoneServices.deleteEntry(id) : null
      setUpdatedDB(prev => prev + 1)
      // setPhonebook(phonebook.filter((person) => person.id !== id))
    }

    const people = phonebook.map((person) => <><div key={person.name}>{person.name} : {person.number} <button onClick={handleDelete} value={person.id} name={person.name}>Delete</button></div> </>)
    const filteredPeople = filteredPhonebook.map((person) => <><div key={person.name}>{person.name} : {person.number} <button onClick={handleDelete} value={person.id} name={person.name}>Delete</button></div> </>)

    return(
        <>
          {filteredPeople.length > 0 ? filteredPeople : people}  
        </>
    )
}