import crypto from "crypto";

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

const getSecretKey = () => {
  return "defaultsecretkeydefaultsecretkey"
};

const encrypt = (text) => {
  const secretKey = getSecretKey()
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return encrypted.toString('hex')
};

const decrypt = (content) => {
  const secretKey = getSecretKey()
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
  return decrypted.toString();
};

export {encrypt, decrypt, iv} ;

