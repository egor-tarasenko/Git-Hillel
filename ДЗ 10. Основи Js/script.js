let string = 'Hello-world'
let num = 3
let bool = true
let letNull = null

console.log("Тип змінної 'string': " + typeof string)
console.log("Тип змінної 'num': " + typeof num)
console.log("Тип змінної 'boolean': " + typeof stringVar)
console.log("Тип змінної 'null': " + typeof letNull)

//Завдання 2

let firstName = "Egor"
let lastName = "Tarasenko"
let fullName = firstName + " " + lastName

console.log("Full name: " + fullName)

//Завдання 3

let name = prompt("Будь ласка, введіть ваше ім'я:")
let age

while (true) {
    age = prompt("Будь ласка, введіть свій вік:")
    if (!isNaN(age)) {
        break
    }
    alert('Будь ласка, введіть свій вік цифрами')
}

alert(name + " тобі зараз " + age + " років")

alert(name + " тобі зараз " + age + " років")

// Завдання 4 - визначення можливості страхування користувача

const insuranceCompany = "Компанія A"
const isUkraine = confirm("Ти з України?")
const hadAccident = confirm("Чи були в тебе ДТП?")
const ageOver21 = confirm("Тобі більше 21?")
const hasEducation = confirm("Ти маєш вищу освіту?")
const hasSecondCar = confirm("У тебе є друге авто?")
const hasChildren = confirm("У тебе є діти?")
const hasLetterAInName = confirm("Чи є у твоєму імені літера 'А'?")

const isEligible = isUkraine && (!hadAccident || (ageOver21 && hasEducation && hasChildren)) || hasLetterAInName

const decision = isEligible ? "так" : "ні"

alert(`Статус рішення - ${decision}. З повагою, страхова компанія ${insuranceCompany}`)
