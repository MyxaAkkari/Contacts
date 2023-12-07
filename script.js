const My_Server = "http://localhost:3000/contacts"
const contactListElement = document.getElementById('contactsList')
const searchNameInput = document.getElementById('searchName');
const originalContacts = [] // Keep a copy of the original contacts

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    setInterval(fetchData, 5000)
})

function updateContactList(data) {
    originalContacts.length = 0 // Clear the original contacts array
    originalContacts.push(...data) // Populate it with new data
    contactListElement.innerHTML = data.map((contact) =>
        `<li>Name: ${contact.name} - Number: ${contact.number} - Email: ${contact.email} 
                    <button onclick="editContact(${contact.id})">Edit</button>
                    <button onclick="delContact(${contact.id})">Del</button></li>`
    ).join('')
}

async function fetchData() {
    try {
        const response = await fetch(My_Server)
        const data = await response.json()
        updateContactList(data)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

function addContact() {
    fetch(My_Server, {
        method: 'post',
        body: JSON.stringify({
            name: Name.value,
            email: Email.value,
            number: phoneNumber.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
}

function editContact(ind) {
    const newName = prompt('Enter new name:')
    const newEmail = prompt('Enter new email:')
    const newNumber = prompt('Enter new number:')

    if (newName && newEmail && newNumber) {
        fetch((My_Server + '/' + ind), {
            method: 'PUT',
            body: JSON.stringify({
                name: newName,
                number: newNumber,
                email: newEmail
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
    }
}

function delContact(ind) {
    fetch(My_Server + "/" + (ind), {
        method: 'DELETE',
    })
}

searchNameInput.addEventListener('input', function () {
    const searchTerm = searchNameInput.value.toLowerCase();
    const filteredContacts = originalContacts.filter(contact => contact.name.toLowerCase().includes(searchTerm));
    updateContactList(filteredContacts);
});