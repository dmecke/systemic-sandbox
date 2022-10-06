import Animal from '../Component/Animal';
import Animation from '../Component/Animation';
import CameraComponent from '../Component/CameraComponent';
import CameraTarget from '../Component/CameraTarget';
import CanMove from '../Component/CanMove';
import DirectionComponent from '../Component/DirectionComponent';
import EatsMeat from '../Component/EatsMeat';
import EatsPlants from '../Component/EatsPlants';
import Flammable from '../Component/Flammable';
import Focus from '../Component/Focus';
import Food from '../Component/Food';
import Health from '../Component/Health';
import Hunger from '../Component/Hunger';
import InputComponent from '../Component/InputComponent';
import Interactable from '../Component/Interactable';
import Meat from '../Component/Meat';
import Plant from '../Component/Plant';
import Player from '../Component/Player';
import Position from '../Component/Position';
import RandomMovement from '../Component/RandomMovement';
import ReproductionUrge from '../Component/ReproductionUrge';
import Sprite from '../Component/Sprite';

const factories = new Map();
factories.set('Animal', Animal);
factories.set('Animation', Animation);
factories.set('CameraComponent', CameraComponent);
factories.set('CameraTarget', CameraTarget);
factories.set('CanMove', CanMove);
factories.set('DirectionComponent', DirectionComponent);
factories.set('EatsMeat', EatsMeat);
factories.set('EatsPlants', EatsPlants);
factories.set('Flammable', Flammable);
factories.set('Focus', Focus);
factories.set('Food', Food);
factories.set('Health', Health);
factories.set('Hunger', Hunger);
factories.set('InputComponent', InputComponent);
factories.set('Interactable', Interactable);
factories.set('Meat', Meat);
factories.set('Plant', Plant);
factories.set('Player', Player);
factories.set('Position', Position);
factories.set('RandomMovement', RandomMovement);
factories.set('ReproductionUrge', ReproductionUrge);
factories.set('Sprite', Sprite);

export default factories;
