import FontFace from './FontFace';
import Glyph from './Glyph';
import ImageLoader from '@dmecke/game-engine/lib/AssetLoader/ImageLoader';
import TextAlign from './TextAlign';
import Vector from '@dmecke/game-engine/lib/Math/Vector';

export default class Font {

    private position = Vector.null();
    private align = TextAlign.left;
    private _width = new Map<string, number>();

    constructor(
        private readonly fontFace: FontFace,
    ) {
    }

    at(position: Vector): Font {
        this.position = position;

        return this;
    }

    alignLeft(): Font {
        this.align = TextAlign.left;

        return this;
    }

    alignRight(): Font {
        this.align = TextAlign.right;

        return this;
    }

    alignCenter(): Font {
        this.align = TextAlign.center;

        return this;
    }

    draw(text: string): void {
        let position = this.position;
        if (this.align === TextAlign.right) {
            position = position.subtractX(this.getWidth(text));
        }

        if (this.align === TextAlign.center) {
            position = position.subtractX(Math.floor(this.getWidth(text) / 2));
        }

        for (let i = 0; i < text.length; i++) {
            const glyph = this.getGlyph(text[i]);
            ImageLoader.instance.fromName(
                this.fontFace.image,
                glyph.position,
                glyph.size,
                position,
            ).draw(window.ctx);
            position = position.addX(glyph.size.x + 1);
        }
    }

    private getGlyph(char: string): Glyph {
        if (char.length !== 1) {
            throw new Error('Can only get a glyph for a single char.');
        }

        return this.fontFace.glyphs.get(char);
    }

    private getWidth(text: string): number {
        if (!this._width.has(text)) {
            let width = 0;
            for (let i = 0; i < text.length; i++) {
                width += this.getGlyph(text[i]).size.x;
                if (i < text.length - 1) {
                    width++;
                }
            }
            this._width.set(text, width);
        }

        return this._width.get(text);
    }
}
