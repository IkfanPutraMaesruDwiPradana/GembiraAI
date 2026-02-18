
import pg from 'pg';

const passwordsToTry = [
    '',             // Empty
    'postgres',     // Default user name
    'admin',        // Common
    'root',         // Common
    'password',     // Common
    '123456'        // Common
];

async function testConnection() {
    console.log('Testing PostgreSQL connections...');

    for (const password of passwordsToTry) {
        console.log(`Trying password: "${password}" ...`);
        const client = new pg.Client({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres', // Connect to default DB first
            password: password,
            port: 5432,
        });

        try {
            await client.connect();
            console.log(`\n✅ SUCCESS! Connected with password: "${password}"`);
            console.log('Please update your .env file with this password.');
            await client.end();
            process.exit(0);
        } catch (err) {
            console.log(`❌ Failed: ${err.message}`);
        }
    }

    console.log('\n❌ All attempts failed. You may need to reset your postgres password.');
}

testConnection();
