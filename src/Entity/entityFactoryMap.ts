import CameraComponent from '../Component/CameraComponent';
import Position from '../Component/Position';

const factories = new Map();
factories.set('CameraComponent', CameraComponent);
factories.set('Position', Position);

export default factories;
