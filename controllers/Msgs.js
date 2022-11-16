import Msg from "../models/Msgs.js";

export const updateMsg = async (req, res) => {
    console.log(req.body)
    try {
        await Msg.update(req.body, {
            where: {
                id: 1
            }
        });

        res.json({
            "message": "Msg Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getMsg = async (req, res) => {
    try {
        const msg = await Msg.findAll({
            where: {
                id: 1
            }
        });
        res.json(msg[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}