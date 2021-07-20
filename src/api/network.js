import { network } from './index';

function setNetworkConfig(config) {
    return network.put('/', config);
}

function getNetworkConfig() {
    return network.get('/');
}

export { setNetworkConfig, getNetworkConfig };