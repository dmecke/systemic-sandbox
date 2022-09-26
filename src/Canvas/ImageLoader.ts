export default class ImageLoader {

    private images: Record<string, HTMLImageElement> = {};

    constructor() {
        const images = [
            'tiles/desert',
            'tiles/grassland',
            'tiles/jungle',
            'tiles/swamp',
            'tiles/water',
            'tiles/snow',
        ];
        for (let i = 0; i < images.length; i++) {
            this.images[images[i]] = new Image();
            import('../assets/images/' + images[i] + '.png').then(image => this.images[images[i]].src = image.default);
        }
    }

    getImage(image: string): HTMLImageElement {
        if (!this.images[image]) {
            throw new Error('Could not find image with name "' + image + '".');
        }
        return this.images[image];
    }
}
