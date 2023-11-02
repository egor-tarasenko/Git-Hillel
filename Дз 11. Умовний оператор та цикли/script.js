let number = 1;
if (number > 0) {
    console.log('Число позитивне')
} else if (number < 0) {
    console.log('Число негативне')
} else {
    console.log('Число нуль')
}

let text = '';
if (text === '') {
    console.log('Текст порожній')
} else {
    console.log('Текст не порожній')
}

let number1 = 12
let number2 = 6
if (number1 % number2 === 0 && number1 % 2 === 0) {
    console.log('Перше число кратне другому та парне')
} else {
    console.log('Перше число не відповідає умові')
}

for (let i = 1; i <= 100; i++) {
    console.log(i);
}

for (let i = 100; i >= 1; i--) {
    console.log(i);
}

let num = 5
for (let i = 1; i <= 10; i++) {
    const result = num * i;
    console.log(`${num} x ${i} = ${result}`)
}
console.log(`Таблиця множення для числа ${num}:`)

for (let i = 0; i <= 50; i++){
    if (i % 2 === 0){
        console.log(i)
    }
}

let height = 5

for (let i = 1; i <= height; i++) {
    let stars = ''

    for (let j = 1; j <= i; j++) {
        stars += '*'
    }

    console.log(stars)
}

for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
        const result = i * j;
    }
}
for (let i = 1; i <= 5; i++) {
    let row = ''
    for (let j = 1; j <= i; j++) {
        row += i
    }
    console.log(row)
}

function pascal(n, a) {
    if (n < 2) return a
    let row = a[a.length - 1]
    let row2 = [1]
    for (let i = 1; i < row.length; i++) {
        row2[i] = row[i] + row[i - 1]
    }
    row2.push(1)
    a.push(row2)
    return pascal(n - 1, a)
}

function printCenteredPascalTriangle(num) {
    let triangle = pascal(num, [[1]])
    let maxRowLength = triangle[triangle.length - 1].join(' ').length

    for (let i = 0; i < triangle.length; i++) {
        let row = triangle[i].join(' ')
        let rowPadding = ' '.repeat((maxRowLength - row.length) / 2)
        console.log(rowPadding + row + '\n')
    }
}

printCenteredPascalTriangle(num)





