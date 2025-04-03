import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

// Simulação de banco de dados em memória
import users from './register';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const user = users[email];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = `${email}-${Date.now()}`; // Token simples para simulação
    res.setHeader('Set-Cookie', serialize('auth_token', token, { path: '/', httpOnly: true }));

    return res.status(200).json({ message: 'Login bem-sucedido.', accountNumber: user.accountNumber });
  }

  return res.status(405).json({ error: 'Método não permitido.' });
}
