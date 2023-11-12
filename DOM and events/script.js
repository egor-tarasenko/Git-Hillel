const todoList = document.getElementById('todoList')

function add() {
    const listItem = document.createElement('li')

    const taskTitle = prompt('Enter a title for the new task:')
    if (taskTitle) {
        const title = document.createTextNode(taskTitle)
        listItem.appendChild(title)

        const input = document.createElement('input')
        input.classList.add('form-control')
        input.setAttribute('type', 'text')
        input.setAttribute('placeholder', 'Enter task details...')

        listItem.appendChild(input)

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('btn', 'btn-danger', 'ms-2')
        deleteButton.innerText = 'Delete'

        deleteButton.addEventListener('click', function () {
            if (confirm('Are you sure you want to delete this task?')) {
                listItem.remove()
            }
        })

        listItem.appendChild(deleteButton)

        todoList.appendChild(listItem)
    }
}

function removeElement() {
    const listItem = document.querySelector('#todoList li:last-child')
    if (listItem) {
        if (confirm('Are you sure you want to delete this task?')) {
            listItem.remove()
        }
    } else {
        alert('No tasks to remove.')
    }
}
