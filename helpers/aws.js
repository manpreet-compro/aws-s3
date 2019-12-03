const AWS = require('aws-sdk');
const awsConfig = require('../config').AWS;

const s3 = new AWS.S3({
    accessKeyId: awsConfig.accessKey,
    secretAccessKey: awsConfig.secretKey
});

function saveData(key, value){
    const params = {
        Bucket: awsConfig.bucketName, 
        Key: key,
        Body: value
    };
    return s3.putObject(params).promise();
}

function listData(prefix){
    const params = {
        Bucket: awsConfig.bucketName, 
        Prefix: prefix,
        MaxKeys: 10
    };
    return s3.listObjectsV2(params).promise();
}

function getData(key){
    const params = {
        Bucket: awsConfig.bucketName, 
        Key: key
    };
    return s3.getObject(params).promise().then((data) => JSON.parse(data.Body.toString()));
}


module.exports = {
    saveData,
    listData,
    getData
}


// File that needs to be uploaded.
// var file = '/tmp/photos-europe.tar'

// // Make a bucket called europetrip.
// minioClient.makeBucket('europetrip', 'us-east-1', function(err) {
//     if (err) return console.log(err)

//     console.log('Bucket created successfully in "us-east-1".')

//     var metaData = {
//         'Content-Type': 'application/octet-stream',
//         'X-Amz-Meta-Testing': 1234,
//         'example': 5678
//     }
//     // Using fPutObject API upload your file to the bucket europetrip.
//     minioClient.fPutObject('europetrip', 'photos-europe.tar', file, metaData, function(err, etag) {
//       if (err) return console.log(err)
//       console.log('File uploaded successfully.')
//     });
// });