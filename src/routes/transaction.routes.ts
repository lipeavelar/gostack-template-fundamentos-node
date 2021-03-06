import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // list all transactions
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // create a transation
    return response.json(
      new CreateTransactionService(transactionsRepository).execute(
        request.body,
      ),
    );
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
