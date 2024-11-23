import { postgreClient } from '../config/postgre.js';

export const insertLiveEventsDetails = async (req, res) => {
    try {
        const requestData = req.body;
        for (let obj of requestData) {

            const { title, description,start_date,when_details,end_date,venue_name,image_url } = obj;
            const isLiveEventPresent = (await postgreClient.query(`select count(*) from LiveEvents where title=$1`,[title])).rows[0].count;
            if(isLiveEventPresent > 0){
                console.log(`Event "${title}" is already present. Skipping insertion.`);
                continue;
            }
            const venue_id = (await postgreClient.query(`select venue_id from Venues where name=$1`,[venue_name])).rows[0].venue_id;
            const sqlQuery = `INSERT INTO LiveEvents(title, description,start_date,when_details,end_date,venue_id,image_url) VALUES($1,$2,$3,$4,$5,$6,$7)`;
            await postgreClient.query(sqlQuery,[title, description,start_date,when_details,end_date,venue_id,image_url]);
        }
        await postgreClient.query("COMMIT;");
        res.json({ 'status': 'ok' });
    } catch (error) {
        console.error("Error inserting cities:", error);
        await postgreClient.query("ROLLBACK;")
        return res.status(500).json({ message: error.message });
    }
}

export const insertVenueDetails = async(req,res) =>{
    try {
        const requestData = req.body;
        for (let obj of requestData) {

            const { name, address_line,google_map_link } = obj;
            const isVenuePresent = (await postgreClient.query(`select count(*) from Venues where name=$1`,[name])).rows[0].count;
            if(isVenuePresent > 0){
                console.log(`Venue "${name}" is already present. Skipping insertion.`);
                continue;
            }
            const sqlQuery = `INSERT INTO Venues(name, address_line,google_map_link) VALUES($1,$2,$3)`;
            await postgreClient.query(sqlQuery,[name, address_line,google_map_link]);
        }
        await postgreClient.query("COMMIT;");
        res.json({ 'status': 'ok' });
    } catch (error) {
        console.error("Error inserting cities:", error);
        await postgreClient.query("ROLLBACK;")
        return res.status(500).json({ message: error.message });
    } 
}

export const insertTicketDetails = async(req,res) =>{
    try {
        const requestData = req.body;
        for (let obj of requestData) {

            const { ticketSource, event_name ,ticketlink} = obj;
            const isTicketPresent = (await postgreClient.query(`select count(*) from tickets where ticketSource=$1`,[ticketSource])).rows[0].count;
            if(isTicketPresent > 0){
                console.log(`Ticket "${ticketSource}" is already present. Skipping insertion.`);
                continue;
            }
            const event_id = (await postgreClient.query(`select event_id from LiveEvents where title=$1`,[event_name])).rows[0].event_id;
            const sqlQuery = `INSERT INTO tickets(event_id,ticketSource, ticketlink) VALUES($1,$2,$3)`;
            await postgreClient.query(sqlQuery,[event_id, ticketSource,ticketlink]);
        }
        await postgreClient.query("COMMIT;");
        res.json({ 'status': 'ok' });
    } catch (error) {
        console.error("Error inserting cities:", error);
        await postgreClient.query("ROLLBACK;")
        return res.status(500).json({ message: error.message });
    } 
}

export const getBasicLiveEventsByLocation = async(req,res) =>{
    try{
        const {city}  = req.body;
        const result = (await postgreClient.query(`select * from liveEventBasicDetails where lower(city) = lower($1)`,[city])).rows;
        res.json(result);
    }catch(error){
        return res.status(500).json({ message: error.message });    
    }
}

export const getLiveEventsByEventCode = async(req,res) =>{
    try{
        const {event_code}  = req.body;
        const result = (await postgreClient.query(`select * from liveEventVenueDetails where event_code = ($1)`,[event_code])).rows[0];
        res.json(result);
    }catch(error){
        return res.status(500).json({ message: error.message });    
    }
}
