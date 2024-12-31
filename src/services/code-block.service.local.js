import axios from 'axios'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'codeBlockDB'
_createCodeBlock()

export const codeBlockService = {
    query,
    getById,
    executeCode
}


async function query() {
    var codeBlocks = await storageService.query(STORAGE_KEY)
    return codeBlocks
}

function getById(codeBlockId) {
    return storageService.get(STORAGE_KEY, codeBlockId)
}


async function executeCode(outputCode) {

    if (!outputCode) return

    // try {
    //     const response = await axios.get(" https://emkc.org/api/v2/piston/runtimes");
    //     console.log(response.data); // Log the data property of the response
    // } catch (error) {
    //     console.error("Error fetching data:", error.message); // Handle errors
    // }

    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        "language": "js",
        "version": "18.15.0",
        "files": [
            {
                "content": outputCode
            }
        ]
    })
    console.log(response);

    return response.data.run.output
}

function _createCodeBlock() {
    let codeBlocks = utilService.loadFromStorage(STORAGE_KEY)
    if (!codeBlocks || !codeBlocks.length) {
        codeBlocks = [
            {
                _id: utilService.makeId(),
                subject: 'Loops - String Manipulation',
                quest:
                    `Read this string from the user: 'Reut'
                and print it backwards using a loop.`,
                solution: 'tueR',
                codeSolution: `
                console.log(reverseString('Reut'))
                function reverseString(str) {
                let reversed = ''
                for (let i = str.length - 1; i >= 0; i--) {
                reversed += str[i]
                }
                return reversed
                }`
            },
            {
                _id: utilService.makeId(),
                subject: 'Loops - Factorial Calculation',
                quest:
                    `Write the function getFactorial which receives the number 6 and returns 6! (Google ‘factorial’ if you are not sure what the mathematical definition of it is).`,
                solution: '720',
                codeSolution: `
                console.log(getFactorial(6))
                      function getFactorial(num) {
                      var factorial = 1
                      while (num > 1) {
                      factorial *= num
                      num--
                      }
                      return factorial}
                `
            },
            {
                _id: utilService.makeId(),
                subject: 'Array Operations',
                quest:
                    `Implement a function named biggerThan100.
                It receives this array of numbers: [100,20,-100,30,5,99,101]
                and returns a string of the only number that is greater than 100.`,
                solution: '101',
                codeSolution: `
                console.log(biggerThan100([100, 20, -100, 30, 5, 99, 101]))
                function biggerThan100(numbers) {
                for (let i = 0; i < numbers.length; i++) {
                if(numbers[i] > 100) return numbers[i]
                }
                }`
            },
            {
                _id: utilService.makeId(),
                subject: 'Arrow Methodes',
                quest: `Write a function using ES6 arrow syntax that receives an array of numbers:
                [2,5,8,9,1,3]
                and returns a comma-separated string of the even numbers.`,
                solution: '2,8',
                codeSolution: `
                console.log(getEvenNumbers([2, 5, 8, 9, 1, 3]))
                function getEvenNumbers(numbers) {
                return numbers.filter(num => num % 2 === 0).join(',')}`
            },
            {
                _id: utilService.makeId(),
                subject: 'Object Properties',
                quest: `John is 30 years old and he has many hobbies, such as gaming, dancing, and developing.
                However, his favorite hobby is sleeping. Create an object named 'person' with properties: name, age, and hobbies according to John's details. Print the person's most favorite hobby.`,
                solution: 'sleeping',
                codeSolution: `
                const person = {
                name: 'John',
                age: 30,
                hubbies: ['gaming','dancing', 'developing', 'sleeping']
                };
                console.log(person.hubbies[3])`
            },
            {
                _id: utilService.makeId(),
                subject: 'Promises - Delayed Resolution',
                quest: `Create a promise that resolves to the string 'Success' after 2 seconds.`,
                solution: 'Success',
                codeSolution: `
                const delayedPromise = new Promise((resolve) => {
                setTimeout(() => resolve('Success'), 2000);
                });
                delayedPromise.then(result => console.log(result))`
            },

        ]
        utilService.saveToStorage(STORAGE_KEY, codeBlocks)
    }
}






