import crypto from "crypto";

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

const getSecretKey = (defaultToken = false) => {
  if (defaultToken)
    return "defaultsecretkeydefaultsecretkey"
  const token = JSON.parse(localStorage.getItem("token"))
  return token.token.slice(0, 32)
};

const encrypt = (text, defaultToken, encryptionEnable) => {
  if (encryptionEnable) {
    const secretKey = getSecretKey(defaultToken)
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString('hex')
  }
  return text
};

const decrypt = (content, encryption, defaultToken) => {
    if (encryption) {
      const secretKey = getSecretKey(defaultToken)
      const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
      const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
      return decrypted.toString();
    }
    return content
  }
;

export {encrypt, decrypt, iv} ;

