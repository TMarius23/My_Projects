const MAX_IMAGE_WIDTH = 1400;
const MAX_IMAGE_HEIGHT = 1000;
const JPEG_QUALITY = 0.82;

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

async function compressImage(file) {
    const source = await readFileAsDataUrl(file);
    const image = await loadImage(source);
    const scale = Math.min(1, MAX_IMAGE_WIDTH / image.width, MAX_IMAGE_HEIGHT / image.height);
    const canvas = document.createElement('canvas');

    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));

    const context = canvas.getContext('2d');
    if (!context) {
        return source;
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
}

export async function getPastedImageDataUrl(event) {
    const items = Array.from(event.clipboardData?.items ?? []);
    const imageItem = items.find((item) => item.type.startsWith('image/'));
    const file = imageItem?.getAsFile();

    if (!file) {
        return null;
    }

    event.preventDefault();
    return compressImage(file);
}
