import { vehicleControlFlow } from './rules/vehicleControlFlow.js';

export function engineRunner(_line, type) {
  switch (type) {
    case 'actorDeath': {
      console.log('actorDeath');
      break;
    }
    case 'spawnFlow': {
      console.log('spawnFlow');
      break;
    }
    case 'stallFlow': {
      console.log('stallFlow');
      break;
    }
    case 'requestLocationInventory': {
      console.log('requestLocationInventory');
      break;
    }
    case 'vehicleControlFlow': {
      vehicleControlFlow(_line);
      break;
    }
    case 'corpse': {
      console.log('corpse');
      break;
    }
    case 'endMission': {
      console.log('endMission');
      break;
    }
    default: {
      console.log('unknown event type');
      break;
    }
  }
}
