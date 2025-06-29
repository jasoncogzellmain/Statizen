import { loadUser } from '../../lib/user/userUtil.js';
import { addNearbyPlayer } from '../../lib/nearby/nearbyUtil.js';

export async function stallFlow(line) {
  const userData = await loadUser();
  const username = userData.userName;
  const playerName = line.match(/(?<=Player:\s).*?(?=,\sType:\s)/);
  if (!line.includes(username) && line.includes('<Actor Stall>'))
    if (playerName && playerName[0]) {
      await addNearbyPlayer(playerName[0], 'stall');
    }
}
