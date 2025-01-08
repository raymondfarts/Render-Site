import PhoneServices from './../services/phonebookRequests'

export default function AddPersonForm (props){

    function handleAdditonOfPerson(event){
        const name = event.get('name')
        const number = event.get('number') 
        const newPerson = { name : name , number : number}       
        const duplicateEntry = props.phonebook.find((personObj) => personObj.name === name)

        if (duplicateEntry) {
            const replaceNumber = window.confirm(`${name} already exists, do you want to change their number?`)
            if(replaceNumber){
                props.setPhonebook(prevEntries => prevEntries.map((personObj) => personObj.name === name ? { name : name , number : number} : personObj ) )
                // PhoneServices.update(duplicateEntry.id, newPerson)
                // .then(response => props.setPhonebook(props.phonebook.map((personObj) => personObj.name === name ? response.data : personObj)))
            }            
        }else{
            // props.setPhonebook((prevEntries) => [...prevEntries, newPerson])
            PhoneServices.create(newPerson)
            .then(response => props.setPhonebook(props.phonebook.concat(response.data)))
        }
      }
    
    return(
        <>
            <form action= {handleAdditonOfPerson}>
                Name: <input type="text" name='name' defaultValue= 'Tom Tommer'/>
                <br />
                Number: <input type="text" name='number' defaultValue= '123-666-2224'/>
                <br />
                <button type="submit">Add Person</button>
            </form>
        </>
    )
}