export default function PhoneBookFilter(props) {

    const handleFiltering = (event) => {
        const typedLetters = event.target.value
        console.log(typedLetters)
        
        const filterByUserInput = props.phonebook.filter( (person) => person.name.toLowerCase().includes(typedLetters.toLowerCase()) )
        console.log(filterByUserInput);

        props.setFilteredPhonebook(filterByUserInput)
        
    }
    return(
        <>
        Find person: <input type="text" name="search" onChange={handleFiltering} />
        </>
    )
} 