import { loadUser, saveUser } from '../../lib/user/userUtil.js';
import ShipDictionary from '../../assets/Ship-Dictionary.json';

export async function vehicleControlFlow(line) {
  try {
    let userData = await loadUser();
    const geid = userData.geid;

    // Detect when entering a vehicle
    if (line.includes('[' + geid + '] requesting control token for')) {
      const vehicleClass = line.match(/(?<=requesting control token for ').*(?=_\d+')/);
      const vehicle = ShipDictionary.dictionary[vehicleClass];
      if (vehicle) {
        userData.currentShip = vehicle.name;
        userData.currentShipClass = vehicleClass;
        await saveUser(userData);
      }
    }

    // Detect when exiting a vehicle (releasing control token)
    if (line.includes('[' + geid + '] releasing control token for')) {
      userData.currentShip = '';
      userData.currentShipClass = '';
      await saveUser(userData);
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
}
