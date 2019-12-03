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