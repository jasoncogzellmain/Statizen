import { vehicleControlFlow } from './rules/vehicleControlFlow.js';
import { actorDeath } from './rules/actorDeath.js';
import { initializeLog } from './rules/initalizeLog.js';
import { loadSettings } from '../lib/settings/settingsUtil.js';

export function engineRunner(_line, type) {
  const settings = loadSettings();

  console.log('engineRunner called');

  switch (type) {
    case 'actorDeath': {
      actorDeath(_line);
      break;
    }
    case 'spawnFlow': {
      break;
    }
    case 'stallFlow': {
      break;
    }
    case 'requestLocationInventory': {
      break;
    }
    case 'vehicleControlFlow': {
      vehicleControlFlow(_line);
      break;
    }
    case 'corpse': {
      break;
    }
    case 'endMission': {
      break;
    }
    case 'initializeLog': {
      initializeLog(settings);
      break;
    }
    default: {
      break;
    }
  }
}
