import { loadSettings } from '@/lib/settings/settingsUtil';
import { loadUser } from '@/lib/user/userUtil';
import { loadPVE } from '@/lib/pve/pveUtil';
import { loadPVP } from '@/lib/pvp/pvpUtil';
import NPCDictionary from '@/assets/NPC-Dictionary.json';
import ShipDictionary from '@/assets/Ship-Dictionary.json';

// Helper function to get NPC name from dictionary
const getNPCName = (npcClass) => {
  if (!npcClass) return npcClass;

  // Check if it's in the dictionary
  if (NPCDictionary.dictionary[npcClass]) {
    return NPCDictionary.dictionary[npcClass].name;
  }

  // If not found, return the original class name
  return npcClass;
};

// Helper function to get ship name from dictionary
const getShipName = (shipClass) => {
  if (!shipClass) return shipClass;

  // Check if it's in the dictionary
  if (ShipDictionary.dictionary[shipClass]) {
    return ShipDictionary.dictionary[shipClass].name;
  }

  // If not found, return the original class name
  return shipClass;
};

// Calculate K/D ratio
const calculateKDRatio = (kills, deaths) => {
  if (deaths === 0) return kills;
  return (kills / deaths).toFixed(2);
};

// Send Discord webhook
const sendDiscordWebhook = async (webhookUrl, message) => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send Discord webhook:', response.status, response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending Discord webhook:', error);
    return false;
  }
};

// Report PVP Kill
export const reportPVPKill = async (victimName, victimShipClass) => {
  try {
    const settings = await loadSettings();
    const userData = await loadUser();
    const pvpData = await loadPVP();

    // Check if Discord is enabled
    if (!settings.discordEnabled || !settings.discordWebhookUrl) {
      return false;
    }

    const killerName = userData?.userName || 'Unknown';
    const victimShipName = getShipName(victimShipClass);
    const pvpKDRatio = calculateKDRatio(pvpData?.kills || 0, pvpData?.deaths || 0);

    const message = `🎯 Kill Alert!
Killer
${killerName}

Victim
${victimName}

Victim Ship
${victimShipName}

PVP K/D
${pvpKDRatio}`;

    return await sendDiscordWebhook(settings.discordWebhookUrl, message);
  } catch (error) {
    console.error('Error reporting PVP kill:', error);
    return false;
  }
};

// Report PVE Kill
export const reportPVEKill = async (npcClass, npcShipClass) => {
  try {
    const settings = await loadSettings();
    const userData = await loadUser();
    const pveData = await loadPVE();

    // Check if Discord is enabled
    if (!settings.discordEnabled || !settings.discordWebhookUrl) {
      return false;
    }

    const killerName = userData?.userName || 'Unknown';
    const npcName = getNPCName(npcClass);
    const pveKDRatio = calculateKDRatio(pveData?.kills || 0, pveData?.deaths || 0);

    let message = `🎯 PVE Kill Alert!
Killer
${killerName}

Victim
${npcName}`;

    // Only include Victim Ship section if it's a ship
    if (npcShipClass) {
      const shipName = getShipName(npcShipClass);
      message += `

Victim Ship
${shipName}`;
    }

    message += `

PVE K/D
${pveKDRatio}`;

    return await sendDiscordWebhook(settings.discordWebhookUrl, message);
  } catch (error) {
    console.error('Error reporting PVE kill:', error);
    return false;
  }
};

// Report PVP Death
export const reportPVPDeath = async (killerName, killerShipClass) => {
  try {
    const settings = await loadSettings();
    const userData = await loadUser();
    const pvpData = await loadPVP();

    // Check if Discord is enabled
    if (!settings.discordEnabled || !settings.discordWebhookUrl) {
      return false;
    }

    const victimName = userData?.userName || 'Unknown';
    const killerShipName = getShipName(killerShipClass);
    const pvpKDRatio = calculateKDRatio(pvpData?.kills || 0, pvpData?.deaths || 0);

    const message = `💀 Death Alert!
Killer
${killerName}

Victim
${victimName}

Killer Ship
${killerShipName}

PVP K/D
${pvpKDRatio}`;

    return await sendDiscordWebhook(settings.discordWebhookUrl, message);
  } catch (error) {
    console.error('Error reporting PVP death:', error);
    return false;
  }
};
