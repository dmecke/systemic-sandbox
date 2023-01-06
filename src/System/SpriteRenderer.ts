import Animation from '../Component/Animation';
import DirectionComponent from '../Component/DirectionComponent';
import Entity from '../Engine/ECS/Entity';
import ImageLoader from '../Engine/Assets/ImageLoader';
import InViewport from '../Component/InViewport';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import Sprite from '../Component/Sprite';
import System from '../Engine/ECS/System';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class SpriteRenderer extends System {
    update(query: Query): void {
        const components = query.allEntities(Sprite, Position, InViewport);
        components.sort(([, spriteComponentA], [, spriteComponentB]) => spriteComponentB.zIndex - spriteComponentA.zIndex);
        for (const [entity, sprite, positionComponent] of components) {
            const position = positionComponent.position.subtract(sprite.anchor).floor();
            try {
                ImageLoader.instance.fromName(
                    sprite.image,
                    this.getOffset(entity, sprite),
                    sprite.size,
                    position,
                ).draw();
            } catch (e) {
                throw new Error(`Could not render tile "${(sprite.image)}" at ${position.x}|${position.y}.\n\n${e}`);
            }
        }
    }

    private getOffset(entity: Entity, sprite: Sprite): Vector {
        let offset = sprite.offset;

        if (this.ecs.query.hasComponent(entity, Animation)) {
            const animation = this.ecs.query.getComponent(entity, Animation);
            offset = new Vector(animation.index * sprite.size.x, animation.row * sprite.size.y);
        }

        if (this.ecs.query.hasComponent(entity, DirectionComponent)) {
            const directionComponent = this.ecs.query.getComponent(entity, DirectionComponent);
            offset = offset.addY(directionComponent.direction.spriteRow * sprite.size.y);
        }

        return offset;
    }
}
