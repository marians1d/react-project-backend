const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const crypto = require('crypto');

/**
 * Insert new file.
 * @return{obj} file Id
 * */
async function uploadFile(file) {
    // Get credentials and build service

    const auth = new GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/drive'],
        keyFile: './src/config/dream-style-40553243c15c.json'
    });

    const service = google.drive({ version: 'v3', auth });

    const fileMetadata = {
        name: `${crypto.randomBytes(20).toString('hex')}.jpeg`,
        parents: ['1kTaxMgnoLWvSI8ZKL2jwrEMc4BZ2XNvc'],
    };

    const media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(file.path),
    };

    try {
        const response = await service.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });

        console.log(response);
        
        console.log('File Id:', response.data.id);
        return response.data.id;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    uploadFile
};