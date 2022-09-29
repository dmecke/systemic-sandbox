import ImageLoader from '../Engine/Assets/ImageLoader';
import Player from '../Component/Player';
import Position from '../Component/Position';
import Query from '../Engine/ECS/Query';
import Renderable from '../Component/Renderable';
import Sprite from '../Component/Sprite';
import System from '../Engine/ECS/System';
import Vector from '../Engine/Math/Vector';
import config from '../assets/config.json';

export default class SpriteRenderer extends System {

    // eslint-disable-next-line @typescript-eslint/ban-types
    componentsRequired = new Set<Function>([Player, Position, Renderable, Sprite]);

    update(query: Query): void {
        const components = query.one();

        const position = components.get(Position).position;
        const renderable = components.get(Renderable);
        const cameraPosition = this.ecs.getComponents(renderable.camera).get(Position).position;
        const sprite = components.get(Sprite);

        const buffer = new Vector(2, 2).multiply(config.tileSize);
        const cameraTopLeft = cameraPosition.subtract(buffer);
        const cameraBottomRight = cameraTopLeft.add(this.cameraSize).add(buffer.multiply(2));

        if (position.x < cameraTopLeft.x) {
            return;
        }

        if (position.x > cameraBottomRight.x) {
            return;
        }

        if (position.y < cameraTopLeft.y) {
            return;
        }

        if (position.y > cameraBottomRight.y) {
            return;
        }

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
    }

    private get cameraSize(): Vector {
        return new Vector(window.ctx.canvas.width, window.ctx.canvas.height);
    }
}
