import { vehicleControlFlow } from './rules/vehicleControlFlow.js';
import { actorDeath } from './rules/actorDeath.js';
import { initializeLog } from './rules/initalizeLog.js';
import { loadSettings } from '../lib/settings/settingsUtil.js';

export function engineRunner(_line, type) {
  const settings = loadSettings();

  console.log('engineRunner called');

  switch (type) {
    case 'actorDeath': {
      console.log('actorDeath');
      actorDeath(_line);
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
      console.log('vehicleControlFlow');
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
    case 'initializeLog': {
      console.log('initializeLog');
      initializeLog(settings);
      break;
    }
    default: {
      console.log('unknown event type');
      break;
    }
  }
}
