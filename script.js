const bank = [];

// Debit card
const bankAccount = {
  accountNumber: "123456789",
  accountHolderName: "Alice",
  balance: 0,
  deposit(sum) {
    sum >= 5 && sum <= 5000
      ? (this.balance += sum)
      : alert("The authorized amount for deposit is from 5€ to 5000€!");
  },
  withdraw(sum) {
    sum <= this.balance && sum > 0
      ? (this.balance -= sum)
      : alert(
          `Entered amount is incorrect.\nMaximum possible withdrawal amount: ${this.balance}€.`
        );
  },
  checkBalance() {
    alert(this.balance + "€");
  },
};

function createAccount() {
  const nameInput = document.getElementById("name");
  const name = nameInput.value.trim();

  if (name) {
    bank.push({
      ...bankAccount,
      accountNumber: `${bank.length + 1}`,
      accountHolderName: name,
    });
    updateAccountsList();
  } else {
    alert("Enter your name");
  }

  nameInput.value = "";
}

function showAccounts() {
  updateAccountsList();
}

function updateAccountsList() {
  const accountList = document.getElementById("accountList");
  const showSection = document.getElementById("show");

  accountList.innerHTML = "";

  if (bank.length > 0) {
    showSection.style.display = "block";
    for (const account of bank) {
      const li = document.createElement("li");
      li.textContent = `ID: ${account.accountNumber}, Name: ${account.accountHolderName}, Balance: ${account.balance}`;
      accountList.appendChild(li);
    }
  } else {
    showSection.style.display = "none";
  }
}

const withdrawBtn = document.getElementById("withdraw");

withdrawBtn.onclick = function () {
  changeBalance("withdraw");
};

const depositBtn = document.getElementById("deposit");

depositBtn.onclick = function () {
  changeBalance("deposit");
};

function changeBalance(method) {
  const accountIdInput = document.getElementById("accountId");
  const accountId = accountIdInput.value.trim();

  const amountInput = document.getElementById("amount");
  const amount = amountInput.value.trim();

  if (accountId && amount) {
    let accountExist = false;

    for (const account of bank) {
      if (accountId === account.accountNumber) {
        account[method](+amount);
        updateAccountsList();
        accountExist = true;
        break;
      } 
    }

    if (!accountExist) {
      alert(`Account with ID ${accountId} doesn't exist!`);
    }
  } else {
    alert("Enter account ID and required amount!");
  }

  accountIdInput.value = "";
  amountInput.value = "";
}
