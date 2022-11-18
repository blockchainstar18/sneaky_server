import ExAccount from "../models/Exaccs.js";
// import User from "../models/User.js"
import randomWords from 'random-words'
import generator from 'generate-password'
import db from "../config/database.js";


export const getAccounts = async (req, res) => {
    try {
        const accounts = await ExAccount.findAll();
        res.json(accounts);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getUsers = async (req, res) => {
    db.query(`select * from exaccs where ip is not null`)
        .then((users) => {
            res.json(users[0])
        })

}

export const generateAccounts = async (req, res) => {
    console.log(req.body.numberOfAccounts)

    for (let i = 0; i < req.body.numberOfAccounts; i++) {
        var password = generator.generate({
            length: 10,
            numbers: true,
            symbols: true,
        });

        let element = {
            id: req.body.numberOfReplacements,
            user: randomWords() + '@sneaky',
            password: password
        }

        console.log(element)
        try {
            await ExAccount.create(element)
            // res.json({
            //     "message": "ExAccount Created"
            // });
        } catch (error) {
            res.json({ message: error.message });
        }
    }

    res.json({ success: true })

}

export const deleteAccounts = async (req, res) => {

    try {
        const isValid = await ExAccount.findOne({
            where: {
                user: req.body.user,
                password: req.body.password
            }
        });
        if (isValid) {

            const currentUser = await User.findOne({
                where: {
                    ip: req.body.ip
                }
            })

            if (currentUser) {
                // in case of fulfilled user
                await User.update({ startedAt: null }, {
                    where: {
                        ip: req.body.ip
                    }
                })
            }
            else {
                await User.create({
                    ip: req.body.ip,
                    //replacements: isValid.dataValues.id
                });
            }

            await ExAccount.destroy({
                where: {
                    user: req.body.user,
                    password: req.body.password
                }
            });
            res.json({
                message: "Signed in successfully!"
            });
        }
        else {
            res.json({
                message: "Your credential seems to be invalid!"
            });
        }


    } catch (error) {
        res.json({ message: error.message });
    }
}