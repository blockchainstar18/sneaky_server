import Disneyplus from "../models/Disneyplus.js";
import Netflix from "../models/Netflix.js";
import Hbomax from "../models/Hbomax.js";
import ExAccount from "../models/Exaccs.js";
import db from "../config/database.js";
import Crunchyroll from "../models/Crunchyroll.js";
import Dazn from "../models/Dazn.js";


export const deductReplacements = (req, res) => {
    db.query(`select * from ${req.body.stream} where ip = '${req.body.ip}'`).then((res_) => {
        if (res_[0][0].replacements > 0) {
            db.query(`update ${req.body.stream} set replacements = (replacements-1) where ip = '${req.body.ip}'`).then(() => {
                res.json({
                    result: true
                })
            })
        }
        else {
            res.json({
                result: false
            })
        }
    })
}


export const getCredentials = async (req, res) => {
    console.log(req.body)
    if (req.body.membership == 'standby') {

        await db.query(`update exaccs set startedAt = CURDATE() where ip = '${req.body.ip}'`)
    }

    const re = await db.query(`select * from ${req.body.stream} where ip = '${req.body.ip}'`)
    if (!re[0][0].startedAt) {
        // await db.query(`update ${req.body.stream} set replacements = (replacements-1) where ip = '${req.body.ip}'`)
        await db.query(`update ${req.body.stream} set startedAt = CURDATE() where ip = '${req.body.ip}'`)
    }

    if (req.body.membership == 'retry') {
        const current = await db.query(`select * from ${req.body.stream} where ip = '${req.body.ip}'`)
        const ip = current[0][0].ip
        const startedAt = current[0][0].startedAt
        const replacements = current[0][0].replacements

        await db.query(`update ${req.body.stream} set flag = 0, ip = null, startedAt = null, replacements = null where ip = '${req.body.ip}'`)
        await db.query(`update ${req.body.stream} set ip = '${ip}', startedAt = '${startedAt}',replacements = '${replacements}' where ip is NULL and flag = 1 LIMIT 1`)
    }

    const result = await db.query(`select * from ${req.body.stream} where ip = '${req.body.ip}'`)
    if (result[0][0].replacements > 0) {
        if (req.body.stream == 'netflix') {
            console.log(result[0][0])
            res.json({
                active: true,
                NetflixId: result[0][0].NetflixId,
                SecureNetflixId: result[0][0].SecureNetflixId
            })
        }
        else {
            res.json({
                active: true,
                email: result[0][0].email,
                password: result[0][0].password
            })
        }
    }

    else {
        res.json({
            active: false
        })
    }


}

const get_Day_Replacement = async (stream, ip) => {
    const result = await db.query(`SELECT replacements, 30-DATEDIFF(CURDATE(), startedAt) as days FROM ${stream} where ip = '${ip}'`)
    console.log(result[0][0])
    const replacements = result[0][0].replacements
    const days = result[0][0].days
    return [replacements, days]
}


export const checkMembership = async (req, res) => {

    var state
    // const streams = [
    //     'hbomax',
    //     'netflix',
    //     'disneyplus',
    //     'crunchyroll',
    //     'dazn'
    // ]

    // const result = await db.query(`SELECT * FROM ${req.body.stream} where ip = '${req.body.ip}'`)
    // if (result[0][0])
    //     for (var i = 0; i < streams.length; i++) {
    //         var stream = streams[i];
    //         const [replacements, days] = await get_Day_Replacement(stream, req.body.ip)
    //         if (stream == req.body.stream && days == null)
    //             state = 'standby'
    //         if (stream == req.body.stream && days != null)
    //             state = 'active'
    //         if ((days != null && days <= 0) || (stream == req.body.stream && replacements <= 0))
    //             state = 'fulfilled'
    //     }
    // else
    //     state = 'new'

    const exacc = await ExAccount.findOne({
        where: {
            ip: req.body.ip
        }
    })
    if (exacc) {
        const result = await db.query(`SELECT 30-DATEDIFF(CURDATE(), startedAt) as days FROM exaccs where ip = '${req.body.ip}'`)
        if (result[0][0].days == null)
            state = 'standby'
        if (result[0][0].days != null)
            state = 'active'
        if (result[0][0].days != null && result[0][0].days <= 0)
            state = 'fulfilled'
    }
    else
        state = 'new'



    console.log(state)

    res.json({
        response: state
    })

}


const createAccounts = async (model, ip, replacements) => {
    const acc = await model.findOne({
        where: {
            ip: null,
            flag: 1
        }
    })

    await model.update(
        {
            ip: ip,
            replacements: replacements
        },
        {
            where: {
                email: acc.email
            }
        })
}


export const signinToExtension = async (req, res) => {
    console.log(req.body)
    const exacc = await ExAccount.findOne({
        where: {
            user: req.body.user,
            password: req.body.password,
            ip: null
        }
    })
    if (exacc) {
        await ExAccount.update(
            {
                ip: req.body.ip,
            },
            {
                where: {
                    user: req.body.user,
                    password: req.body.password
                }
            })

        createAccounts(Disneyplus, req.body.ip, exacc.id)
        // createAccounts(Hbomax, req.body.ip, exacc.id)
        // createAccounts(Netflix, req.body.ip, exacc.id)
        // createAccounts(Crunchyroll, req.body.ip, exacc.id)
        // createAccounts(Dazn, req.body.ip, exacc.id)


        res.json({
            message: true
        })
    }
    else {
        res.json({
            message: false
        })
    }
}

export const getMembership = async (req, res) => {
    const [replacements, days] = await get_Day_Replacement(req.body.stream, req.body.ip)

    const result = await db.query(`SELECT 30-DATEDIFF(CURDATE(), startedAt) as days FROM exaccs where ip = '${req.body.ip}'`)
    const alldays = result[0][0].days

    console.log(days)
    res.json({
        replacements: replacements,
        days: alldays
    })
}

export const checkuser = async (req, res) => {

    const exacc = await ExAccount.findOne({
        where: {
            user: req.body.user,
            ip: req.body.ip
        }
    })
    if (exacc) {
        res.json({
            message: true
        })
    }
    else {
        res.json({
            message: false
        })
    }
}