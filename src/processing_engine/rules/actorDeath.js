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

    // === Suicide Handler ===
    if (line.includes("'" + userName + "' [Class Player] with damage type 'Suicide'")) {
      console.log('you committed suicide');
      addPVELogEntry('suicide', 'loss');
      const updatedPVE = { ...pveData };
      updatedPVE.deaths += 1;
      updatedPVE.currentMonth.deaths += 1;
      await savePVE(updatedPVE);
      await reportSuicide();
      return;
    }

    // === PVE KILL HANDLER ===
    if (line.includes("killed by '" + userName + "'") && !line.includes("<Actor Death> CActor::Kill: '" + userName + "'")) {
      const npcClass = line.match(/(?<=CActor::Kill:\s').*?(?=_[0-9]{11,13}'\s\[[0-9]+\]\sin\szone)/);
      if (npcClass && npcClass[0]) {
        const npcClassKey = npcClass[0];

        if (NPCDictionary.dictionary[npcClassKey]) {
          console.log('you killed a ' + NPCDictionary.dictionary[npcClassKey].name);
        } else {
          submitNPCtoDictionary(npcClassKey);
        }

        addPVELogEntry(npcClassKey, 'win');

        const updatedPVE = { ...pveData };
        updatedPVE.kills += 1;
        updatedPVE.currentMonth.kills += 1;
        updatedPVE.xp = (updatedPVE.xp || 0) + 10; // 🎯 XP GAIN
        console.log('PVE XP Update:', { oldXP: pveData.xp || 0, newXP: updatedPVE.xp, npcClass: npcClassKey });
        await savePVE(updatedPVE);

        await reportPVEKill(npcClassKey, null, currentShipClass);
      } else {
        // === PVP KILL HANDLER ===
        const playerKill = line.match(/(?<=CActor::Kill:\s').*?(?='\s\[\d{9,12})/);
        const shipClass = line.match(/(?<=\]\sin\szone\s').*(?=_[0-9]{9,14}'\skilled\sby)/);
        if (playerKill && playerKill[0]) {
          const playerKillName = playerKill[0];
          console.log('you killed the player ' + playerKillName);

          const updatedPVP = { ...pvpData };
          updatedPVP.kills += 1;
          updatedPVP.currentMonth.kills += 1;
          updatedPVP.xp = (updatedPVP.xp || 0) + 20; // 🎯 XP GAIN
          console.log('PVP XP Update:', { oldXP: pvpData.xp || 0, newXP: updatedPVP.xp, playerKill: playerKillName });

          let shipClassKey = null;
          if (shipClass && shipClass[0]) {
            const extractedShipClass = shipClass[0];
            if (shipDictionary.dictionary[extractedShipClass]) {
              console.log('you killed the ship ' + shipDictionary.dictionary[extractedShipClass].name);
              shipClassKey = extractedShipClass;
            }
          }

          let usingShipClassKey = currentShipClass || null;
          addPVPLogEntry(playerKillName, 'win', shipClassKey, usingShipClassKey);
          await savePVP(updatedPVP);

          await reportPVPKill(playerKillName, shipClassKey, currentShipClass);
        }
      }
    }

    // === PVP DEATH HANDLER ===
    if (line.includes("CActor::Kill: '" + userName + "'") && !line.includes("with damage type 'Suicide'") && !line.includes("killed by '" + userName + "'")) {
      const killByNPCCheck = line.match(/(?<=killed\sby\s').*?(?=_\d{9,13}'\s\[\d{9,13}\]\susing)/);
      if (!killByNPCCheck) {
        const enemyPlayer = line.match(/(?<=killed\sby\s').*?(?='\s\[\d{9,13}\]\susing)/);
        if (enemyPlayer && enemyPlayer[0]) {
          const enemyPlayerName = enemyPlayer[0];
          console.log('you were killed by player ' + enemyPlayerName);

          const updatedPVP = { ...pvpData };
          updatedPVP.deaths += 1;
          updatedPVP.currentMonth.deaths += 1;

          let shipClassKey = null;
          const shipClass = line.match(/(?<=\]\sin\szone\s').*?(?=_[0-9]{9,14}')/);
          if (shipClass && shipClass[0]) {
            const extractedShipClass = shipClass[0];
            if (shipDictionary.dictionary[extractedShipClass]) {
              console.log('you were killed while driving a ' + shipDictionary.dictionary[extractedShipClass].name);
              shipClassKey = extractedShipClass;
            }
          }

          addPVPLogEntry(enemyPlayerName, 'loss', shipClassKey);
          await savePVP(updatedPVP);

          await reportPVPDeath(enemyPlayerName, shipClassKey, currentShipClass);
        }
      }
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
}
