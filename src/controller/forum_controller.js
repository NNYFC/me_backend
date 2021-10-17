const forumsquery = require('./../model/forums');
const pool = require('./../db');


const listAllForums= (req,res) => {
    pool.query(forumsquery.listForums,(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};


const createForums = (req,res) => {
    const {forum,create_date,user_id} = req.body;
    //checking forum exist
    pool.query(forumsquery.checkForumExist,[forum], (error,results) => {
        if(results.rows.length){
            res.status(400).send("This Forum exist already");
        }else{
            pool.query(forumsquery.addForum,[forum,create_date,user_id],(error,result) => {
                if(error) throw error;
                res.status(201).send(" Forum Created !");
            });
        }
        
    });
}


const updateForum = (req,res) => {
    const id = parseInt(req.params.id);
    const {forum,create_date,user_id} = req.body;

    pool.query(forumsquery.searchForumById,[id], (error,results) => {
        const noCriteriaFound = !results.rows.length;
        if(noCriteriaFound){
            res.send("No Forum with the id specified");
        }else{
            pool.query(forumsquery.updateForum,[id,forum,create_date,user_id], (error,results) => {
                if(error) throw error;
                res.status(200);
            });
            pool.query(forumsquery.searchForumById,[id], (error,results) => {
                if(error) throw error;
                res.status(200).json(results.rows);
            });
        }
    });
}

const deleteForum = (req,res) => {
    const id = req.params.id;
    //first deleting existing messages before forums(child before parent)
    pool.query(forumsquery.removeMessagesByForumId,[id], (error,results) => {
        if(error){
            throw error;
            //res.status(400).send("Error occur trying delete forum messages");
        }else{
            pool.query(forumsquery.removeForum,[id],(error,result) => {
                if(error) throw error;
                res.status(201).send(" Forum successfully deleted !");
            });
        }
        
    });
}

const fetchForumWithMessages = (req,res) => {
    pool.query(forumsquery.retreiveForumsMessages,(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
}


module.exports = {
   listAllForums,
   createForums,
   updateForum,
   deleteForum,
   fetchForumWithMessages
};