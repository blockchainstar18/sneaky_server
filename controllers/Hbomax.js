import Hbomax from "../models/Hbomax.js";

export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Hbomax.findAll();
        res.json(accounts);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAccountById = async (req, res) => {
    console.log(req.params)
    try {
        const account = await Hbomax.findAll({
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
        await Hbomax.create(req.body);
        res.json({
            "message": "Hbomax Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateAccount = async (req, res) => {
    try {
        await Hbomax.update(req.body, {
            where: {
                email: req.params.email
            }
        });
        res.json({
            "message": "Hbomax Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        await Hbomax.destroy({
            where: {
                email: req.params.email
            }
        });
        res.json({
            "message": "Hbomax account Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}