import ImageLoader from '../Engine/Assets/ImageLoader';
import IsInViewport from '../Component/IsInViewport';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import Renderable from '../Component/Renderable';
import Sprite from '../Component/Sprite';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';

export default class SpriteRenderer extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Position, Renderable, Sprite, IsInViewport]);

    update(query: Query): void {
        query.all().forEach(components => {
            const position = components.get(Position).position;
            const sprite = components.get(Sprite);

            try {
                const image = ImageLoader.instance.getImage(sprite.image);
                ImageLoader.instance.fromName(
                    sprite.image,
                    new Vector(0, 0),
                    new Vector(image.width, image.height),
                    position.subtract(sprite.anchor),
                ).draw(window.ctx);
            } catch (e) {
                throw new Error(`Could not render tile "${(sprite.image)}" at ${position.x}|${position.y}.\n\n${e}`);
            }
        });
    }
}
