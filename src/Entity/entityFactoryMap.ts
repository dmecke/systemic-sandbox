import CameraComponent from '../Component/CameraComponent';
import CameraTarget from '../Component/CameraTarget';
import Flammable from '../Component/Flammable';
import Focus from '../Component/Focus';
import Health from '../Component/Health';
import InputComponent from '../Component/InputComponent';
import Interactable from '../Component/Interactable';
import Plant from '../Component/Plant';
import Player from '../Component/Player';
import Position from '../Component/Position';
import RandomMovement from '../Component/RandomMovement';
import Sprite from '../Component/Sprite';

const factories = new Map();
factories.set('CameraComponent', CameraComponent);
factories.set('CameraTarget', CameraTarget);
factories.set('Flammable', Flammable);
factories.set('Focus', Focus);
factories.set('Health', Health);
factories.set('InputComponent', InputComponent);
factories.set('Interactable', Interactable);
factories.set('Plant', Plant);
factories.set('Player', Player);
factories.set('Position', Position);
factories.set('RandomMovement', RandomMovement);
factories.set('Sprite', Sprite);

export default factories;
