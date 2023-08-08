// creating JavaScript clients
async function remove (id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}
// add listener on the button with data-type remove
document.addEventListener('click', (event) => {
    // limiting clicks (only type 'remove')
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id
        // call method fetch -> send server (index.js file)
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
})
async function update(id, editPrompt) {
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: editPrompt
        })
    })
}
// add listener on the button with data-type edit
document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'edit') {
        const idNoteToUpdate = event.target.dataset.id
        console.log(idNoteToUpdate)
        const editPrompt = prompt('Введите новое название:', event.target.dataset.title)
        if (editPrompt === null) {
            console.log('Редактирование отменено!')
        } else {
            if (editPrompt === '') {
                console.log('Введено пустое название!')
            } else {
                update(idNoteToUpdate, editPrompt).then(() => {
                    console.log('Ok!')
                })
            }
        }
    }
})

