import { loadUser, saveUser } from '../../lib/user/userUtil.js';
import ShipDictionary from '../../assets/Ship-Dictionary.json';

export async function vehicleControlFlow(line) {
  try {
    let userData = await loadUser();
    const geid = userData.geid;
    if (line.includes('[' + geid + '] requesting control token for')) {
      const vehicleClass = line.match(/(?<=requesting control token for ').*(?=_\d+')/);
      const vehicle = ShipDictionary.dictionary[vehicleClass];
      if (vehicle) {
        userData.currentShip = vehicle.name;
        await saveUser(userData);
      }
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
}
