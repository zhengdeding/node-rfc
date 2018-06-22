'use strict';

//const rfcClient = require('node-rfc').Client;
const Pool = require('../../lib').Pool;

const abapSystem = require('./abapSystem');

const pool = new Pool(abapSystem);

pool.acquire()
    .then(client => {
        client
            .call('STFC_CONNECTION', { REQUTEXT: 'H€llö SAP!' })
            .then(res => {
                console.log('STFC_CONNECTION call result:', res.ECHOTEXT);
                console.log(pool.status);
                pool.release(client);
                console.log(pool.status);
            })
            .catch(err => {
                console.error('Error invoking STFC_CONNECTION:', err);
            });
    })
    .catch(err => {
        console.error('could not acquire connection', err);
    });
