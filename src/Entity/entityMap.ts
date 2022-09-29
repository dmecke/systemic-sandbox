import camera from '../assets/entities/camera.json';
import player from '../assets/entities/player.json';

const entityMap = new Map<string, { name: string }[]>();
entityMap.set('camera', camera);
entityMap.set('player', player);

export default entityMap;
