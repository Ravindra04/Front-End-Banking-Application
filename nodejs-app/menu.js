const readline = require('readline')
const { createNewAccount, deposit, withdraw, balance, transfer } = require('./db')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(' Welcome To Ryan Sandbergs Banking Application ')
console.log('\n 1. Create new account')
console.log('\n 2. Deposit Money')
console.log('\n 3. Withdraw Money')
console.log('\n 4. Check Balance')
console.log('\n 5. Transfer Money')
console.log('\n 6. Exit')

const ip = (msg) => new Promise((resolve, reject) => {
    rl.question(`\n 👉 ${msg} : `, (ch) => {
        resolve(ch)
    })
})

const start = async () => {
    while (true) {
        const choice = await ip('Enter Your Choice')

        if (choice == 1) {
            console.log(`\n Please Create the Account`)
            const acId = parseInt(await ip('Please Enter the Account Id'))
            const acNm = await ip(' Please Enter the Account Name')
            const balance = 0
            createNewAccount({ acId, acNm, balance })
        }
        else if (choice == 2) {
            console.log(`\n Please Deposit Your Money`)

            const acId = parseInt(await ip('Please Enter Account Id'))
            const amount = parseFloat(await ip('Please Enter the Amount'))

            deposit({ acId, amount })
        }
        else if (choice == 3) {
            console.log(`\n  Withdraw Money`)

            const acId = parseInt(await ip('Enter Account Id'))
            const amount = parseFloat(await ip('Enter Amount'))

            withdraw({ acId, amount })
        }
        else if (choice == 4) {
            console.log(`\n  Check the Balance`)
            const acId = parseInt(await ip('Enter Account Id'))
            balance(acId)
        }
        else if (choice == 5) {
            console.log(`\n  Please Transfer Money`)
            const srcId = parseInt(await ip('Please Enter Source Account Id'))
            const destId = parseInt(await ip('Please Enter Desitination Account Id'))
            const amount = parseFloat(await ip('Please Enter the Amount'))

            transfer({ srcId, destId, amount })
        }
        else {
            console.log(`Goodbye`)
            process.exit()
        }
    }
}

start()
