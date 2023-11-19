const addBtn = document.getElementById('addElement')
addBtn.addEventListener('click', function showFormModal() {
    document.getElementById('form-modal').classList.add('d-block')
    create()
})

const btnCloseFormModal = document.getElementById('btnCloseFormModal')
btnCloseFormModal.addEventListener('click', function hideFormModal() {
    document.getElementById('form-modal').classList.remove('d-block')
})

function showFormModal() {
    document.getElementById('form-modal').classList.add('d-block')
}

function closeFormModal() {
    document.getElementById('form-modal').classList.remove('d-block')
}

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

function clearErrors() {
    document.getElementById('form-title').classList.remove('is-invalid')
    document.getElementById('form-description').classList.remove('is-invalid')

    document.getElementById('form-title-invalid-feedback').innerText = ''
    document.getElementById('form-description-invalid-feedback').innerText = ''
}

function create() {
    document.getElementById('form-uuid').value = ''
    document.getElementById('form-description').value = ''
    document.getElementById('form-title').value = ''

    showFormModal()
}

function edit(uuid) {
    const title = document.getElementById(`title-${uuid}`).innerText
    const description = document.getElementById(`description-${uuid}`).value

    document.getElementById('form-title').value = title
    document.getElementById('form-description').value = description
    document.getElementById('form-uuid').value = uuid
    showFormModal()
}

const btnDeleteConfirm = document.getElementById('btnDeleteConfirm');
const btnCancel = document.getElementById('btnDeleteCancel');
const removeModal = document.getElementById('remove-modal');

btnDeleteConfirm.addEventListener('click', handleDeleteConfirm);
btnCancel.addEventListener('click', handleDeleteCancel);

function remove(uuid) {
    btnDeleteConfirm.dataset.uuid = uuid;
    removeModal.classList.add('d-block');
}

function handleDeleteConfirm() {
    const uuidToRemove = btnDeleteConfirm.dataset.uuid;
    document.getElementById(`item-${uuidToRemove}`).remove();
    removeModal.classList.remove('d-block');
}

function handleDeleteCancel() {
    removeModal.classList.remove('d-block');
}


function save(data) {
    const uuid = data.uuid ? data.uuid : generateUuid()

    const editedLi = document.getElementById(`item-${uuid}`)
    if (editedLi) {
        editedLi.querySelector(`#title-${uuid}`).innerText = data.title
        return
    }
    const editedDescription = document.getElementById(`item-${uuid}`)
    if (editedDescription){
        editedDescription.querySelector(`#description-${uuid}`).value = data.description
        return
    }
    let liElement = document.createElement('li')
    liElement.id = `item-${uuid}`
    liElement.innerHTML = `
    <div id="title-${uuid}">${data.title}</div>
    <textarea id="description-${uuid}">${data.description}</textarea>
    <div>
        <button data-uuid='${uuid}' class="btn btn-warning btn-sm edit-button">Edit</button>
        <button data-uuid='${uuid}' class="btn btn-danger remove-button">Remove</button>
    </div>`

    liElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')

    liElement.querySelector('.edit-button').addEventListener('click', function (event) {
        edit(event.target.dataset.uuid)
    })

    liElement.querySelector('.remove-button').addEventListener('click', function (event) {
        remove(event.target.dataset.uuid)
    })
    document.getElementById('todoList').appendChild(liElement)
}

function generateUuid() {
    return Math.random().toString(16).slice(2)
}
