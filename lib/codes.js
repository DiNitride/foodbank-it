import db from './db'

export async function getCodes() {
    let codes = await db.query('SELECT ReferralCode.*, User.UserId, User.UserForename, User.UserSurname, User.UserUsername FROM `ReferralCode` \
    LEFT JOIN `User` ON ReferralCode.CreatedBy = User.UserId')
    console.log(codes)
    return codes
}

export async function getCodeById(id) {
    let code = await db.query('SELECT * FROM `ReferralCode` WHERE CodeId = ?', [id])
    return code[0]
}

export async function getCode(code) {
    let existing = await db.query('SELECT * FROM `ReferralCode` WHERE Code = ?', [code])
    return existing[0]
}

export async function insertCode(code, surname, createdBy) {
    console.log(`Inserting code ${code} for surname ${surname}`)
    let { insertId } = await db.query('INSERT INTO `ReferralCode` VALUES (NULL, ?, ?, NULL, 0, ?)', [code, surname, createdBy])
    console.log(`Inserted code with ID ${insertId}`)
    let codeData = await getCodeById(insertId)
    console.log(`Got code data ${codeData}`)
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