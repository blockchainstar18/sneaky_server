import Msg from "../models/Msgs.js";

// export const updateMsg = async (req, res) => {
//     console.log(req.body)
//     try {
//         await Msg.update(req.body, {
//             where: {
//                 id: 1
//             }
//         });

//         res.json({
//             "message": "Msg Updated"
//         });
//     } catch (error) {
//         res.json({ message: error.message });
//     }
// }


export const newMsg = async (req, res) => {
    Msg.create(req.body).then(() =>
        res.send(true)
    )
}

export const deleteMsg = async (req, res) => {
    console.log(req.body.Msgs)
    Msg.destroy({
        where: {
            Msgs: req.body.Msgs
        }
    }).then(() =>
        res.send(true)
    )

}


export const getMsg = async (req, res) => {
    try {
        const msg = await Msg.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(msg);
    } catch (error) {
        res.json({ message: error.message });
    }
}