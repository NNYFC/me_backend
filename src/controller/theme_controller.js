const themequery = require('./../model/theme');
const pool = require('./../db');


const listTheme = (req,res) => {
    pool.query(themequery.listTheme,(error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};




const createTheme = (req,res) => {
    const {theme,description,color,user_id} = req.body;
    //checking email exist
    pool.query(themequery.checkThemeExist,[theme], (error,results) => {
        if(results.rows.length){
            res.status(400).send("Theme exist already");
        }else{
            pool.query(themequery.addTheme,[theme,description,color,user_id],(error,result) => {
                if(error) throw error;
                res.status(201).send(" Theme successfully added !");
            });
        }
        
    });
}


const updateTheme = (req,res) => {
    const id = parseInt(req.params.id);
    const {theme,description,color} = req.body;

    pool.query(themequery.getThemeById,[id], (error,results) => {
        const noCriteriaFound = !results.rows.length;
        if(noCriteriaFound){
            res.send("No Theme with the id specified");
        }else{
            pool.query(themequery.updateUserDetail,[id,theme,description,color], (error,results) => {
                if(error) throw error;
                res.status(200);
            });
            pool.query(themequery.getThemeById,[id], (error,results) => {
                if(error) throw error;
                res.status(200).json(results.rows);
            });
        }
    });
}


module.exports = {
    listTheme,
    createTheme,
    updateTheme,
};