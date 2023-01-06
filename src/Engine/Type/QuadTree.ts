import Area from '@dmecke/game-engine/lib/Math/Area';
import Circle from '@dmecke/game-engine/lib/Math/Circle';
import Position from '../../Component/Position';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class QuadTree<T> {
    private elements: (Position&Readonly<{ data: T }>)[] = [];
    private divided = false;
    private northWest: QuadTree<T>|null = null;
    private northEast: QuadTree<T>|null = null;
    private southEast: QuadTree<T>|null = null;
    private southWest: QuadTree<T>|null = null;

    constructor(
        private readonly area: Area,
        private readonly maxElements: number,
        private readonly depth = 1,
    ) {
    }

    insert(element: Position&Readonly<{ data: T }>): void {
        if (!(element.position instanceof Vector)) {
            throw new Error('Inserted element does not have a position.');
        }

        if (!this.area.contains(element.position)) {
            return;
        }

        if (!this.divided) {
            this.elements.push(element);
            if (this.elements.length > this.maxElements) {
                this.subdivide();
                this.northWest.insert(element);
                this.northEast.insert(element);
                this.southEast.insert(element);
                this.southWest.insert(element);
            }
        } else {
            this.northWest.insert(element);
            this.northEast.insert(element);
            this.southEast.insert(element);
            this.southWest.insert(element);
        }
    }

    queryArea(area: Area): (Position&Readonly<{ data: T }>)[] {
        if (!this.area.overlaps(area)) {
            return [];
        }

        let elements = [];
        this
            .elements
            .filter(element => area.contains(element.position))
            .forEach(element => elements.push(element))
        ;
        if (this.divided) {
            elements = elements.concat(this.northWest.queryArea(area));
            elements = elements.concat(this.northEast.queryArea(area));
            elements = elements.concat(this.southEast.queryArea(area));
            elements = elements.concat(this.southWest.queryArea(area));
        }

        return elements;
    }

    queryCircle(circle: Circle): (Position&Readonly<{ data: T }>)[] {
        return this.queryArea(new Area(circle.position.subtract(new Vector(circle.radius, circle.radius)), new Vector(circle.diameter, circle.diameter)));
    }

    clear(): void {
        this.elements = [];
        if (this.divided) {
            this.northWest.clear();
            this.northEast.clear();
            this.southEast.clear();
            this.southWest.clear();
            this.northWest = null;
            this.northEast = null;
            this.southEast = null;
            this.southWest = null;
        }
        this.divided = false;
    }

    get numberOfElements(): number {
        let elements = 0;
        elements += this.elements.length;
        if (this.divided) {
            elements += this.northWest.numberOfElements;
            elements += this.northEast.numberOfElements;
            elements += this.southEast.numberOfElements;
            elements += this.southWest.numberOfElements;
        }

        return elements;
    }

    private subdivide(): void {
        this.northWest = new QuadTree(new Area(new Vector(this.area.left, this.area.top), this.area.size.divide(2)), this.maxElements, this.depth + 1);
        this.northEast = new QuadTree(new Area(new Vector(this.area.center.x, this.area.top), this.area.size.divide(2)), this.maxElements, this.depth + 1);
        this.southEast = new QuadTree(new Area(this.area.center, this.area.size.divide(2)), this.maxElements, this.depth + 1);
        this.southWest = new QuadTree(new Area(new Vector(this.area.left, this.area.center.y), this.area.size.divide(2)), this.maxElements, this.depth + 1);
        this.elements.forEach(element => {
            this.northWest.insert(element);
            this.northEast.insert(element);
            this.southEast.insert(element);
            this.southWest.insert(element);
        });
        this.elements = [];
        this.divided = true;
    }
}
