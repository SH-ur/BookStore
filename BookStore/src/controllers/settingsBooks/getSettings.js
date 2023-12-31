const {SettingsBook} = require("../../db.js")
const { Op } = require("sequelize");



const getSettingsByParams = async(querysVars)=>{
    const  dataState = {
        state: false,
        text:"",
        detail:""        
        };
    try{       
        const whereCondition = {}; // Objeto para almacenar las condiciones de búsqueda
        const keyValues = ["id", "type", "status"];

        for (const [key, value] of Object.entries(querysVars)) {
            if (keyValues.includes(key)) {
                whereCondition[key] = value;
            } else {
              whereCondition[key] = { [Op.iLike]: `%${value}%` };
            }
          }
            console.log(whereCondition)

        
        
                const { rows: settingFind, count: settingCount } = await SettingsBook.findAndCountAll({ 
                    where: whereCondition,
                    order: [['nameType', 'ASC']],
                });

                if(settingFind.length > 0){                    
                    dataState.state = true;
                    dataState.text = "Search successful";
                    dataState.detail = { settingCount ,settingFind} ;
                    return dataState
                }else{
                    dataState.state = false;
                    dataState.text = "Search not found";
                    dataState.detail = settingFind;
                    return dataState
                }
             

    }catch(err){
        //throw Error(err.message);
        dataState.state = false;
        dataState.text = err.message;
        throw Error(JSON.stringify(dataState));     
    }
}

module.exports={
    getSettingsByParams
}