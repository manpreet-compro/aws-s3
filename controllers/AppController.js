const config = require('../config');
const awsHelper = require('../helpers/aws');

exports.uploadData = async(req, res)=>{
    const score = JSON.stringify(req.body);
    const key = `platform1/course-10001/lineitem-10002/${req.body.userId}.json`;

    try{
        const result = await awsHelper.saveData(key,score);
        res.json(result)
    }
    catch(ex){
        res.status(500).send(ex.message)
    }
}

exports.displayData = async(req, res)=>{
    const lineitemId = `platform1/course-10001/${req.query.lineItemID}`;

    try{
        let data = [];
        const list = await awsHelper.listData(lineitemId);
        if(list.Contents.length > 0){
            const allPromises = [];
            list.Contents.forEach((obj) => {
                allPromises.push(awsHelper.getData(obj.Key))
            })
            data = await Promise.all(allPromises);
            res.json(data);
        }
        else{
            res.json(data)
        }
        
    }
    catch(ex){
        res.status(500).send(ex.message)
    }
}