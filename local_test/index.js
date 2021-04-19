const TronWeb = require('../dist/TronWeb.node.js');

const fullNode = 'https://api.shasta.trongrid.io';
const solidityNode = 'https://api.shasta.trongrid.io';
const eventServer = 'https://api.shasta.trongrid.io/';
//const fullNode = 'http://127.0.0.1:9090';
//const solidityNode = 'http://127.0.0.1:9090';
//const eventServer = 'httP://127.0.0.0.1:9090';
//const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';
const privateKey = '0326eb8655bd8f49cb807c66a282c30d6aa5fe0fb5d86b824cff17700ddc2c74';
//const privateKey = '00b382f903f7470c3fc029e9edb8d4fcbca751daaa3a3f0d66cfa102153481a8';

const app = async () => {
    const tronWeb = new TronWeb(
        fullNode,
        solidityNode,
        eventServer,
        privateKey
    );

    tronWeb.setDefaultBlock('latest');

    const nodes = await tronWeb.isConnected();
    const connected = !Object.entries(nodes).map(([name, connected]) => {
        if (!connected)
            console.error(`Error: ${name} is not connected`);

        return connected;
    }).includes(false);

    if (!connected)
        return;


    tronWeb.trx.getBalance('TNr5EPTZQDdWdW24mkx6rtWYFd3trLSAU2').then(balance => {
        console.group('Account balance');
        console.log('- Address: TNr5EPTZQDdWdW24mkx6rtWYFd3trLSAU2');
        console.log('- Balance:', balance, '\n');
        console.groupEnd();
    }).catch(err => console.error(err));


};

app();
