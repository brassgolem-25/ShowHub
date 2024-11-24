import { postgreClient } from '../config/postgre.js';
import axios from 'axios';

export const insertLiveEventsDetails = async (req, res) => {
    try {
        const requestData = req.body.data;
        for (let obj of requestData) {

            const { title, description, start_date, when_details, end_date, venue_name, image_url, genre, minimum_age } = obj;
            const isLiveEventPresent = (await postgreClient.query(`select count(*) from LiveEvents where title=$1`, [title])).rows[0].count;
            if (isLiveEventPresent > 0) {
                console.log(`Event "${title}" is already present. Skipping insertion.`);
                continue;
            }
            const venue_id = (await postgreClient.query(`select venue_id from Venues where name=$1`, [venue_name])).rows[0].venue_id;
            const event_id = (await postgreClient.query(`select event_id from liveevents order by event_id desc limit 1`)).rows[0].event_id + 1;
            const sqlQuery = `INSERT INTO LiveEvents(event_id,title, description,start_date,when_details,end_date,venue_id,image_url,genre,minimum_age) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
            await postgreClient.query(sqlQuery, [event_id, title, description, start_date, when_details, end_date, venue_id, image_url, genre, minimum_age]);
        }
        await postgreClient.query("COMMIT;");
        res.json({ 'status': 'ok' });
    } catch (error) {
        console.error("Error inserting cities:", error);
        await postgreClient.query("ROLLBACK;")
        return res.status(500).json({ message: error.message });
    }
}

export const insertVenueDetails = async (req, res) => {
    try {
        const requestData = req.body.data;
        for (let obj of requestData) {
            const { name, address_line, google_map_link, city, state } = obj;
            const isVenuePresent = (await postgreClient.query(`select count(*) from Venues where name=$1`, [name])).rows[0].count;
            if (isVenuePresent > 0) {
                console.log(`Venue "${name}" is already present. Skipping insertion.`);
                continue;
            }
            const venue_id = (await postgreClient.query(`select venue_id from Venues  order by venue_id desc limit 1`)).rows[0].venue_id + 1;
            const sqlQuery = `INSERT INTO Venues(venue_id,name,address_line,google_map_link,city,state) VALUES($1,$2,$3,$4,$5,$6)`;
            await postgreClient.query(sqlQuery, [venue_id, name, address_line, google_map_link, city, state]);
        }
        await postgreClient.query("COMMIT;");
        res.json({ 'status': 'ok' });
    } catch (error) {
        console.error("Error inserting cities:", error);
        await postgreClient.query("ROLLBACK;")
        return res.status(500).json({ message: error.message });
    }
}

export const insertTicketDetails = async (req, res) => {
    try {
        const requestData = req.body.data;
        for (let obj of requestData) {

            const { ticketsource, event_name, ticketlink } = obj;
            const isTicketPresent = (await postgreClient.query(`select count(*) from tickets where ticketSource=$1`, [ticketsource])).rows[0].count;
            if (isTicketPresent > 0) {
                console.log(`Ticket "${ticketsource}" is already present. Skipping insertion.`);
                continue;
            }
            const event_id = (await postgreClient.query(`select event_id from LiveEvents where title=$1`, [event_name])).rows[0].event_id;
            const ticket_id = (await postgreClient.query(`select ticket_id from tickets order by ticket_id desc limit 1`)).rows[0].ticket_id + 1;
            const sqlQuery = `INSERT INTO tickets(ticket_id,event_id,ticketSource, ticketlink) VALUES($1,$2,$3,$4)`;
            await postgreClient.query(sqlQuery, [ticket_id, event_id, ticketsource, ticketlink]);
        }
        await postgreClient.query("COMMIT;");
        res.json({ 'status': 'ok' });
    } catch (error) {
        console.error("Error inserting cities:", error);
        await postgreClient.query("ROLLBACK;")
        return res.status(500).json({ message: error.message });
    }
}

export const getBasicLiveEventsByLocation = async (req, res) => {
    try {
        const { city } = req.body;
        const result = (await postgreClient.query(`select * from liveEventBasicDetails where lower(city) = lower($1)`, [city])).rows;
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getLiveEventsByEventCode = async (req, res) => {
    try {
        const { event_code } = req.body;
        const result = (await postgreClient.query(`select * from liveEventVenueDetails where event_code = ($1)`, [event_code])).rows[0];
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const generateJSONData = async (req, res) => {
    try {
        const authToken = req.headers.authorization;
        const jsonArr = req.body;

        const venueArr = [];
        const eventArr = [];
        const ticketArr = [];

        const parseAddress = (address) => {
            const venueAddress = address.join(",");
            const city = address[1].split(", ")[0];
            const state = address[1].split(", ")[1];
            return { venueAddress, city, state };
        };

        const parseDates = (startDate, whenDetails) => {
            const year = new Date().getFullYear();
            const parsedStartDate = parseDate(new Date(startDate + " " + year));
            let endDate = whenDetails.split(" – ")[1];
            if (!endDate) {
                endDate = parsedStartDate;
            } else {
                const [day, rest] = endDate.split(", ");
                endDate = parseDate(new Date(`${day} ${rest} ${parsedStartDate.slice(6)}`));
            }
            return { startDate: parsedStartDate, endDate };
        };

        for (let obj of jsonArr) {
            const { venueAddress, city, state } = parseAddress(obj.address);
            const { startDate, endDate } = parseDates(obj.date.start_date, obj.date.when_details);

            venueArr.push({
                name: obj.venue.name,
                address_line: venueAddress,
                google_map_link: obj.event_location_map.link,
                city,
                state
            });

            eventArr.push({
                title: obj.title,
                venue_name: obj.venue.name,
                description: obj.description,
                start_date: startDate,
                when_details: obj.date.when_details,
                end_date: endDate,
                image_url: obj.image,
                genre: "English | Music",
                minimum_age: "18"
            });

            for (let ticket of obj.ticket_info) {
                ticketArr.push({
                    event_name: obj.title,
                    ticketsource: ticket.source,
                    ticketlink: ticket.link
                });
            }
        }

        // Parallel API calls for better performance
        const venueRes = await axios.post('http://localhost:3000/api/liveEvents/insertVenueDetails', { data: venueArr }, { headers: { Authorization: authToken } });
        const eventRes = await axios.post('http://localhost:3000/api/liveEvents/insertLiveEventsDetails', { data: eventArr }, { headers: { Authorization: authToken } });
        const ticketRes = await axios.post('http://localhost:3000/api/liveEvents/insertTicketDetails', { data: ticketArr }, { headers: { Authorization: authToken } });

        res.json({ status: "ok", message: "Data inserted successfully" });

    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ message: error.message });
    }
};

const parseDate = (date) => {
    return date.toLocaleDateString().split('/').join('-')
}