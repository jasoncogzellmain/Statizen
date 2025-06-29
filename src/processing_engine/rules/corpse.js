import { loadUser } from '../../lib/user/userUtil.js';
import { addNearbyPlayer } from '../../lib/nearby/nearbyUtil.js';

export async function corpse(line) {
  const userData = await loadUser();
  const username = userData.userName;
  const playerName = line.match(/(?<=Player\s').*(?='\s<remote client>)/);
  if (!line.includes(username) && line.includes('IsCorpseEnabled'))
    if (playerName && playerName[0]) {
      await addNearbyPlayer(playerName[0], 'corpse');
    }
}
