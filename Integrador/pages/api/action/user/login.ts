import { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "../../controller/UserController";


export default async (req: NextApiRequest , res: NextApiResponse) => {
    if ( req.method != 'POST' ) {
        return res.status(403).json({ message: 'Method not allowed' });
    }

    const { login , password } = req.body;

    const response:any = await signIn(login, password);

    if ( response.message != undefined ) {
        return res.status(403).json(response);
    }
    else {
        return res.status(200).json(response);
    }
}