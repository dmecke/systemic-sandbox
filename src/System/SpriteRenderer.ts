import ImageLoader from '../Engine/Assets/ImageLoader';
import IsInViewport from '../Component/IsInViewport';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import Sprite from '../Component/Sprite';
import System from '../Engine/ECS/System';

export default class SpriteRenderer extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Position, Sprite, IsInViewport]);

    update(query: Query): void {
        query
            .entities()
            .sort((a, b) => this.ecs.getComponents(b).get(Sprite).zIndex - this.ecs.getComponents(a).get(Sprite).zIndex)
            .forEach(entity => {
                const components = this.ecs.getComponents(entity);
                const position = components.get(Position).position;
                const sprite = components.get(Sprite);

                try {
                    ImageLoader.instance.fromName(
                        sprite.image,
                        sprite.offset,
                        sprite.size,
                        position.subtract(sprite.anchor),
                    ).draw(window.ctx);
                } catch (e) {
                    throw new Error(`Could not render tile "${(sprite.image)}" at ${position.x}|${position.y}.\n\n${e}`);
                }
            })
        ;
    }
}
