import ImageLoader from '@dmecke/game-engine/lib/AssetLoader/ImageLoader';
import InViewport from '../Component/InViewport';
import OnFire from '../Component/OnFire';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import Sprite from '../Component/Sprite';
import System from '../Engine/ECS/System';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class FireRenderer extends System {
    update(query: Query): void {
        for (const [positionComponent, sprite] of query.allComponents(Position, Sprite, OnFire, InViewport)) {
            const image = 'effects/fire.png';
            const size = new Vector(24, 24);
            try {
                ImageLoader.instance.fromName(
                    image,
                    new Vector(0, 0),
                    size,
                    positionComponent.position.subtract(sprite.anchor).add(sprite.size.subtract(size).divide(2)),
                ).draw(window.ctx);
            } catch (e) {
                throw new Error(`Could not render tile "${(image)}" at ${positionComponent.position.x}|${positionComponent.position.y}.\n\n${e}`);
            }
        }
    }
}
