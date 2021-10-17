const userquery = require('./../model/user');
const pool = require('./../db');


const listUser = (req,res) => {
    pool.query(userquery.getUsers,(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};

const listRoles = (req,res) => {
    pool.query(userquery.listRoles,(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
}


const createRole = (req,res) => {
    const {roles} = req.body;
    //checking email exist
    pool.query(userquery.checkRoleExist,[roles], (error,results) => {
        if(results.rows.length){
            res.status(400).send("Role exist already");
        }else{
            pool.query(userquery.addRole,[roles],(error,result) => {
                if(error) throw error;
                res.status(201).send("A role successfully added !");
            });
        }
        
    });
}


const signup = (req,res) => {
/*     const user = User({
        email: req.body.email,
        password: req.body.password
    });
    user.save().then((error)=>{
        if(error){
            res.json(error);
        }else{
            res.json(user);
        }
    }); */

    const {firstname,lastname,gender,age,email,country,address,workdomain,pseudo,user_password,role_id} = req.body;
    //checking email exist
    pool.query(userquery.checkEmailExist,[email], (error,results) => {
        if(results.rows.length){
            res.send("Email exist already");
        }else{
            //add user to DB
            pool.query(userquery.addSpecialist,[firstname,lastname,gender,age,email,country,address,workdomain,pseudo,user_password,role_id],(error,results) => {
                if(error) throw error;
                res.status(201).send("User Added");
            });
        }
    
    });

    
}


const signin = (req,res) => {
  /*   const user = User({
        email: req.body.email,
        password: req.body.password
    });
    user.save().then((error)=>{
        if(error){
            res.json(error);
        }else{
            res.json(user);
        }
    });

    pool.query(userquery.searchUser,(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    }); */

    const {email,password} = req.body;
    pool.query(userquery.searchUser,[email,password],(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
    
}


const updateUser = (req,res) => {
    const id = parseInt(req.params.id);
    const {firstname,lastname,gender,age,email,country,address,workdomain,pseudo,user_password} = req.body;

    pool.query(userquery.getUserById,[id], (error,results) => {
        const noCriteriaFound = !results.rows.length;
        if(noCriteriaFound){
            res.send("No user with the id specified");
        }
    });

    pool.query(userquery.updateUserDetail,[id,firstname,lastname,gender,age,email,country,address,workdomain,pseudo,user_password], (error,results) => {
        if(error) throw error;
        //res.status(200).json(results.rows);
        pool.query(userquery.getUserById,[id], (error,results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
        });
    });
    
   
}


const sendchatPrivately = (req,res) => {
    const {chat_text,send_date,unread,sender_id,receiver_id} = req.body;
    
    pool.query(userquery.sendChatWithUser,[chat_text,send_date,unread,sender_id,receiver_id],(error,result) => {
        if(error) throw error;
        res.status(201).send("A Message send !");
    });
}


module.exports = {
    listUser,
    signup,
    signin,
    updateUser,
    createRole,
    listRoles,
    sendchatPrivately
};