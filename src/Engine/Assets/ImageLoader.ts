import CanvasSprite from '../Canvas/CanvasSprite';
import Vector from '../Math/Vector';

export default class ImageLoader {

    static readonly instance = new ImageLoader();

    private images: Record<string, HTMLImageElement> = {};

    private constructor() {
        // noop
    }

    static async loadImages(images: string[]): Promise<void> {
        return new Promise(resolve => {
            let loaded = 0;
            for (let i = 0; i < images.length; i++) {
                ImageLoader.instance.images[images[i]] = new Image();
                import('../../assets/images/' + images[i] + '.png')
                    .then(image => {
                        ImageLoader.instance.images[images[i]].src = image.default;
                        loaded++;
                        if (loaded === images.length) {
                            resolve();
                        }
                    });
            }
        });
    }

    fromName(image: string, offset: Vector, size: Vector, position: Vector): CanvasSprite {
        return new CanvasSprite(ImageLoader.instance.getImage(image), offset, size, position);
    }

    getImage(image: string): HTMLImageElement {
        if (!this.images[image]) {
            throw new Error('Could not find image with name "' + image + '".');
        }
        return this.images[image];
    }
}
