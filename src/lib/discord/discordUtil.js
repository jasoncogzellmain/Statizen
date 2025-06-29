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

// Helper to build player profile URL
const getPlayerUrl = (name) => `https://robertsspaceindustries.com/en/citizens/${encodeURIComponent(name)}`;

// Send Discord webhook with embed
const sendDiscordWebhook = async (webhookUrl, embed) => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
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
export const reportPVPKill = async (victimName, victimShipClass, currentShipClass) => {
  try {
    const settings = await loadSettings();
    if (!settings.eventTypes?.pvpKills) {
      return false;
    }
    const userData = await loadUser();
    const pvpData = await loadPVP();

    if (!settings.discordEnabled || !settings.discordWebhookUrl) {
      return false;
    }

    const killerName = userData?.userName || 'Unknown';
    const victimShipName = getShipName(victimShipClass);
    const currentShipName = getShipName(currentShipClass);
    const pvpKDRatio = calculateKDRatio(pvpData?.kills || 0, pvpData?.deaths || 0);

    const embed = {
      title: '🎯 Kill Alert!',
      color: 0xffffff, // White
      fields: [
        {
          name: 'Killer',
          value: `[${killerName}](${getPlayerUrl(killerName)})`,
          inline: true,
        },
        {
          name: 'Victim',
          value: `[${victimName}](${getPlayerUrl(victimName)})`,
          inline: true,
        },
      ],
    };
    if (victimShipClass) {
      embed.fields.push({
        name: 'Victim Ship',
        value: victimShipName,
        inline: false,
      });
      // Only show current ship when there's a victim ship
      if (currentShipClass) {
        embed.fields.push({
          name: 'Using Ship',
          value: currentShipName,
          inline: false,
        });
      }
    }
    if (pvpKDRatio !== undefined) {
      embed.fields.push({
        name: 'PVP K/D',
        value: String(pvpKDRatio),
        inline: false,
      });
    }

    return await sendDiscordWebhook(settings.discordWebhookUrl, embed);
  } catch (error) {
    console.error('Error reporting PVP kill:', error);
    return false;
  }
};

// Report PVE Kill
export const reportPVEKill = async (npcClass, npcShipClass, currentShipClass) => {
  try {
    const settings = await loadSettings();
    if (!settings.eventTypes?.pveKills) {
      return false;
    }
    const userData = await loadUser();
    const pveData = await loadPVE();

    if (!settings.discordEnabled || !settings.discordWebhookUrl) {
      return false;
    }

    const killerName = userData?.userName || 'Unknown';
    const npcName = getNPCName(npcClass);
    const npcShipName = getShipName(npcShipClass);
    const currentShipName = getShipName(currentShipClass);
    const pveKDRatio = calculateKDRatio(pveData?.kills || 0, pveData?.deaths || 0);

    const embed = {
      title: '🎯 PVE Kill Alert!',
      color: 0xffffff, // White
      fields: [
        {
          name: 'Killer',
          value: `[${killerName}](https://robertsspaceindustries.com/en/citizens/${encodeURIComponent(killerName)})`,
          inline: false,
        },
        {
          name: 'Victim',
          value: npcName,
          inline: false,
        },
      ],
    };
    if (npcShipClass) {
      embed.fields.push({
        name: 'Victim Ship',
        value: npcShipName,
        inline: false,
      });
      // Only show current ship when there's a victim ship
      if (currentShipClass) {
        embed.fields.push({
          name: 'Using Ship',
          value: currentShipName,
          inline: false,
        });
      }
    }
    if (pveKDRatio !== undefined) {
      embed.fields.push({
        name: 'PVE K/D',
        value: String(pveKDRatio),
        inline: false,
      });
    }

    return await sendDiscordWebhook(settings.discordWebhookUrl, embed);
  } catch (error) {
    console.error('Error reporting PVE kill:', error);
    return false;
  }
};

// Report PVP Death
export const reportPVPDeath = async (killerName, killerShipClass, currentShipClass) => {
  try {
    const settings = await loadSettings();
    if (!settings.eventTypes?.pvpDeaths) {
      return false;
    }
    const userData = await loadUser();
    const pvpData = await loadPVP();

    if (!settings.discordEnabled || !settings.discordWebhookUrl) {
      return false;
    }

    const victimName = userData?.userName || 'Unknown';
    const killerShipName = getShipName(killerShipClass);
    const currentShipName = getShipName(currentShipClass);
    const pvpKDRatio = calculateKDRatio(pvpData?.kills || 0, pvpData?.deaths || 0);

    const embed = {
      title: '💀 Death Alert!',
      color: 0xed4245, // Red
      fields: [
        {
          name: 'Killer',
          value: `[${killerName}](${getPlayerUrl(killerName)})`,
          inline: true,
        },
        {
          name: 'Victim',
          value: `[${victimName}](${getPlayerUrl(victimName)})`,
          inline: true,
        },
      ],
    };
    if (killerShipClass) {
      embed.fields.push({
        name: 'Killer Ship',
        value: killerShipName,
        inline: false,
      });
      // Only show current ship when there's a killer ship
      if (currentShipClass) {
        embed.fields.push({
          name: 'Using Ship',
          value: currentShipName,
          inline: false,
        });
      }
    }
    if (pvpKDRatio !== undefined) {
      embed.fields.push({
        name: 'PVP K/D',
        value: String(pvpKDRatio),
        inline: false,
      });
    }

    return await sendDiscordWebhook(settings.discordWebhookUrl, embed);
  } catch (error) {
    console.error('Error reporting PVP death:', error);
    return false;
  }
};

// Report Suicide
export const reportSuicide = async () => {
  try {
    const settings = await loadSettings();
    const userData = await loadUser();

    if (!settings.discordEnabled || !settings.discordWebhookUrl || !settings.eventTypes?.suicides) {
      return false;
    }

    const userName = userData?.userName || 'Unknown';
    const embed = {
      color: 0x23272a, // Black
      fields: [
        {
          name: '\u200B',
          value: `[${userName}](${getPlayerUrl(userName)}) committed suicide`,
          inline: true,
        },
      ],
    };

    return await sendDiscordWebhook(settings.discordWebhookUrl, embed);
  } catch (error) {
    console.error('Error reporting suicide:', error);
    return false;
  }
};
