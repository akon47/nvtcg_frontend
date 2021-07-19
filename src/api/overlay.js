import { overlay } from './index';

function uploadOverlayImage(file) {
    let form = new FormData();
    form.append("attachment", file);
    return overlay.post('/images', form);
}

function getOverlayImages() {
    return overlay.get('/images');
}

function setOverlayImage(id) {
    return overlay.put('/', { id });
}

function deleteOverlayImage(id) {
    return overlay.delete(`/images/${id}`);
}

function updateOverlayImage(id, data) {
    return overlay.put(`/images/${id}`, data);
}

export { uploadOverlayImage, getOverlayImages, setOverlayImage, deleteOverlayImage, updateOverlayImage };