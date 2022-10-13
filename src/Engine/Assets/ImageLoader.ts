import CanvasSprite from '../Canvas/CanvasSprite';
import Vector from '../Math/Vector';

export default class ImageLoader {

    static readonly instance = new ImageLoader();

    private images: Map<string, HTMLImageElement> = new Map();

    private constructor() {
        // noop
    }

    static async loadImages(images: string[]): Promise<void> {
        return new Promise(resolve => {
            let loaded = 0;
            for (const image of images) {
                ImageLoader.instance.images.set(image, new Image());
                import('../../assets/images/' + image)
                    .then(img => {
                        ImageLoader.instance.images.get(image).src = img.default;
                        ImageLoader.instance.images.get(image).onload = () => {
                            loaded++;
                            if (loaded === images.length) {
                                resolve();
                            }
                        }
                    });
            }
        });
    }

    fromName(image: string, offset: Vector, size: Vector, position: Vector): CanvasSprite {
        return new CanvasSprite(ImageLoader.instance.getImage(image), offset, size, position);
    }

    getImage(image: string): HTMLImageElement {
        if (!this.images.has(image)) {
            throw new Error(`Could not find image with name "${image}".`);
        }

        return this.images.get(image);
    }
}
