import { loadSettings } from '@/lib/settings/settingsUtil';
import { loadUser } from '@/lib/user/userUtil';
import { loadPVE } from '@/lib/pve/pveUtil';
import { loadPVP } from '@/lib/pvp/pvpUtil';
import NPCDictionary from '@/assets/NPC-Dictionary.json';
import ShipDictionary from '@/assets/Ship-Dictionary.json';

const getNPCName = (npcClass) => npcClass ? NPCDictionary.dictionary[npcClass]?.name || npcClass : npcClass;
const getShipName = (shipClass) => shipClass ? ShipDictionary.dictionary[shipClass]?.name || shipClass : shipClass;
const calculateKDRatio = (kills, deaths) => deaths === 0 ? kills : (kills / deaths).toFixed(2);
const getPlayerUrl = (name) => `https://robertsspaceindustries.com/en/citizens/${encodeURIComponent(name)}`;

const getOutlawRankTitle = (level) => {
  const ranks = ['Drifter', 'Rogue', 'Gunner', 'Marauder', 'Ravager', 'Skullbrand', 'Void Reaper', 'Ash Warden', 'Hellbringer', 'Death Harbinger'];
  return ranks[Math.min(level, ranks.length - 1)];
};

const getOutlawPrestigeTitle = (prestige) => {
  const titles = ['Scavver', 'Red Flag', 'Blackwake', 'Warrant Ghost', 'Hullsplitter', 'Star Scourge', 'Quantum Raider', 'Ashborne', 'Fleetbreaker', 'Versebane'];
  return titles[Math.min(prestige, titles.length - 1)];
};

const getPeacekeeperRankTitle = (level) => {
  const ranks = ['Recruit', 'Sentinel', 'Marksman', 'Enforcer', 'Vanguard', 'Ironbrand', 'Void Warden', 'Starseeker', 'Lightbringer', 'Peacebringer'];
  return ranks[Math.min(level, ranks.length - 1)];
};

const getPeacekeeperPrestigeTitle = (prestige) => {
  const titles = ['Spacer', 'White Flag', 'Starwake', 'Warrant Seeker', 'Hullguard', 'Starward Shield', 'Quantum Sentinel', 'Solarborn', 'Fleetwarden', 'Versekeeper'];
  return titles[Math.min(prestige, titles.length - 1)];
};

const getRankTitle = (level, isOutlaw) => isOutlaw ? getOutlawRankTitle(level) : getPeacekeeperRankTitle(level);
const getPrestigeTitle = (prestige, isOutlaw) => isOutlaw ? getOutlawPrestigeTitle(prestige) : getPeacekeeperPrestigeTitle(prestige);
const getLevelFromXP = (xp) => Math.floor(0.1 * Math.sqrt(xp));
const getXPForLevel = (level) => Math.pow(level / 0.1, 2);

const getXPProgressBar = (xp) => {
  const level = getLevelFromXP(xp);
  const xpStart = getXPForLevel(level);
  const xpEnd = getXPForLevel(level + 1);
  const xpInLevel = xp - xpStart;
  const xpNeeded = xpEnd - xpStart;
  const percent = (xpInLevel / xpNeeded) * 100;
  const blocks = Math.floor(percent / 10);
  const bar = '█'.repeat(blocks) + '░'.repeat(10 - blocks);
  return { bar, percent: Math.round(percent), level, xpInLevel, xpNeeded };
};

const sendDiscordWebhook = async (webhookUrl, embed) => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    });
    return response.ok;
  } catch (error) {
    console.error('Error sending Discord webhook:', error);
    return false;
  }
};

export const reportPVPKill = async (victimName, victimShipClass, currentShipClass) => {
  const settings = await loadSettings();
  if (!settings.discordEnabled || !settings.discordWebhookUrl || !settings.eventTypes?.pvpKills) return false;

  const user = await loadUser();
  const pvp = await loadPVP();
  const pve = await loadPVE();
  const name = user?.userName || 'Unknown';
  // Combine PVE and PVP XP for total progression
  const pveXP = pve?.xp || 0;
  const pvpXP = pvp?.xp || 0;
  const xp = pveXP + pvpXP;
  const isOutlaw = settings.faction === 'outlaw';
  const { bar, percent, level, xpInLevel, xpNeeded } = getXPProgressBar(xp);
  // Calculate prestige from level: every 100 levels = 1 prestige
  const prestige = Math.floor(level / 100);
  const rankTitle = getRankTitle(level, isOutlaw);
  const prestigeTitle = getPrestigeTitle(prestige, isOutlaw);

  // Debug logging for Discord webhook
  console.log('Discord PVP Kill Webhook Debug:', {
    xp,
    level,
    rankTitle,
    prestige,
    prestigeTitle,
    fullPVPData: pvp
  });

  const embed = {
    title: '💀 Player Eliminated (PVP)',
    color: 0xffcc00,
    fields: [
      { name: 'Pilot', value: `[${name}](${getPlayerUrl(name)})`, inline: true },
      { name: 'Target', value: `[${victimName}](${getPlayerUrl(victimName)})`, inline: true },
      { name: 'Ship Used', value: getShipName(currentShipClass) || 'Unknown', inline: true },
      { name: 'Victim Ship', value: getShipName(victimShipClass) || 'Unknown', inline: true },
      { name: 'K/D Ratio', value: calculateKDRatio(pvp.kills || 0, pvp.deaths || 0) }
    ]
  };

  // Add RPG fields if level data is enabled
  if (settings.discordLevelData) {
    embed.fields.splice(2, 0,
      { name: 'Rank', value: `${rankTitle} (${level})`, inline: true },
      { name: 'Prestige', value: `${prestigeTitle} (${prestige})`, inline: true },
      { name: 'Progress to Next Level', value: `${bar} ${percent}%\nXP this level: ${Math.floor(xpInLevel)} / ${Math.floor(xpNeeded)}` }
    );
  }

  return sendDiscordWebhook(settings.discordWebhookUrl, embed);
};

export const reportPVEKill = async (npcClass, npcShipClass, currentShipClass) => {
  const settings = await loadSettings();
  if (!settings.discordEnabled || !settings.discordWebhookUrl || !settings.eventTypes?.pveKills) return false;

  const user = await loadUser();
  const pve = await loadPVE();
  const pvp = await loadPVP();
  const name = user?.userName || 'Unknown';
  // Combine PVE and PVP XP for total progression
  const pveXP = pve?.xp || 0;
  const pvpXP = pvp?.xp || 0;
  const xp = pveXP + pvpXP;
  const isOutlaw = settings.faction === 'outlaw';
  const { bar, percent, level, xpInLevel, xpNeeded } = getXPProgressBar(xp);
  // Calculate prestige from level: every 100 levels = 1 prestige
  const prestige = Math.floor(level / 100);
  const rankTitle = getRankTitle(level, isOutlaw);
  const prestigeTitle = getPrestigeTitle(prestige, isOutlaw);

  // Debug logging for Discord webhook
  console.log('Discord PVE Webhook Debug:', {
    xp,
    level,
    rankTitle,
    prestige,
    prestigeTitle,
    fullPVEData: pve
  });

  // Determine if this is a ground kill (no ship involved)
  const isGroundKill = !currentShipClass || currentShipClass === 'Unknown' || currentShipClass === '';

  const embed = {
    title: '🧨 Enemy Neutralized (PVE)',
    color: 0x00ccff,
    fields: [
      { name: 'Pilot', value: `[${name}](${getPlayerUrl(name)})`, inline: false },
      { name: 'Target Destroyed', value: getNPCName(npcClass), inline: false }
    ]
  };

  // Only add ship information if it's not a ground kill
  if (!isGroundKill) {
    embed.fields.push(
      { name: 'Ship Used', value: getShipName(currentShipClass) || 'Unknown', inline: true }
    );

    // Only add NPC ship if we have valid ship data
    if (npcShipClass && npcShipClass !== 'Unknown') {
      embed.fields.push(
        { name: 'NPC Ship', value: getShipName(npcShipClass) || 'Unknown', inline: true }
      );
    }
  }

  embed.fields.push(
    { name: 'K/D Ratio', value: calculateKDRatio(pve.kills || 0, pve.deaths || 0) }
  );

  // Add RPG fields if level data is enabled
  if (settings.discordLevelData) {
    const rpgFields = [
      { name: 'Rank', value: `${rankTitle} (${level})`, inline: true },
      { name: 'Prestige', value: `${prestigeTitle} (${prestige})`, inline: true },
      { name: 'Progress to Next Level', value: `${bar} ${percent}%\nXP this level: ${Math.floor(xpInLevel)} / ${Math.floor(xpNeeded)}` }
    ];

    // Insert RPG fields after the basic info but before K/D ratio
    embed.fields.splice(2, 0, ...rpgFields);
  }

  return sendDiscordWebhook(settings.discordWebhookUrl, embed);
};

export const reportPVPDeath = async (killerName, killerShipClass, currentShipClass) => {
  const settings = await loadSettings();
  if (!settings.discordEnabled || !settings.discordWebhookUrl || !settings.eventTypes?.pvpDeaths) return false;

  const user = await loadUser();
  const pvp = await loadPVP();
  const pve = await loadPVE();
  const name = user?.userName || 'Unknown';
  // Combine PVE and PVP XP for total progression
  const pveXP = pve?.xp || 0;
  const pvpXP = pvp?.xp || 0;
  const xp = pveXP + pvpXP;
  const isOutlaw = settings.faction === 'outlaw';
  const { bar, percent, level, xpInLevel, xpNeeded } = getXPProgressBar(xp);
  // Calculate prestige from level: every 100 levels = 1 prestige
  const prestige = Math.floor(level / 100);
  const rankTitle = getRankTitle(level, isOutlaw);
  const prestigeTitle = getPrestigeTitle(prestige, isOutlaw);

  const embed = {
    title: '☠️ You Were Eliminated (PVP)',
    color: 0xff4444,
    fields: [
      { name: 'Victim', value: `[${name}](${getPlayerUrl(name)})`, inline: true },
      { name: 'Killer', value: `[${killerName}](${getPlayerUrl(killerName)})`, inline: true },
      { name: 'Your Ship', value: getShipName(currentShipClass) || 'Unknown', inline: true },
      { name: 'Killer Ship', value: getShipName(killerShipClass) || 'Unknown', inline: true },
      { name: 'K/D Ratio', value: calculateKDRatio(pvp.kills || 0, pvp.deaths || 0) }
    ]
  };

  // Add RPG fields if level data is enabled
  if (settings.discordLevelData) {
    embed.fields.splice(2, 0,
      { name: 'Rank', value: `${rankTitle} (${level})`, inline: true },
      { name: 'Prestige', value: `${prestigeTitle} (${prestige})`, inline: true },
      { name: 'Progress to Next Level', value: `${bar} ${percent}%\nXP this level: ${Math.floor(xpInLevel)} / ${Math.floor(xpNeeded)}` }
    );
  }

  return sendDiscordWebhook(settings.discordWebhookUrl, embed);
};

export const reportSuicide = async () => {
  const settings = await loadSettings();
  if (!settings.discordEnabled || !settings.discordWebhookUrl || !settings.eventTypes?.suicides) return false;

  const user = await loadUser();
  const pve = await loadPVE();
  const pvp = await loadPVP();
  const name = user?.userName || 'Unknown';
  // Combine PVE and PVP XP for total progression
  const pveXP = pve?.xp || 0;
  const pvpXP = pvp?.xp || 0;
  const xp = pveXP + pvpXP;
  const isOutlaw = settings.faction === 'outlaw';
  const { bar, percent, level, xpInLevel, xpNeeded } = getXPProgressBar(xp);
  // Calculate prestige from level: every 100 levels = 1 prestige
  const prestige = Math.floor(level / 100);
  const rankTitle = getRankTitle(level, isOutlaw);
  const prestigeTitle = getPrestigeTitle(prestige, isOutlaw);

  // Debug logging for suicide webhook
  console.log('Discord Suicide Webhook Debug:', {
    pveXP,
    pvpXP,
    totalXP: xp,
    level,
    rankTitle,
    prestige,
    prestigeTitle,
    fullPVEData: pve,
    fullPVPData: pvp
  });

  const embed = {
    title: '🪦 Suicide Recorded',
    color: 0x23272a,
    fields: [
      { name: 'Pilot', value: `[${name}](${getPlayerUrl(name)})`, inline: false },
      { name: 'Status', value: 'Self-terminated during operation.', inline: false },
      { name: 'K/D Ratio', value: calculateKDRatio(pvp.kills || 0, pvp.deaths || 0) }
    ]
  };

  // Add RPG fields if level data is enabled
  if (settings.discordLevelData) {
    embed.fields.splice(2, 0,
      { name: 'Rank', value: `${rankTitle} (${level})`, inline: true },
      { name: 'Prestige', value: `${prestigeTitle} (${prestige})`, inline: true },
      { name: 'Progress to Next Level', value: `${bar} ${percent}%\nXP this level: ${Math.floor(xpInLevel)} / ${Math.floor(xpNeeded)}` }
    );
  }

  return sendDiscordWebhook(settings.discordWebhookUrl, embed);
};


