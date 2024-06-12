import inquirer from "inquirer"

//Bank Account interface

interface BankAccount{
    accountNumber:number;
    balance:number;
    withDraw(amount : number): void
    deposit(amount : number): void
    checkBalance(): void
}

//Bank Account Class

class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }

//   Debit Money
withDraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
    console.log(`Withdrawal of $${amount} successful. Remaining $${this.balance}`);
        }else{
            console.log("Insufficient Balance.");
            
        }
}

//Credit Money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; //$1 fee charge if more than $100 is deposited.
    }this.balance += amount;
    console.log(`Deposit of $${amount} successful . Remaining balance : $${this.balance}`);
    
}

//Check Balance
checkBalance(): void {
    console.log(`Current balance $${this.balance}`);
    
}
}

// Customer Class
class customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account
    }
}

//Creat Bank Accounts

const accounts: BankAccount[] = [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000),
];

// Creat Customers
const customers: customer[] = [
    new customer("Farooq","Siddiqui", "Male", 24, 3153335551, accounts[0]),
    new customer("Tuba","Shaikh", "Female", 20, 3023335551, accounts[1]),
    new customer("Duaa","Khan", "Female", 22, 3423335551, accounts[2])
]
//Function with interact with bank account
async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number"
        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if (customer){
        console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
const ans = await inquirer.prompt([{
    
        name: "select",
        type: "list",
        message: "Select an operation",
        choices: ["Deposit", "WithDraw", "CheckBalance", "Exit"]
    
        }]);

        switch(ans.select) {
            case "Deposit":
                const depositAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to deposit:"
                })
                customer.account.deposit(depositAmount.amount);
                break;
             case "WithDraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    })
                    customer.account.withDraw(WithdrawAmount.amount);
                    break;
            case "CheckBalance":
                customer.account.checkBalance();
                break;
            case "Exit":
                console.log("Exiting bank programe ...");
                console.log("\n Thank You for using our bank services. Have a great day!");
                return;
        }

        }else{
            console.log("Invalid account number. Please try again");
            
        }
    } while(true)
}
service()