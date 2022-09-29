import CameraComponent from '../Component/CameraComponent';
import CameraTarget from '../Component/CameraTarget';
import Focus from '../Component/Focus';
import InputComponent from '../Component/InputComponent';
import Player from '../Component/Player';
import Position from '../Component/Position';
import Renderable from '../Component/Renderable';
import Sprite from '../Component/Sprite';

const factories = new Map();
factories.set('CameraComponent', CameraComponent);
factories.set('CameraTarget', CameraTarget);
factories.set('Focus', Focus);
factories.set('InputComponent', InputComponent);
factories.set('Player', Player);
factories.set('Position', Position);
factories.set('Renderable', Renderable);
factories.set('Sprite', Sprite);

export default factories;
