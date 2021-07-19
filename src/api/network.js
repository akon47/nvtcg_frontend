import { network } from './index';

function setNetworkConfig(config) {
    return network.put('/', config);
}

export { setNetworkConfig };