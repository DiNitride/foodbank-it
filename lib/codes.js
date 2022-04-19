import db from './db'

export async function getCodes() {
    let codes = await db.query('SELECT ReferralCode.*, User.UserId, User.UserForename, User.UserSurname, User.UserUsername FROM `ReferralCode` \
    LEFT JOIN `User` ON ReferralCode.CreatedBy = User.UserId')
    await db.end()
    return codes
}

export async function getCodesCreatedByUser(userId) {
    let codes = await db.query('SELECT * FROM `ReferralCode` WHERE CreatedBy = ?', [userId])
    await db.end()
    return codes
}

export async function getCodesFromOrg(orgId) {

}

export async function getCodeById(id) {
    let code = await db.query('SELECT * FROM `ReferralCode` WHERE CodeId = ?', [id])
    await db.end()
    return code[0]
}

export async function getCode(code) {
    let existing = await db.query('SELECT * FROM `ReferralCode` WHERE Code = ?', [code])
    await db.end()
    return existing[0]
}

export async function insertCode(code, surname, createdBy) {
    let { insertId } = await db.query('INSERT INTO `ReferralCode` VALUES (NULL, ?, ?, NULL, 0, ?)', [code, surname, createdBy])
    let codeData = await getCodeById(insertId)
    await db.end()
    return codeData
}

export function generateCode() {
    // Generates random code
    let chars = []
    for (let x = 0; x < 8; x++) {
        let rInt = Math.floor((Math.random() * 26) + 65) 
        chars = [...chars, rInt]
    }
    return String.fromCharCode(...chars)
}

export async function redeemCode(codeId, userId) {
    let transaction = await db.query('UPDATE ReferralCode \
    SET ClaimedBy = ?, Redeemed = 1 WHERE CodeId = ?', [userId, codeId])
    await db.end()
    return transaction
}
