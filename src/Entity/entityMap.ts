import camera from '../assets/entities/camera.json';
import ground from '../assets/entities/ground.json';
import player from '../assets/entities/player.json';
import sheep from '../assets/entities/sheep.json';
import tree from '../assets/entities/tree.json';
import wolf from '../assets/entities/wolf.json';

const entityMap = new Map<string, Record<string, unknown>>();
entityMap.set('camera', camera);
entityMap.set('ground', ground);
entityMap.set('player', player);
entityMap.set('sheep', sheep);
entityMap.set('tree', tree);
entityMap.set('wolf', wolf);

export default entityMap;
