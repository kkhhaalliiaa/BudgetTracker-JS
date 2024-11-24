// Defines the Budget class
class Budget {
    constructor() {
      this.transactions = []; // Array to store transactions
    }

    // Add a new transaction (either income or expense)
    addTransaction(name, amount, date, type) {
    const transaction = {
        id: Date.now().toString(), // Creates a ID based on current time
        name,
        amount,
        date,
        type
    };
      this.transactions.push(transaction); // Add the transaction to the list
      this.renderTransactions(); // Update the transaction list
      this.updateTotals(); // Re-calculates the totals
    }

    // Delete a transaction by its ID
    deleteTransaction(transactionId) {
    this.transactions = this.transactions.filter(transaction => transaction.id !== transactionId);
      this.renderTransactions(); // Re-render the list
      this.updateTotals(); // Re-calculates the totals
    }

    // Update the totals for income, expenses, and balance
    updateTotals() {
    let totalIncome = 0;
    let totalExpense = 0;

      // Calculate the totals for income and expenses
    this.transactions.forEach(transaction => {
        if (transaction.type === "income") {
        totalIncome += transaction.amount;
        } else {
        totalExpense += transaction.amount;
        }
});

      // Update the UI with the most recent totals
    const balance = totalIncome - totalExpense;
    document.getElementById("balance").textContent = `$${balance.toFixed(2)}`;
    document.getElementById("income").textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById("expense").textContent = `$${totalExpense.toFixed(2)}`;
    }

    // Render the list of transactions on the page
    renderTransactions() {
    const transactionList = document.getElementById("transaction-list").getElementsByTagName("tbody")[0];
      transactionList.innerHTML = ""; // Clears the current list

      // If no transactions, show a message
    if (this.transactions.length === 0) {
        document.getElementById("status-message").textContent = "No transactions.";
    } else {
        document.getElementById("status-message").textContent = `${this.transactions.length} transaction(s)`;
    }

      // Add each transaction as a row in the table
    this.transactions.forEach(({ id, name, amount, date, type }) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${name}</td>
        <td>$${amount.toFixed(2)}</td>
        <td>${date}</td>
        <td><button class="delete-btn" data-id="${id}">Delete</button></td>
        `;
        // Add event listener to handle delete button
        row.querySelector(".delete-btn").addEventListener("click", (e) => {
        this.deleteTransaction(e.target.dataset.id);
        });
        transactionList.appendChild(row);
    });
    }
}

  // Create an time where the Budget class
    const budget = new Budget();

  // Handle form submission to add a new transaction
document.getElementById("transaction-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the page from reloading on its own

    const name = event.target.name.value.trim(); // Get the transaction name
    const amount = parseFloat(event.target.amount.value); // Get the amount and converts it into a number
    const date = event.target.date.value; // Get the date
    const incomeCheckbox = document.getElementById("income-checkbox");
    const expenseCheckbox = document.getElementById("expense-checkbox");

    // Make sure the form is filled out correctly
    if (!name || isNaN(amount) || !date) {
    alert("Please fill in all fields.");
    return;
    }

    // Determine whether the transaction is income or expense
    let type;
    if (incomeCheckbox.checked && !expenseCheckbox.checked) {
    type = "income";
    } else if (expenseCheckbox.checked && !incomeCheckbox.checked) {
    type = "expense";
    } else {
    alert("Please select either Income or Expense.");
    return;
    }

    // Add the new transaction using the Budget class
    budget.addTransaction(name, amount, date, type);

    // Reset the form after submission
    event.target.reset();
});

  // Initial render of transactions and totals
    budget.renderTransactions();
    budget.updateTotals();
