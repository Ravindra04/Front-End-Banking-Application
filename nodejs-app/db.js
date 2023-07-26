const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'Ryan Sandberg',
    password: 'Password',
    database: 'db',
    post: 5432
})

client.connect(err => {
    if (err) {
        console.log(` There was an issue in your command, please try again`)
        return
    }
    console.log(`\n  You are connected`)
})

const createNewAccount = ({ acId, acNm, balance }, onCreate = undefined) => {
    client.query(`insert into account values ($1, $2, $3)`, [acId, acNm, balance], (err, res) => {
        if (err) console.log(`\n  Problem In Creating the Customer`)
        else {
            console.log(`\n Welcome to Ryan Sandberg's bank`)
            if(onCreate) onCreate(`Welcome to Ryan's bank`)
        }
    })
}

const withdraw = ({ acId, amount }, onWithdraw = undefined) => {
    client.query(`select balance from account where ac_id = $1`, [acId], (err, res) => {
        if (err) {
            console.log(`\n There was an error in withdrawing your money`)
        } else {
            const balance = parseFloat(res.rows[0].balance)

            const newBalance = balance - parseFloat(amount)

            client.query(`update account set balance = $1 where ac_id = $2`, [newBalance, acId], (err, res) => {
                if (err) console.log(`\n There was an error withdawing your money`)
                else {
                    console.log(`\n You have withdrawn ${amount} `)
                    if(onWithdraw) onWithdraw(`You have withdrawn ${amount} `)
                }
            })
        }
    })
}

const deposit = ({ acId, amount }, onDeposit = undefined) => {
    client.query(`select balance from account where ac_id = $1`, [acId], (err, res) => {
        if (err) {
            console.log(`\n  There was an issue depositing your money`)
        }
        else {
            const balance = parseFloat(res.rows[0].balance)
            const newBalance = balance + parseFloat(amount)

            client.query(`update account set balance = $1 where ac_id = $2`, [newBalance, acId], (err, res) => {
                if (err) console.log(`\n  Problem In Depositing`)
                else  {
                    console.log(`\n  You have deposited ${amount} `)

                    if(onDeposit) onDeposit(`✅ Amount ${amount} Deposited Successfully`)
                }
            })
        }
    })
}

const transfer = ( {srcId, destId, amount }, onTransfer = undefined) => {
    withdraw({ acId : srcId, amount }, msgWd => {
        deposit({ acId : destId, amount }, msgDp => {
            if(onTransfer) onTransfer( `✅ Amount ${amount} Transferred Successfully` )
        })
    })
}

const balance  = (acId, onBalance = undefined) => {
    console.log(acId)
    client.query(`select balance from account where ac_id = $1`, [acId], (err, res) => {
        if (err) {
            console.log(`\n  Problem In Fetching the balance`)
            console.log(err)
        } else {
            const balance = parseFloat(res.rows[0].balance)
            console.log(`\n  Your Account Balance Is : ${balance}`)
            if(onBalance) onBalance(balance)
        }
    })
}

module.exports = {
    createNewAccount, deposit, withdraw, transfer, balance
}
