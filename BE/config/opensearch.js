import pkg from '@opensearch-project/opensearch';
import { configDotenv } from 'dotenv';

const { Client } = pkg;
configDotenv();

const username = process.env.OPEN_SEARCH_USER;
const password = process.env.OPEN_SEARCH_PASS;

const client = new Client({
    node: 'https://localhost:9200', // Cluster endpoint
    auth: {
        username: username,
        password: password,
    },
    ssl: {
        rejectUnauthorized: false, 
    },
})

const checkClusterHealth = async () => {
    try {
        const health = await client.cluster.health();
        console.log('Cluster Health:', health.body);
    } catch (error) {
        console.error('Error checking cluster health:', error);
    }
};

export {client,checkClusterHealth};