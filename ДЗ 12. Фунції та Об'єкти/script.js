//
// //Напишіть функцію, яка приймає масив чисел та повертає суму всіх елементів.
// let arr = [1,2,2,3,4,4,5,3]
// let sumArray = 0
// function sumArr(arr){
//     for (let i = 0; i < arr.length; i++){
//         sumArray += arr[i]
//     }
//     console.log("Сумма элементов массива:", sumArray)
// }
// sumArr(arr)
//
// //Створіть об'єкт "користувач" з полями "ім'я", "вік" та "статус". Напишіть функцію, яка приймає цей об'єкт і повертає рядок у форматі "Ім'я: [ім'я], Вік: [вік], Статус: [статус]"
//
// let user = {
//     name: 'Nike',
//     age: 10,
//     status: 'Dev'
// }
// function userInf(user){
//     return `Name: ${user.name}, Age: ${user.age}, Status: ${user.status}`
// }
// console.log(userInf(user))
//
// //Напишіть функцію, яка приймає рядок і повертає новий рядок із перевернутим порядком символів.
// let word = 'Mazda'
// function backWord(word){
//     return word.split('').reverse().join('')
// }
// console.log(backWord(word))
// //Створіть об'єкт"автомобіль" з полями "марка", "модель" та "рік випуску". Напишіть функцію, яка приймає цей об'єкт і виводить інформацію про автомобіль у консоль.
// let auto = {
//     marka: 'mazda',
//     model: 'x',
//     year: '2222'
// }
// function autoInf(auto){
//     return `Name: ${auto.marka}, Age: ${auto.model}, Status: ${auto.year}`
// }
// console.log(autoInf(auto))


let number = Math.floor(Math.random() * 100)
let guesses = 0

const output = document.querySelector('#output')
const prompt = document.querySelector('#prompt')
const input = document.querySelector('#prompt input')

prompt.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
    event.preventDefault()

    processInput(input.value)

    input.value = ''
}

function printMessage(message) {
    let li = document.createElement('li')

    li.textContent = message

    output.appendChild(li)
}

function clearOutput() {
    for (let i = 0; i < output.children.length; i++) {
        output.removeChild(output.children[i])
    }
}

function processInput(input) {
    if (!input) return

    printMessage(input)

    let guess = Number.parseInt(input)

    if (Number.isNaN(guess)) return

    guesses += 1

    if (guess > number) {
        printMessage('Много. Попробуй еще раз.')
    } else if (guess < number) {
        printMessage('Мало. Попробуй еще раз.')
    } else {
        printMessage(`Верно, это число ${guess}.`)
        printMessage(`Количество попыток: ${guesses}.`)
        printMessage('GAME OVER')

        prompt.remove()
    }
}


