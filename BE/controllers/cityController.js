import { postgreClient } from '../config/postgre.js';

export const insertCities = async (req, res) => {
    try {
        const requestData = req.body;
        for (let obj of requestData) {
            const { name, state } = obj;
            const isCityPresent = (await postgreClient.query(`select count(*) from indianCities where name=$1`,[name])).rows[0].count;
            if(isCityPresent > 0){
                console.log(`City "${name}" is already present. Skipping insertion.`);
                continue;
            }
            const sqlQuery = `INSERT INTO indianCities(name,state) VALUES($1,$2)`;
            await postgreClient.query(sqlQuery,[name,state]);
        }
        await postgreClient.query("COMMIT;");
        res.json({ 'status': 'ok' });
    } catch (error) {
        console.error("Error inserting cities:", error);
        await postgreClient.query("ROLLBACK;")
        return res.status(500).json({ message: error.message });
    }
}

export const getCitiesList = async(req,res) =>{
    try{
        const result = (await postgreClient.query(`select distinct name from indianCities order by name`)).rows;
        res.json(result);
    }catch(error){
        return res.status(500).json({ message: error.message });    
    }
}