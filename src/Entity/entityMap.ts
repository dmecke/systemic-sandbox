import camera from '../assets/entities/camera.json';
import player from '../assets/entities/player.json';
import tree from '../assets/entities/tree.json';

const entityMap = new Map<string, { name: string }[]>();
entityMap.set('camera', camera);
entityMap.set('player', player);
entityMap.set('tree', tree);

export default entityMap;
