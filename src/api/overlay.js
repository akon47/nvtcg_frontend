import { overlay } from './index';

function uploadOverlayImage(file) {
    let form = new FormData();
    form.append("attachment", file);
    return overlay.post('/', form);
}
export { uploadOverlayImage };