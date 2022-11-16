import Dazn from "../models/Dazn.js";

export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Dazn.findAll();
        res.json(accounts);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAccountById = async (req, res) => {
    console.log(req.params)
    try {
        const account = await Dazn.findAll({
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
        await Dazn.create(req.body);
        res.json({
            "message": "Dazn Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateAccount = async (req, res) => {
    try {
        await Dazn.update(req.body, {
            where: {
                email: req.params.email
            }
        });
        res.json({
            "message": "Dazn Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        await Dazn.destroy({
            where: {
                email: req.params.email
            }
        });
        res.json({
            "message": "Dazn account Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}