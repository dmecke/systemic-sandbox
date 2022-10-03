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
        const components = query.allComponents(Sprite, Position, IsInViewport);
        components.sort(([spriteComponentA], [spriteComponentB]) => spriteComponentB.zIndex - spriteComponentA.zIndex);
        for (const [sprite, positionComponent] of components) {
            try {
                ImageLoader.instance.fromName(
                    sprite.image,
                    sprite.offset,
                    sprite.size,
                    positionComponent.position.subtract(sprite.anchor),
                ).draw();
            } catch (e) {
                throw new Error(`Could not render tile "${(sprite.image)}" at ${positionComponent.position.x}|${positionComponent.position.y}.\n\n${e}`);
            }
        }
    }
}
