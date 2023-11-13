function addElement() {
    let newItem = prompt("Введите новый элемент для To-Do списка:")
    if (newItem) {
        let list = document.getElementById("todoList")
        let li = document.createElement("li")
        li.className = "list-group-item d-flex justify-content-between align-items-center"

        let textNode = document.createElement("span")
        textNode.appendChild(document.createTextNode(newItem))
        li.appendChild(textNode)

        let buttonsDiv = document.createElement("div")

        let editButton = document.createElement("button")
        editButton.className = "btn btn-warning btn-sm"
        editButton.innerText = "Редактировать"
        editButton.addEventListener("click", function() {
            editElement(li)
        })
        buttonsDiv.appendChild(editButton)

        let deleteButton = document.createElement("button")
        deleteButton.className = "btn btn-danger btn-sm ms-2"
        deleteButton.innerText = "Удалить"
        deleteButton.addEventListener("click", function() {
            removeElement(li)
        })
        buttonsDiv.appendChild(deleteButton)

        li.appendChild(buttonsDiv)

        list.appendChild(li)
    }
}

function removeElement(item) {
    let list = document.getElementById("todoList")
    let confirmDelete = confirm("Вы уверены, что хотите удалить элемент?")

    if (confirmDelete) {
        list.removeChild(item)
    }
}

function editElement(item) {
    let newText = prompt("Введите новый текст для элемента:", item.firstChild.firstChild.nodeValue)

    if (newText) {
        item.firstChild.firstChild.nodeValue = newText
    }
}