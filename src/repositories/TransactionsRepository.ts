import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.forEach(transaction => {
      balance[transaction.type] += transaction.value;
    });

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create(transaction: Transaction): Transaction {
    // create new transaction
    const newTransaction = new Transaction(transaction);
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
