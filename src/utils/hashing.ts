import bcrypt from 'bcrypt'

async function encryptPassword(password:string) {
    const salt = bcrypt.genSaltSync(10)
    const hash = await bcrypt.hash(password, salt)
    return hash;
}

export default encryptPassword;