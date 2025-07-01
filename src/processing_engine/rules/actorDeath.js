import { loadUser } from '../../lib/user/userUtil.js';
import { submitNPCtoDictionary } from '../../lib/pve/submitNPCtoDictionary.js';
import { loadPVE, savePVE, addPVELogEntry } from '../../lib/pve/pveUtil.js';
import { loadPVP, savePVP, addPVPLogEntry } from '../../lib/pvp/pvpUtil.js';
import { reportPVEKill, reportPVPKill, reportPVPDeath, reportSuicide } from '../../lib/discord/discordUtil.js';
import NPCDictionary from '../../assets/NPC-Dictionary.json';
import shipDictionary from '../../assets/Ship-Dictionary.json';

export async function actorDeath(line) {
  const pveData = await loadPVE();
  const pvpData = await loadPVP();
  try {
    let userData = await loadUser();
    const userName = userData.userName;
    const currentShipClass = userData.currentShipClass;

    // Check for suicide first - if it's a suicide, handle it and return early
    if (line.includes("'" + userName + "' [Class Player] with damage type 'Suicide'")) {
      console.log('you committed suicide');
      addPVELogEntry('suicide', 'loss');
      const updatedPVE = { ...pveData };
      updatedPVE.deaths = pveData.deaths + 1;
      updatedPVE.currentMonth.deaths = pveData.currentMonth.deaths + 1;
      await savePVE(updatedPVE);

      // Send Discord notification for suicide
      await reportSuicide();
      return; // Exit early to prevent PVP kill processing
    }

    //Register a kill by player
    if (line.includes("killed by '" + userName + "'") && !line.includes("<Actor Death> CActor::Kill: '" + userName + "'")) {
      //Match the NPC class ONLY
      const npcClass = line.match(/(?<=CActor::Kill:\s').*?(?=_[0-9]{11,13}'\s\[[0-9]+\]\sin\szone)/);

      //If the NPC class is found
      if (npcClass && npcClass[0]) {
        //Get the NPC class key
        const npcClassKey = npcClass[0];

        //If the NPC class is found in the dictionary, log the kill
        if (NPCDictionary.dictionary[npcClassKey]) {
          const npc = NPCDictionary.dictionary[npcClassKey].name;
          console.log('you killed a ' + npc);
        } else {
          //If the NPC class is not found in the dictionary, submit it to the dictionary
          submitNPCtoDictionary(npcClassKey);
        }
        //Log the kill to the PVE log
        addPVELogEntry(npcClassKey, 'win');

        //Update PVE data directly
        const updatedPVE = { ...pveData };
        updatedPVE.kills = pveData.kills + 1;
        updatedPVE.currentMonth.kills = pveData.currentMonth.kills + 1;
        await savePVE(updatedPVE);

        // Send Discord notification for PVE kill (after data is updated)
        await reportPVEKill(npcClassKey, null, currentShipClass);
      } else {
        const playerKill = line.match(/(?<=CActor::Kill:\s').*?(?='\s\[\d{9,12})/);
        const shipClass = line.match(/(?<=\]\sin\szone\s').*(?=_[0-9]{9,14}'\skilled\sby)/);
        if (playerKill && playerKill[0]) {
          const playerKillName = playerKill[0];
          console.log('you killed the player ' + playerKillName);
          const updatedPVP = { ...pvpData };
          updatedPVP.kills = pvpData.kills + 1;
          updatedPVP.currentMonth.kills = pvpData.currentMonth.kills + 1;
          let shipClassKey = null;
          if (shipClass && shipClass[0]) {
            const extractedShipClass = shipClass[0];
            if (shipDictionary.dictionary[extractedShipClass]) {
              const ship = shipDictionary.dictionary[extractedShipClass].name;
              console.log('you killed the ship ' + ship);
              shipClassKey = extractedShipClass;
            }
          }
          let usingShipClassKey = null;
          if (currentShipClass) {
            usingShipClassKey = currentShipClass;
          }
          addPVPLogEntry(playerKillName, 'win', shipClassKey, usingShipClassKey);

          await savePVP(updatedPVP);

          // Send Discord notification for PVP kill (after data is updated)
          await reportPVPKill(playerKillName, shipClassKey, currentShipClass);
        }
      }
    }
    // Taking out killed by NPC, in 1 year of log data it happened once, most are suicides
    // if (line.includes("CActor::Kill: '" + userName + "'")) {
    //   const npcClass = line.match(/(?<=killed\sby\s').*?(?=_\d{10,13}'\s\[)/);
    //   if (npcClass && npcClass[0]) {
    //     const npcClassKey = npcClass[0];
    //     if (NPCDictionary.dictionary[npcClassKey]) {
    //       const npc = NPCDictionary.dictionary[npcClassKey].name;
    //       console.log('you were killed by a ' + npc);
    //     } else {
    //       submitNPCtoDictionary(npcClassKey);
    //     }
    //     addPVELogEntry(npcClassKey, 'loss');

    //     //Update PVE data directly
    //     const updatedPVE = { ...pveData };
    //     updatedPVE.deaths = pveData.deaths + 1;
    //     updatedPVE.currentMonth.deaths = pveData.currentMonth.deaths + 1;
    //     await savePVE(updatedPVE);
    //   }
    // }
    if (line.includes("CActor::Kill: '" + userName + "'") && !line.includes("with damage type 'Suicide'") && !line.includes("killed by '" + userName + "'")) {
      const killByNPCCheck = line.match(/(?<=killed\sby\s').*?(?=_\d{9,13}'\s\[\d{9,13}\]\susing)/);
      if (!killByNPCCheck) {
        const enemyPlayer = line.match(/(?<=killed\sby\s').*?(?='\s\[\d{9,13}\]\susing)/);
        if (enemyPlayer && enemyPlayer[0]) {
          const enemyPlayerName = enemyPlayer[0];
          console.log('you were killed by player ' + enemyPlayerName);
          const updatedPVP = { ...pvpData };
          updatedPVP.deaths = pvpData.deaths + 1;
          updatedPVP.currentMonth.deaths = pvpData.currentMonth.deaths + 1;
          let shipClassKey = null;
          const shipClass = line.match(/(?<=\]\sin\szone\s').*?(?=_[0-9]{9,14}')/);
          if (shipClass && shipClass[0]) {
            const extractedShipClass = shipClass[0];
            if (shipDictionary.dictionary[extractedShipClass]) {
              const ship = shipDictionary.dictionary[extractedShipClass].name;
              console.log('you were killed while driving a ' + ship);
              shipClassKey = extractedShipClass;
            }
          }
          addPVPLogEntry(enemyPlayerName, 'loss', shipClassKey);

          await savePVP(updatedPVP);

          // Send Discord notification for PVP death (after data is updated)
          await reportPVPDeath(enemyPlayerName, shipClassKey, currentShipClass);
        }
      }
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
}
