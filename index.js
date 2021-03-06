const express = require('express');
const redis = require('redis');

const app = express();

const redisConfig = {
    host: 'redis-server',
    port: 6379
};

const client = redis.createClient(redisConfig);
client.set('visits', 0);

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Number of visits is ' + visits);
        client.set('visits', (parseInt(visits) + 1))
    })
});

app.listen(8080, () => {
    console.log('listening on port 8080')
})