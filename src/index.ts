import express, { Request, Response } from 'express';

export type CreateUserResponse = {
    email: string;
    externalId: string;
    userId: string;
};

export type CreateUserArgs = {
    email: string;
    externalId: string;
    fullname: string;
};

const app = express();
const port = 3000;

app.use(express.json());

/// @dev use it as env variable
const OWL_API_BASE_URL = 'https://contracts-api.owlprotocol.xyz/api';
const OWL_X_API_KEY = '4b4e60e8-ad32-41c5-b0a7-3cca2117700c'

app.post('/create-wallet', async (req: Request, res: Response) => {
  try {
    const additionalParams = {
        authMode: 'project',
    }

    const response = await fetch(`${OWL_API_BASE_URL}/project/projectUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': OWL_X_API_KEY,
      },
      body: JSON.stringify({
        ...req.body as CreateUserArgs,
        ...additionalParams
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data:CreateUserResponse = await response.json();
    res.json(data);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});