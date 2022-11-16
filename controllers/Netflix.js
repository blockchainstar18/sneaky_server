import Netflix from "../models/Netflix.js";

export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Netflix.findAll();
        res.json(accounts);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAccountById = async (req, res) => {
    console.log(req.params)
    try {
        const account = await Netflix.findAll({
            where: {
                email: req.params.email
            }
        });
        res.json(account[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createAccount = async (req, res) => {
    try {
        await Netflix.create(req.body);
        res.json({
            "message": "Netflix Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateAccount = async (req, res) => {
    try {
        await Netflix.update(req.body, {
            where: {
                email: req.params.email
            }
        });
        res.json({
            "message": "Netflix Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        await Netflix.destroy({
            where: {
                email: req.params.email
            }
        });
        res.json({
            "message": "Netflix account Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}