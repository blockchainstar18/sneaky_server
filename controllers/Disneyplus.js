import Disneyplus from "../models/Disneyplus.js";

export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Disneyplus.findAll();
        res.json(accounts);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAccountById = async (req, res) => {
    console.log(req.params)
    try {
        const account = await Disneyplus.findAll({
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
        await Disneyplus.create(req.body);
        res.json({
            "message": "Disneyplus Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateAccount = async (req, res) => {
    try {
        await Disneyplus.update(req.body, {
            where: {
                email: req.params.email
            }
        });
        res.json({
            "message": "Disneyplus Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        await Disneyplus.destroy({
            where: {
                email: req.params.email
            }
        });
        res.json({
            "message": "Disneyplus account Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}