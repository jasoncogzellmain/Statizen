import { loadUser } from '../../lib/user/userUtil.js';
import { submitNPCtoDictionary } from '../../lib/pve/submitNPCtoDictionary.js';
import { loadPVE, savePVE, addPVELogEntry } from '../../lib/pve/pveUtil.js';
import NPCDictionary from '../../assets/NPC-Dictionary.json';

export async function actorDeath(line) {
  const pveData = await loadPVE();

  console.log('actordeath called');
  try {
    console.log('loading user data');
    let userData = await loadUser();
    console.log('userData: ' + userData);
    const userName = userData.userName;
    console.log('username: ' + userName);
    if (line.includes("killed by '" + userName + "'")) {
      console.log('line includes userName');
      const npcClass = line.match(/(?<=CActor::Kill:\s').*?(?=_[0-9]{11,13}'\s\[[0-9]+\]\sin\szone)/);

      if (npcClass && npcClass[0]) {
        const npcClassKey = npcClass[0];
        console.log(`Processing NPC: ${npcClassKey}`);

        if (NPCDictionary.dictionary[npcClassKey]) {
          const npc = NPCDictionary.dictionary[npcClassKey].name;
          console.log(`NPC found in dictionary: ${npcClassKey} -> ${npc}`);
        } else {
          console.log(`NPC not found in dictionary: ${npcClassKey}`);
          submitNPCtoDictionary(npcClassKey);
        }
        addPVELogEntry(npcClassKey, 'win');

        //Update PVE data directly
        const updatedPVE = { ...pveData };
        updatedPVE.kills = pveData.kills + 1;
        updatedPVE.currentMonth.kills = pveData.currentMonth.kills + 1;
        await savePVE(updatedPVE);
      }
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
}
