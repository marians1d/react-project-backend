const fs = require('fs');
const { google } = require('googleapis');
const crypto = require('crypto');

/**
 * Insert new file.
 * @return{obj} file Id
 * */
async function uploadFile(file) {
    // Get credentials and build service
    const auth = new google.auth.GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/drive',
        keyFile: './config/dream-style-8f0852347837.json'
    });

    const service = google.drive({ version: 'v3', auth });

    const fileMetadata = {
        name: `${crypto.randomBytes(20).toString('hex')}.png`,
        parents: ['1kTaxMgnoLWvSI8ZKL2jwrEMc4BZ2XNvc'],
    };

    const media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(file.path),
    };

    try {
        const file = await service.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });
        console.log('File Id:', file.data.id);
        return file.data.id;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    uploadFile
};