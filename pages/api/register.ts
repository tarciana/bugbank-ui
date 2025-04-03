import { NextApiRequest, NextApiResponse } from 'next';

let users: Record<string, any> = {}; // Simulação de banco de dados em memória

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password, initialBalance = 0 } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    if (users[email]) {
      return res.status(400).json({ error: 'Usuário já registrado.' });
    }

    const accountNumber = `${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10)}`;
    users[email] = { name, email, password, accountNumber, balance: initialBalance, transactions: [] };

    return res.status(201).json({ message: 'Usuário registrado com sucesso.', accountNumber });
  }

  return res.status(405).json({ error: 'Método não permitido.' });
}
