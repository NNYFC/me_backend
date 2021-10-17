const testcentersquery = require('./../model/test_centers');
const pool = require('./../db');


const listTestCenters = (req,res) => {
    pool.query(testcentersquery.listTestCenters,(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};


const createTestCenters = (req,res) => {
    const {center_name,place_name,longitude,latitude,user_id} = req.body;
    //checking question exist
    pool.query(testcentersquery.checkTestCenterExist,[center_name], (error,results) => {
        if(results.rows.length){
            res.status(400).send("Test center already exist");
        }else{
            pool.query(testcentersquery.addTestCenters,[center_name,place_name,longitude,latitude,user_id],(error,result) => {
                if(error) throw error;
                res.status(201).send(" Test center successfully added !");
            });
        }
        
    });
}


const updateTestCenters = (req,res) => {
    const id = parseInt(req.params.id);
    const {center_name,place_name,longitude,latitude} = req.body;

    pool.query(testcentersquery.searchTestCenterById,[id], (error,results) => {
        const noCriteriaFound = !results.rows.length;
        if(noCriteriaFound){
            res.send("No Test center with the id specified");
        }else{
            pool.query(testcentersquery.updateTestCenters,[center_name,place_name,longitude,latitude,id], (error,results) => {
                if(error) throw error;
                res.status(200);
            });
            pool.query(testcentersquery.searchTestCenterById,[id], (error,results) => {
                if(error) throw error;
                res.status(200).json(results.rows);
            });
        }
    });
}

const deleteTestCenters = (req,res) => {
    const id = req.params.id;
    //checking test center exist
    pool.query(testcentersquery.searchTestCenterById,[id], (error,results) => {
        if(results.rows.length){
            pool.query(testcentersquery.removeTestCenters,[id],(error,result) => {
                if(error) throw error;
                res.status(201).send(" Test center successfully deleted !");
            });
        }else{
            res.status(404).send("Question does not exist");
        }
        
    });
}


module.exports = {
    listTestCenters,
    createTestCenters,
    updateTestCenters,
    deleteTestCenters
};