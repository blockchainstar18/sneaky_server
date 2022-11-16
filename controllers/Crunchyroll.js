import Crunchyroll from "../models/Crunchyroll.js";

export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Crunchyroll.findAll();
        res.json(accounts);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAccountById = async (req, res) => {
    console.log(req.params)
    try {
        const account = await Crunchyroll.findAll({
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
        await Crunchyroll.create(req.body);
        res.json({
            "message": "Crunchyroll Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateAccount = async (req, res) => {
    try {
        await Crunchyroll.update(req.body, {
            where: {
                email: req.params.email
            }
        });
        res.json({
            "message": "Crunchyroll Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        await Crunchyroll.destroy({
            where: {
                email: req.params.email
            }
        });
        res.json({
            "message": "Crunchyroll account Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}