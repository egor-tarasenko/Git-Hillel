let todoList = []

// server

let server = {
    url: 'https://crudapi.co.uk/api/v1/todo-list',
    token: '4YP6v9VuWhe73ikwAygJALabvy8yKigtDXGkhQsgkL3RUzVVBA',

    // Получение списка элементов с сервера
    list() {
        return fetch(this.url, {
            method: 'get',
            headers: new Headers({
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json())
    },

    // Добавление нового элемента на сервер
    store(data) {
        return fetch(this.url, {
            method: 'post',
            headers: new Headers({
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify([data])
        }).then(response => response.json())
    },

    // Обновление элемента на сервере
    update(uuid, data) {
        return fetch(`${this.url}/${uuid}`, {
            method: 'put',
            headers: new Headers({
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        }).then(response => response.json())
    },

    // Удаление элемента с сервера
    remove(uuid) {
        return fetch(`${this.url}/${uuid}`, {
            method: 'delete',
            headers: new Headers({
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json())
    }
}

// button init

const addBtn = document.getElementById('addElement')
addBtn.addEventListener('click', function showFormModal() {
    document.getElementById('form-modal').classList.add('d-block')
    create()
})

const btnCloseFormModal = document.getElementById('btnCloseFormModal')
btnCloseFormModal.addEventListener('click', function hideFormModal() {
    document.getElementById('form-modal').classList.remove('d-block')
})

// mmpdal window function

function showFormModal() {
    document.getElementById('form-modal').classList.add('d-block')
}

function closeFormModal() {
    document.getElementById('form-modal').classList.remove('d-block')
}

// form inf

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault()

    const title = document.getElementById('form-title').value
    const description = document.getElementById('form-description').value
    const uuid = document.getElementById('form-uuid').value

    const data = {
        description,
        uuid,
        title,
    }
    if (validateForm(data)) {
        save(data)
        closeFormModal()
    }
})

// validation

function validateForm(data) {
    clearErrors()

    let decision = true

    if (!data.title) {
        document.getElementById('form-title-invalid-feedback').innerText = 'Поле обезательно должно быть заполнено'
        document.getElementById('form-title').classList.add('is-invalid')
        decision = false
    } else if (data.title.trim() === '') {
        document.getElementById('form-title-invalid-feedback').innerText = 'Поле не может быть пустым, или состоять только из пробелов.'
        document.getElementById('form-title').classList.add('is-invalid')
        decision = false
    } else if (data.title.length > 255) {
        document.getElementById('form-title-invalid-feedback').innerText = 'Поле не может состоять больше чем с 255 символов'
        document.getElementById('form-title').classList.add('is-invalid')
        decision = false
    }

    if (data.description && data.description.trim() === '') {
        document.getElementById('form-description-invalid-feedback').innerText = 'Поле не может состоять только из пробелов.'
        document.getElementById('form-description').classList.add('is-invalid')
        decision = false
    }

    return decision
}

// clear form

function clearErrors() {
    document.getElementById('form-title').classList.remove('is-invalid')
    document.getElementById('form-description').classList.remove('is-invalid')

    document.getElementById('form-title-invalid-feedback').innerText = ''
    document.getElementById('form-description-invalid-feedback').innerText = ''
}

// pars storage

function init() {
    server.list().then((list) => {
        list.items.sort((a, b) => {
            return a._created - b._created
        }).forEach((task) => {
            let formattedTask = {
                uuid: task._uuid,
                title: task.title,
                description: task.description,
                completed: task.completed || false
            }

            todoList.push(formattedTask)
            createHtmlTodoItem(formattedTask)
        })
    })
}


// create new empty window
function create() {
    document.getElementById('form-uuid').value = ''
    document.getElementById('form-description').value = ''
    document.getElementById('form-title').value = ''

    showFormModal()
}

// edit inf

function edit(uuid) {
    const title = document.getElementById(`title-${uuid}`).innerText
    const description = document.getElementById(`description-${uuid}`).innerText

    document.getElementById('form-title').value = title
    document.getElementById('form-description').value = description
    document.getElementById('form-uuid').value = uuid
    showFormModal()
}

function updateCheckboxStatus(uuid, checked) {
    server.update(uuid, { completed: checked })
    .then((response) => {
        let formattedTask = {
            uuid: response._uuid,
            title: response.title,
            description: response.description,
            completed: response.completed
        }
        updateHtmlTodoItemCheckbox(formattedTask)
    })
}

const btnDeleteConfirm = document.getElementById('btnDeleteConfirm')
const btnCancel = document.getElementById('btnDeleteCancel')
const removeModal = document.getElementById('remove-modal')

btnDeleteConfirm.addEventListener('click', handleDeleteConfirm)
btnCancel.addEventListener('click', handleDeleteCancel)

// delate inf

function remove(uuid) {
    btnDeleteConfirm.dataset.uuid = uuid
    removeModal.classList.add('d-block')
}

function handleDeleteConfirm() {
    const uuidToRemove = btnDeleteConfirm.dataset.uuid
    const index = todoList.findIndex((item) => item.uuid === uuidToRemove)
    if (index !== -1) {
        server.remove(uuidToRemove)
        .then(() => {
            todoList.splice(index, 1)
            document.getElementById(`item-${uuidToRemove}`).remove()
            removeModal.classList.remove('d-block')
        })
    }
}

function handleDeleteCancel() {
    removeModal.classList.remove('d-block')
}

// save inf

function save(data) {
    if (!data.uuid) {
        server.store({
            title: data.title,
            description: data.description
        }).then((response) => {
            let formatedTask = {
                uuid: response.items[0]._uuid,
                title: response.items[0].title,
                description: response.items[0].description
            }

            todoList.push(formatedTask)
            createHtmlTodoItem(formatedTask)
        })
    } else {
        server.update(data.uuid, {title: data.title, description: data.description}).then((response) => {
            let formatedTask = {
                uuid: response._uuid,
                title: response.title,
                description: response.description
            }

            let index = todoList.findIndex((item) => item.uuid === formatedTask.uuid)
            if (index !== -1) {
                todoList[index] = formatedTask
                editHtmlTodoItem(formatedTask)
            }
        })
    }
}

// edit html
function editHtmlTodoItem(formatedTask) {
    const editedLi = document.getElementById(`item-${formatedTask.uuid}`)
    if (editedLi) {
        editedLi.querySelector(`#title-${formatedTask.uuid}`).innerText = formatedTask.title
        editedLi.querySelector(`#description-${formatedTask.uuid}`).innerText = formatedTask.description
        return;
    }
}

// create html
function createHtmlTodoItem(data) {
    let liElement = document.createElement('li')
    liElement.id = `item-${data.uuid}`
    liElement.innerHTML = `
    <input type="checkbox" id="checkbox-${data.uuid}" ${data.completed ? 'checked' : ''} class="mr-2">
    <div id="title-${data.uuid}" class="${data.completed ? 'completed' : ''}">${data.title}</div>
    <div id="description-${data.uuid}">${data.description}</div>
    <div>
        <button data-uuid='${data.uuid}' class="btn btn-warning btn-sm edit-button">Edit</button>
        <button data-uuid='${data.uuid}' class="btn btn-danger remove-button">Remove</button>
    </div>`

    liElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')

    liElement.querySelector('.edit-button').addEventListener('click', function (event) {
        edit(event.target.dataset.uuid);
    })

    liElement.querySelector('.remove-button').addEventListener('click', function (event) {
        remove(event.target.dataset.uuid)
    })

    liElement.querySelector(`#checkbox-${data.uuid}`).addEventListener('change', function (event) {
        updateCheckboxStatus(data.uuid, event.target.checked)
    })

    document.getElementById('todoList').appendChild(liElement)
}

function updateHtmlTodoItemCheckbox(data) {
    const checkbox = document.getElementById(`checkbox-${data.uuid}`)
    if (checkbox) {
        checkbox.checked = data.completed
        const titleElement = document.getElementById(`title-${data.uuid}`)
        if (titleElement) {
            titleElement.classList.toggle('completed', data.completed)
        }
    }
}



document.addEventListener('DOMContentLoaded', function () {
    init()
})