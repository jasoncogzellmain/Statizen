import { loadUser } from '../../lib/user/userUtil.js';
import { addNearbyPlayer } from '../../lib/nearby/nearbyUtil.js';

export async function spawnFlow(line) {
  const userData = await loadUser();
  const username = userData.userName;
  const playerName = line.match(/(?<=Player\s').*?(?='\s\[[0-9]{9,13}]\slost\sreservation)/);
  if (!line.includes(username) && line.includes('<Spawn Flow>'))
    if (playerName && playerName[0]) {
      await addNearbyPlayer(playerName[0], 'spawn');
    }
}
