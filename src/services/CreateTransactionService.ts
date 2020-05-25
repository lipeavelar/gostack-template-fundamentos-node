import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: Transaction): Transaction {
    if (
      transaction.type === 'outcome' &&
      transaction.value > this.transactionsRepository.getBalance().total
    )
      throw new Error('Outcome cannot overcome balance');

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
