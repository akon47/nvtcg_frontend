import { onvif } from './index';

function getDevices() {
    return onvif.get('/devices');
}

function setTarget(hostname, port, username, password) {
    return onvif.put('/target', { hostname, username, password, port });
}

function getTarget() {
    return onvif.get('/target');
}

export { getDevices, setTarget, getTarget };