import React, { useState, useMemo } from 'react';
import { Search, MapPin, Target, AlertCircle, Zap, Skull, Crown, Info } from 'lucide-react';

const NightReignPatternFinder = () => {
  const [selectedNightlord, setSelectedNightlord] = useState('');
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Traduções para português
  const translations = {
    // Bosses
    "Demi-Human Queen and Swordmaster": "Rainha Semi-Humana e Mestre da Espada",
    "Tree Sentinel and Royal Cavalrymen": "Sentinela da Árvore e Cavaleiros Reais",
    "Bell Bearing Hunter": "Caçador de Sinos",
    "Morgott": "Morgott",
    "Night's Cavalry Duo": "Duo de Cavalaria Noturna",
    "Ancient Dragon": "Dragão Ancião",
    "Gaping Dragon": "Dragão Abissal",
    "The Duke's Dear Freja": "A Querida Freja do Duque",
    "Crucible Knight and Golden Hippopotamus": "Cavaleiro Cruciforme e Hipopótamo Dourado",
    "Wormface": "Cara de Verme",
    "Outland Commander": "Comandante do Campo de Batalha",
    "Valiant Gargoyle": "Gárgula Valente",
    "Tibia Mariner": "Marinheiro Tíbia",
    "Great Wyrm": "Grande Wyrm",
    "Smelter Demon": "Demônio Fundidor",
    "Dragonkin Soldier": "Soldado Dracônico",
    "Godskin Duo": "Duo Godskin",
    "Nameless King": "Rei Sem Nome",
    "Ulcerated Tree Spirit": "Árvore Ulcerada",
    "Dancer of the Boreal Valley": "Dançarina do Vale Boreal",
    "Death Rite": "Rito da Morte",
    "Death Rite Bird": "Pássaro do Rito da Morte",
    
    // Eventos
    "Day 2 Night Horde": "Horda Noturna Dia 2",
    "Day 1 Night Horde": "Horda Noturna Dia 1",
    "Day 2 Meteor Strike": "Impacto de Meteoro Dia 2",
    "Day 1 Meteor Strike": "Impacto de Meteoro Dia 1",
    "Day 1 Morgott Invasion": "Invasão de Morgott Dia 1",
    "Day 2 Morgott Invasion": "Invasão de Morgott Dia 2",
    "Day 2 Extra Night Boss": "Boss Extra da Noite Dia 2",
    "Day 1 Extra Night Boss": "Boss Extra da Noite Dia 1",
    "Hard Madness Tower": "Torre da Loucura Difícil",
    "Day 1 Libra's Curse": "Maldição de Libra Dia 1",
    
    // Localizações - Spawn Points
    "East of Cavalry Bridge": "Leste da Ponte da Cavalaria",
    "Above Stormhill Tunnel Entrance": "Acima da Entrada do Túnel de Stormhill",
    "Stormhill South of Gate": "Sul do Portão de Stormhill",
    "Below Summonwater Hawk": "Abaixo do Falcão de Summonwater",
    "Southeast of Lake": "Sudeste do Lago",
    "Minor Erdtree": "Árvore Menor",
    "Far Southwest": "Extremo Sudoeste",
    "West of Warmaster's Shack": "Oeste do Abrigo do Mestre de Guerra",
    "Northeast of Saintsbridge": "Nordeste de Saintsbridge",
    
    // Localizações - Círculos
    "West Stormhill Graveyard": "Cemitério Oeste de Stormhill",
    "Northeast Corner": "Canto Nordeste",
    "Northwest Corner": "Canto Noroeste",
    "Southwest Corner": "Canto Sudoeste",
    "South Lake": "Lago Sul",
    "Northwest Mistwood Pond": "Lagoa Noroeste de Mistwood",
    "East of Saintsbridge": "Leste de Saintsbridge",
    "Northwest of Castle": "Noroeste do Castelo",
    "Northeast of Lake": "Nordeste do Lago",
    "Northwest Lake": "Lago Noroeste",
    "Southwest Mistwood": "Sudoeste de Mistwood",
    "South of Castle": "Sul do Castelo",
    "Southeast Mountaintop": "Sudeste do Topo da Montanha",
    "North of Crater": "Norte da Cratera",
    "Southeast Rotted Woods": "Sudeste da Floresta Podre",
    "Northwest Rotted Woods": "Noroeste da Floresta Podre",
    "Noklateo Entrance": "Entrada de Noklateo",
    
    // Shifting Earth
    "Default": "Padrão",
    "Mountaintop": "Topo da Montanha",
    "Crater": "Cratera",
    "Rotted Woods": "Floresta Podre",
    "Noklateo": "Noklateo",
  };

  // Função para traduzir textos
  const translate = (text) => {
    return translations[text] || text;
  };

  // Mapeamento completo baseado na planilha Google Sheets
  const allPatterns = {
    Gladius: [
      { id: 0, spawn: "East of Cavalry Bridge", shiftingEarth: "Default", event: "Day 2 Night Horde", n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "West Stormhill Graveyard", n2Circle: "Northeast Corner" },
      { id: 1, spawn: "Above Stormhill Tunnel Entrance", shiftingEarth: "Default", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "West Stormhill Graveyard", n2Circle: "Northeast Corner" },
      { id: 2, spawn: "Stormhill South of Gate", shiftingEarth: "Default", event: null, n1Boss: "Bell Bearing Hunter", n2Boss: "Morgott", n1Circle: "Northwest Corner", n2Circle: "South Lake" },
      { id: 3, spawn: "Below Summonwater Hawk", shiftingEarth: "Default", event: null, n1Boss: "Bell Bearing Hunter", n2Boss: "Morgott", n1Circle: "Southwest Corner", n2Circle: "Northwest Mistwood Pond" },
      { id: 4, spawn: "Southeast of Lake", shiftingEarth: "Default", event: "Day 2 Night Horde", n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "East of Saintsbridge", n2Circle: "South Lake" },
      { id: 5, spawn: "East of Cavalry Bridge", shiftingEarth: "Default", event: "Day 1 Night Horde", n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Morgott", n1Circle: "Northeast Corner", n2Circle: "Northwest of Castle" },
      { id: 6, spawn: "Above Stormhill Tunnel Entrance", shiftingEarth: "Default", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Morgott", n1Circle: "Northeast of Lake", n2Circle: "Northwest Corner" },
      { id: 7, spawn: "Minor Erdtree", shiftingEarth: "Default", event: null, n1Boss: "Bell Bearing Hunter", n2Boss: "Morgott", n1Circle: "Northwest Mistwood Pond", n2Circle: "Northwest Lake" },
      { id: 8, spawn: "Far Southwest", shiftingEarth: "Default", event: "Day 2 Night Horde", n1Boss: "Bell Bearing Hunter", n2Boss: "Morgott", n1Circle: "Southwest Mistwood", n2Circle: "Northwest of Castle" },
      { id: 9, spawn: "East of Cavalry Bridge", shiftingEarth: "Default", event: null, n1Boss: "Bell Bearing Hunter", n2Boss: "Morgott", n1Circle: "Northeast Corner", n2Circle: "West Stormhill Graveyard" },
      { id: 10, spawn: "Far Southwest", shiftingEarth: "Default", event: "Day 2 Night Horde", n1Boss: "Bell Bearing Hunter", n2Boss: "Morgott", n1Circle: "Northwest Corner", n2Circle: "Northeast of Lake" },
      { id: 11, spawn: "Minor Erdtree", shiftingEarth: "Default", event: "Day 2 Meteor Strike", n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "Northeast Corner", n2Circle: "West Stormhill Graveyard" },
      { id: 12, spawn: "Stormhill South of Gate", shiftingEarth: "Default", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "Northwest Lake", n2Circle: "Northwest Mistwood Pond" },
      { id: 13, spawn: "Far Southwest", shiftingEarth: "Default", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Morgott", n1Circle: "Northwest Corner", n2Circle: "South of Castle" },
      { id: 14, spawn: "Far Southwest", shiftingEarth: "Default", event: null, n1Boss: "Bell Bearing Hunter", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "East of Saintsbridge", n2Circle: "Southwest Corner" },
      { id: 15, spawn: "Northeast of Saintsbridge", shiftingEarth: "Default", event: null, n1Boss: "Bell Bearing Hunter", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "Northwest Mistwood Pond", n2Circle: "South Lake" },
      { id: 16, spawn: "Northeast of Saintsbridge", shiftingEarth: "Default", event: "Day 1 Meteor Strike", n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "Southwest Corner", n2Circle: "Southwest Mistwood" },
      { id: 17, spawn: "Below Summonwater Hawk", shiftingEarth: "Default", event: null, n1Boss: "Bell Bearing Hunter", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "West Stormhill Graveyard", n2Circle: "Southwest Corner" },
      { id: 18, spawn: "Above Stormhill Tunnel Entrance", shiftingEarth: "Default", event: "Day 1 Meteor Strike", n1Boss: "Bell Bearing Hunter", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "Northwest Mistwood Pond", n2Circle: "Northwest Lake" },
      { id: 19, spawn: "West of Warmaster's Shack", shiftingEarth: "Default", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Morgott", n1Circle: "South Lake", n2Circle: "East of Saintsbridge" },
      { id: 20, spawn: "Below Summonwater Hawk", shiftingEarth: "Mountaintop", event: "Day 2 Night Horde", n1Boss: "Bell Bearing Hunter", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "South Lake", n2Circle: "Southeast Mountaintop" },
      { id: 21, spawn: "Southeast of Lake", shiftingEarth: "Mountaintop", event: "Day 1 Meteor Strike", n1Boss: "Bell Bearing Hunter", n2Boss: "Morgott", n1Circle: "Northeast Corner", n2Circle: "Southeast Mountaintop" },
      { id: 22, spawn: "Stormhill South of Gate", shiftingEarth: "Mountaintop", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "Northeast Corner", n2Circle: "Southeast Mountaintop" },
      { id: 23, spawn: "Below Summonwater Hawk", shiftingEarth: "Mountaintop", event: null, n1Boss: "Bell Bearing Hunter", n2Boss: "Morgott", n1Circle: "Northeast Corner", n2Circle: "Southeast Mountaintop" },
      { id: 24, spawn: "Below Summonwater Hawk", shiftingEarth: "Mountaintop", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Morgott", n1Circle: "Southwest Mistwood", n2Circle: "Southeast Mountaintop" },
      { id: 25, spawn: "Southeast of Lake", shiftingEarth: "Crater", event: null, n1Boss: "Bell Bearing Hunter", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "West Stormhill Graveyard", n2Circle: "North of Crater" },
      { id: 26, spawn: "Far Southwest", shiftingEarth: "Crater", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "South of Castle", n2Circle: "North of Crater" },
      { id: 27, spawn: "East of Cavalry Bridge", shiftingEarth: "Crater", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Morgott", n1Circle: "Northeast Corner", n2Circle: "North of Crater" },
      { id: 28, spawn: "West of Warmaster's Shack", shiftingEarth: "Crater", event: "Day 2 Night Horde", n1Boss: "Bell Bearing Hunter", n2Boss: "Morgott", n1Circle: "Northwest Lake", n2Circle: "North of Crater" },
      { id: 29, spawn: "West of Warmaster's Shack", shiftingEarth: "Crater", event: "Day 1 Meteor Strike", n1Boss: "Bell Bearing Hunter", n2Boss: "Morgott", n1Circle: "Northwest Mistwood Pond", n2Circle: "North of Crater" },
      { id: 30, spawn: "Below Summonwater Hawk", shiftingEarth: "Rotted Woods", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Morgott", n1Circle: "Northeast Corner", n2Circle: "Southeast Rotted Woods" },
      { id: 31, spawn: "West of Warmaster's Shack", shiftingEarth: "Rotted Woods", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Morgott", n1Circle: "Northwest Corner", n2Circle: "Southeast Rotted Woods" },
      { id: 32, spawn: "Below Summonwater Hawk", shiftingEarth: "Rotted Woods", event: "Day 2 Meteor Strike", n1Boss: "Bell Bearing Hunter", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "Northwest Corner", n2Circle: "Southeast Rotted Woods" },
      { id: 33, spawn: "Below Summonwater Hawk", shiftingEarth: "Rotted Woods", event: "Day 2 Night Horde", n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Morgott", n1Circle: "Northeast Corner", n2Circle: "Southeast Rotted Woods" },
      { id: 34, spawn: "Stormhill South of Gate", shiftingEarth: "Rotted Woods", event: null, n1Boss: "Bell Bearing Hunter", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "West Stormhill Graveyard", n2Circle: "Southeast Rotted Woods" },
      { id: 35, spawn: "Above Stormhill Tunnel Entrance", shiftingEarth: "Noklateo", event: "Day 1 Night Horde", n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Morgott", n1Circle: "West Stormhill Graveyard", n2Circle: "Noklateo Entrance" },
      { id: 36, spawn: "Northeast of Saintsbridge", shiftingEarth: "Noklateo", event: null, n1Boss: "Bell Bearing Hunter", n2Boss: "Morgott", n1Circle: "Northeast Corner", n2Circle: "Noklateo Entrance" },
      { id: 37, spawn: "East of Cavalry Bridge", shiftingEarth: "Noklateo", event: "Day 2 Meteor Strike", n1Boss: "Bell Bearing Hunter", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "Northeast Corner", n2Circle: "Noklateo Entrance" },
      { id: 38, spawn: "Minor Erdtree", shiftingEarth: "Noklateo", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Tree Sentinel and Royal Cavalrymen", n1Circle: "Northeast Corner", n2Circle: "Noklateo Entrance" },
      { id: 39, spawn: "East of Cavalry Bridge", shiftingEarth: "Noklateo", event: null, n1Boss: "Demi-Human Queen and Swordmaster", n2Boss: "Morgott", n1Circle: "West Stormhill Graveyard", n2Circle: "Noklateo Entrance" },
    ],
    Adel: [
      { id: 40, spawn: "Southeast of Lake", shiftingEarth: "Default", event: null, n1Boss: "Night's Cavalry Duo", n2Boss: "Ancient Dragon", n1Circle: "West Stormhill Graveyard", n2Circle: "Southwest Mistwood" },
      { id: 41, spawn: "West of Warmaster's Shack", shiftingEarth: "Default", event: null, n1Boss: "Gaping Dragon", n2Boss: "Ancient Dragon", n1Circle: "Northwest Mistwood Pond", n2Circle: "Southwest Corner" },
      { id: 42, spawn: "Stormhill South of Gate", shiftingEarth: "Default", event: null, n1Boss: "The Duke's Dear Freja", n2Boss: "Crucible Knight and Golden Hippopotamus", n1Circle: "Northeast Corner", n2Circle: "Northwest Lake" },
      { id: 43, spawn: "Below Summonwater Hawk", shiftingEarth: "Default", event: "Day 1 Morgott Invasion", n1Boss: "Wormface", n2Boss: "Ancient Dragon", n1Circle: "Northwest Mistwood Pond", n2Circle: "West Stormhill Graveyard" },
      { id: 44, spawn: "Below Summonwater Hawk", shiftingEarth: "Default", event: null, n1Boss: "Gaping Dragon", n2Boss: "Ancient Dragon", n1Circle: "West Stormhill Graveyard", n2Circle: "Northwest Lake" },
      { id: 45, spawn: "Southeast of Lake", shiftingEarth: "Default", event: "Day 2 Morgott Invasion", n1Boss: "Night's Cavalry Duo", n2Boss: "Outland Commander", n1Circle: "South of Castle", n2Circle: "East of Saintsbridge" },
      { id: 46, spawn: "Southeast of Lake", shiftingEarth: "Default", event: "Day 2 Extra Night Boss", n1Boss: "The Duke's Dear Freja", n2Boss: "Ancient Dragon", extraBoss: "Dragonkin Soldier", n1Circle: "Northwest Mistwood Pond", n2Circle: "Northwest of Castle" },
      { id: 47, spawn: "West of Warmaster's Shack", shiftingEarth: "Default", event: "Day 2 Extra Night Boss", n1Boss: "Gaping Dragon", n2Boss: "Ancient Dragon", extraBoss: "Death Rite Bird", n1Circle: "Northwest Mistwood Pond", n2Circle: "Southwest Corner" },
      { id: 48, spawn: "Above Stormhill Tunnel Entrance", shiftingEarth: "Default", event: null, n1Boss: "Night's Cavalry Duo", n2Boss: "Outland Commander", n1Circle: "Northwest of Castle", n2Circle: "Northeast Corner" },
      { id: 49, spawn: "Far Southwest", shiftingEarth: "Default", event: null, n1Boss: "The Duke's Dear Freja", n2Boss: "Crucible Knight and Golden Hippopotamus", n1Circle: "South Lake", n2Circle: "West Stormhill Graveyard" },
      { id: 50, spawn: "Minor Erdtree", shiftingEarth: "Default", event: null, n1Boss: "Valiant Gargoyle", n2Boss: "Outland Commander", n1Circle: "Northwest Lake", n2Circle: "East of Saintsbridge" },
      { id: 51, spawn: "East of Cavalry Bridge", shiftingEarth: "Default", event: null, n1Boss: "The Duke's Dear Freja", n2Boss: "Ancient Dragon", n1Circle: "West Stormhill Graveyard", n2Circle: "Northwest Lake" },
      { id: 52, spawn: "Minor Erdtree", shiftingEarth: "Default", event: "Day 2 Meteor Strike", n1Boss: "Night's Cavalry Duo", n2Boss: "Crucible Knight and Golden Hippopotamus", n1Circle: "South Lake", n2Circle: "Northwest Corner" },
      { id: 53, spawn: "Stormhill South of Gate", shiftingEarth: "Default", event: "Day 1 Morgott Invasion", n1Boss: "Valiant Gargoyle", n2Boss: "Crucible Knight and Golden Hippopotamus", n1Circle: "Northwest Lake", n2Circle: "East of Saintsbridge" },
      { id: 54, spawn: "Northeast of Saintsbridge", shiftingEarth: "Default", event: null, n1Boss: "Valiant Gargoyle", n2Boss: "Ancient Dragon", n1Circle: "Southwest Corner", n2Circle: "Northwest Mistwood Pond" },
      { id: 55, spawn: "Northeast of Saintsbridge", shiftingEarth: "Default", event: null, n1Boss: "Wormface", n2Boss: "Outland Commander", n1Circle: "West Stormhill Graveyard", n2Circle: "South Lake" },
      { id: 56, spawn: "Minor Erdtree", shiftingEarth: "Default", event: null, n1Boss: "Wormface", n2Boss: "Ancient Dragon", n1Circle: "Northeast Corner", n2Circle: "South Lake" },
      { id: 57, spawn: "Above Stormhill Tunnel Entrance", shiftingEarth: "Default", event: "Day 2 Morgott Invasion", n1Boss: "Valiant Gargoyle", n2Boss: "Ancient Dragon", n1Circle: "Northwest of Castle", n2Circle: "South Lake" },
      { id: 58, spawn: "Far Southwest", shiftingEarth: "Default", event: "Day 1 Morgott Invasion", n1Boss: "Wormface", n2Boss: "Outland Commander", n1Circle: "Northwest Corner", n2Circle: "South of Castle" },
      { id: 59, spawn: "Below Summonwater Hawk", shiftingEarth: "Default", event: null, n1Boss: "Gaping Dragon", n2Boss: "Crucible Knight and Golden Hippopotamus", n1Circle: "Northwest Lake", n2Circle: "Northeast Corner" },
      { id: 60, spawn: "Below Summonwater Hawk", shiftingEarth: "Mountaintop", event: null, n1Boss: "The Duke's Dear Freja", n2Boss: "Ancient Dragon", n1Circle: "Southwest Mistwood", n2Circle: "Southeast Mountaintop" },
      { id: 61, spawn: "Far Southwest", shiftingEarth: "Mountaintop", event: "Day 1 Meteor Strike", n1Boss: "Gaping Dragon", n2Boss: "Crucible Knight and Golden Hippopotamus", n1Circle: "Northeast Corner", n2Circle: "Southeast Mountaintop" },
      { id: 62, spawn: "Below Summonwater Hawk", shiftingEarth: "Mountaintop", event: null, n1Boss: "Wormface", n2Boss: "Outland Commander", n1Circle: "Southwest Mistwood", n2Circle: "Southeast Mountaintop" },
      { id: 63, spawn: "East of Cavalry Bridge", shiftingEarth: "Mountaintop", event: "Day 1 Morgott Invasion", n1Boss: "Valiant Gargoyle", n2Boss: "Crucible Knight and Golden Hippopotamus", n1Circle: "Southwest Corner", n2Circle: "Southeast Mountaintop" },
      { id: 64, spawn: "Minor Erdtree", shiftingEarth: "Mountaintop", event: null, n1Boss: "Night's Cavalry Duo", n2Boss: "Ancient Dragon", n1Circle: "Northwest Mistwood Pond", n2Circle: "Southeast Mountaintop" },
      { id: 65, spawn: "East of Cavalry Bridge", shiftingEarth: "Crater", event: null, n1Boss: "Valiant Gargoyle", n2Boss: "Crucible Knight and Golden Hippopotamus", n1Circle: "South Lake", n2Circle: "North of Crater" },
      { id: 66, spawn: "Southeast of Lake", shiftingEarth: "Crater", event: null, n1Boss: "Gaping Dragon", n2Boss: "Outland Commander", n1Circle: "Northwest Lake", n2Circle: "North of Crater" },
      { id: 67, spawn: "East of Cavalry Bridge", shiftingEarth: "Crater", event: "Day 2 Morgott Invasion", n1Boss: "Night's Cavalry Duo", n2Boss: "Ancient Dragon", n1Circle: "Southwest Mistwood", n2Circle: "North of Crater" },
      { id: 68, spawn: "Below Summonwater Hawk", shiftingEarth: "Crater", event: "Day 2 Extra Night Boss", n1Boss: "The Duke's Dear Freja", n2Boss: "Ancient Dragon", extraBoss: "Crucible Knight and Golden Hippopotamus", n1Circle: "West Stormhill Graveyard", n2Circle: "North of Crater" },
      { id: 69, spawn: "Far Southwest", shiftingEarth: "Crater", event: null, n1Boss: "Wormface", n2Boss: "Crucible Knight and Golden Hippopotamus", n1Circle: "South of Castle", n2Circle: "North of Crater" },
      { id: 70, spawn: "Above Stormhill Tunnel Entrance", shiftingEarth: "Rotted Woods", event: "Day 1 Extra Night Boss", n1Boss: "Valiant Gargoyle", n2Boss: "Ancient Dragon", extraBoss: "Smelter Demon", n1Circle: "Northwest of Castle", n2Circle: "Southeast Rotted Woods" },
      { id: 71, spawn: "Below Summonwater Hawk", shiftingEarth: "Rotted Woods", event: "Day 1 Morgott Invasion", n1Boss: "The Duke's Dear Freja", n2Boss: "Outland Commander", n1Circle: "Northwest Lake", n2Circle: "Northwest Rotted Woods" },
      { id: 72, spawn: "Stormhill South of Gate", shiftingEarth: "Rotted Woods", event: "Day 2 Meteor Strike", n1Boss: "Wormface", n2Boss: "Outland Commander", n1Circle: "Southwest Corner", n2Circle: "Southeast Rotted Woods" },
      { id: 73, spawn: "Below Summonwater Hawk", shiftingEarth: "Rotted Woods", event: null, n1Boss: "Gaping Dragon", n2Boss: "Ancient Dragon", n1Circle: "West Stormhill Graveyard", n2Circle: "Northwest Rotted Woods" },
      { id: 74, spawn: "Stormhill South of Gate", shiftingEarth: "Rotted Woods", event: null, n1Boss: "Night's Cavalry Duo", n2Boss: "Crucible Knight and Golden Hippopotamus", n1Circle: "East of Saintsbridge", n2Circle: "Northwest Rotted Woods" },
      { id: 75, spawn: "Northeast of Saintsbridge", shiftingEarth: "Noklateo", event: null, n1Boss: "Valiant Gargoyle", n2Boss: "Outland Commander", n1Circle: "Northeast Corner", n2Circle: "Noklateo Entrance" },
      { id: 76, spawn: "Northeast of Saintsbridge", shiftingEarth: "Noklateo", event: null, n1Boss: "Night's Cavalry Duo", n2Boss: "Ancient Dragon", n1Circle: "Northwest Corner", n2Circle: "Noklateo Entrance" },
      { id: 77, spawn: "West of Warmaster's Shack", shiftingEarth: "Noklateo", event: null, n1Boss: "The Duke's Dear Freja", n2Boss: "Crucible Knight and Golden Hippopotamus", n1Circle: "Northeast Corner", n2Circle: "Noklateo Entrance" },
      { id: 78, spawn: "Minor Erdtree", shiftingEarth: "Noklateo", event: "Day 1 Morgott Invasion", n1Boss: "Wormface", n2Boss: "Outland Commander", n1Circle: "Northwest Corner", n2Circle: "Noklateo Entrance" },
      { id: 79, spawn: "Southeast of Lake", shiftingEarth: "Noklateo", event: null, n1Boss: "Gaping Dragon", n2Boss: "Ancient Dragon", n1Circle: "Northwest Corner", n2Circle: "Noklateo Entrance" },
    ],
    Gnoster: [
      { id: 80, spawn: "East of Cavalry Bridge", shiftingEarth: "Default", event: null, n1Boss: "Tibia Mariner", n2Boss: "Great Wyrm", n1Circle: "South Lake", n2Circle: "Northeast Corner" },
      { id: 81, spawn: "West of Warmaster's Shack", shiftingEarth: "Default", event: null, n1Boss: "Smelter Demon", n2Boss: "Dragonkin Soldier", n1Circle: "South Lake", n2Circle: "Northwest of Castle" },
    ],
    Maris: [
      { id: 120, spawn: "Southeast of Lake", shiftingEarth: "Default", event: null, n1Boss: "Gaping Dragon", n2Boss: "Godskin Duo", n1Circle: "South Lake", n2Circle: "West Stormhill Graveyard" },
    ],
    Libra: [
      { id: 160, spawn: "Stormhill South of Gate", shiftingEarth: "Default", event: "Hard Madness Tower", n1Boss: "Outland Commander", n2Boss: "Crucible Knight and Golden Hippopotamus", n1Circle: "Northwest Corner", n2Circle: "East of Saintsbridge" },
    ],
    Fulghor: [
      { id: 200, spawn: "Southeast of Lake", shiftingEarth: "Default", event: null, n1Boss: "Gaping Dragon", n2Boss: "Nameless King", n1Circle: "Northwest Mistwood Pond", n2Circle: "Northwest Corner" },
    ],
    Caligo: [
      { id: 240, spawn: "Northeast of Saintsbridge", shiftingEarth: "Default", event: "Day 1 Libra's Curse", n1Boss: "Ulcerated Tree Spirit", n2Boss: "Dancer of the Boreal Valley", n1Circle: "Northwest Lake", n2Circle: "Northeast Corner" },
    ],
    Heolstor: [
      { id: 280, spawn: "East of Cavalry Bridge", shiftingEarth: "Default", event: null, n1Boss: "Valiant Gargoyle", n2Boss: "Death Rite", n1Circle: "West Stormhill Graveyard", n2Circle: "Southwest Mistwood" },
    ],
  };

  const nightlords = Object.keys(allPatterns);

  const patterns = selectedNightlord ? allPatterns[selectedNightlord] : [];

  // Agrupar padrões por spawn point
  const spawnGroups = useMemo(() => {
    const groups = {};
    patterns.forEach(pattern => {
      if (!groups[pattern.spawn]) {
        groups[pattern.spawn] = [];
      }
      groups[pattern.spawn].push(pattern);
    });
    return groups;
  }, [patterns]);

  const filteredSpawns = useMemo(() => {
    return Object.keys(spawnGroups).filter(spawn =>
      spawn.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [spawnGroups, searchTerm]);

  const getImageUrl = (nightlord, patternId) => {
    // Usando GitHub Pages do repositório
    // URL base: https://raw.githubusercontent.com/LucasValpereiro/NIGHTREIGN/main/
    // Estrutura: {nightlord}/{patternId}.webp ou .png
    
    const baseUrl = 'https://raw.githubusercontent.com/LucasValpereiro/NIGHTREIGN/main';
    
    // Tenta primeiro .webp, depois .png como fallback
    return `${baseUrl}/${nightlord}/${patternId}.webp`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-amber-400 mb-2 drop-shadow-lg flex items-center justify-center gap-3">
            <Crown size={40} />
            Elden Ring Nightreign
          </h1>
          <p className="text-purple-200 text-xl">Localizador de Padrões - Deep of Night</p>
          <p className="text-purple-300 text-sm mt-2">✨ Versão Completa com Todos os Nightlords</p>
        </div>

        {/* Step 1: Nightlord Selection */}
        <div className="bg-slate-800/90 backdrop-blur rounded-lg p-6 mb-6 border-2 border-amber-500/30 shadow-2xl">
          <label className="block text-amber-300 font-bold mb-4 text-2xl flex items-center gap-2">
            <Crown size={24} />
            Passo 1: Escolha o Senhor da Noite
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nightlords.map(nl => (
              <button
                key={nl}
                onClick={() => {
                  setSelectedNightlord(nl);
                  setSelectedPattern(null);
                }}
                className={`p-4 rounded-xl font-bold text-lg transition-all transform ${
                  selectedNightlord === nl
                    ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-slate-900 shadow-2xl scale-105 ring-4 ring-amber-400'
                    : 'bg-slate-700 text-purple-200 hover:bg-slate-600 hover:scale-105'
                }`}
              >
                {nl}
              </button>
            ))}
          </div>
        </div>

        {selectedNightlord && (
          <>
            {/* Step 2: Spawn Point Visual Selection */}
            <div className="bg-slate-800/90 backdrop-blur rounded-lg p-6 mb-6 border-2 border-purple-500/30 shadow-2xl">
              <label className="block text-amber-300 font-bold mb-4 text-2xl flex items-center gap-2">
                <MapPin size={24} />
                Passo 2: Identifique Visualmente Onde Você Nasceu
              </label>
              
              <div className="mb-6 relative">
                <Search className="absolute left-4 top-4 text-purple-400" size={24} />
                <input
                  type="text"
                  placeholder="Buscar spawn point..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-4 py-3 bg-slate-700 text-white text-lg rounded-xl border-2 border-purple-500/30 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSpawns.map(spawn => {
                  const spawnsPatterns = spawnGroups[spawn];
                  const firstPattern = spawnsPatterns[0];
                  
                  return (
                    <div key={spawn} className="bg-slate-700/50 rounded-xl overflow-hidden border-2 border-slate-600 hover:border-purple-500 transition-all">
                      <div className="aspect-video bg-slate-900 relative cursor-pointer" onClick={() => setSelectedPattern(firstPattern)}>
                        <img 
                          src={getImageUrl(selectedNightlord, firstPattern.id)} 
                          alt={spawn}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Tenta .png se .webp falhar
                            const currentSrc = e.target.src;
                            if (currentSrc.endsWith('.webp')) {
                              e.target.src = currentSrc.replace('.webp', '.png');
                            } else {
                              // Se .png também falhar, mostra placeholder
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23334155" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%239ca3af" text-anchor="middle" dy=".3em"%3EMapa%3C/text%3E%3C/svg%3E';
                            }
                          }}
                        />
                        <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                          📍 Spawn
                        </div>
                        {spawnsPatterns.length > 1 && (
                          <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {spawnsPatterns.length} seeds
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-slate-700">
                        <p className="text-purple-200 font-semibold text-center">{translate(spawn)}</p>
                        <div className="flex gap-2 mt-2 flex-wrap justify-center">
                          {spawnsPatterns.map((pattern, idx) => (
                            <button
                              key={pattern.id}
                              onClick={() => setSelectedPattern(pattern)}
                              className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
                                selectedPattern?.id === pattern.id
                                  ? 'bg-green-600 text-white ring-2 ring-green-400'
                                  : 'bg-slate-600 text-purple-200 hover:bg-slate-500'
                              }`}
                            >
                              Seed #{pattern.id}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Pattern Details */}
            {selectedPattern && (
              <div className="bg-slate-800/90 backdrop-blur rounded-lg overflow-hidden border-2 border-green-500/50 shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 via-purple-600 to-amber-600 p-6">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                        <Target size={32} />
                        Seed #{selectedPattern.id}
                      </h2>
                      <p className="text-purple-100 text-lg mt-1">📍 {translate(selectedPattern.spawn)}</p>
                      {selectedPattern.shiftingEarth !== "Default" && (
                        <p className="text-amber-200 text-base mt-1 flex items-center gap-1">
                          <Info size={16} />
                          Shifting Earth: {translate(selectedPattern.shiftingEarth)}
                        </p>
                      )}
                    </div>
                    {selectedPattern.event && (
                      <div className="bg-red-600 text-white px-4 py-2 rounded-xl text-base font-bold flex items-center gap-2 shadow-lg">
                        <Zap size={20} />
                        {translate(selectedPattern.event)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Map Image */}
                <div className="bg-slate-900 p-6">
                  <div className="max-w-4xl mx-auto">
                    <img 
                      src={getImageUrl(selectedNightlord, selectedPattern.id)} 
                      alt={`Mapa Seed ${selectedPattern.id}`}
                      className="w-full rounded-xl border-4 border-purple-500/50 shadow-2xl"
                      onError={(e) => {
                        // Tenta .png se .webp falhar
                        const currentSrc = e.target.src;
                        if (currentSrc.endsWith('.webp')) {
                          e.target.src = currentSrc.replace('.webp', '.png');
                        } else {
                          // Se ambos falharem, esconde a imagem
                          e.target.style.display = 'none';
                        }
                      }}
                    />
                    <p className="text-purple-300 text-center mt-4 text-sm italic">
                      ⬆️ Mapa mostrando spawn point, círculos e bosses
                    </p>
                  </div>
                </div>

                {/* Boss Information */}
                <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-800">
                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Night 1 */}
                    <div className="bg-slate-800/80 p-5 rounded-xl border-2 border-blue-500/50 shadow-xl">
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-blue-500/30">
                        <MapPin className="text-blue-400" size={28} />
                        <span className="text-blue-300 font-bold text-2xl">Noite 1</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 p-3 rounded-lg">
                          <p className="text-purple-300 text-sm font-semibold mb-1">Círculo fecha em:</p>
                          <p className="text-white font-bold text-lg">{translate(selectedPattern.n1Circle)}</p>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded-lg">
                          <p className="text-purple-300 text-sm font-semibold mb-1 flex items-center gap-1">
                            <Skull size={16} /> Boss da Noite:
                          </p>
                          <p className="text-amber-300 font-bold text-base">{translate(selectedPattern.n1Boss)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Night 2 */}
                    <div className="bg-slate-800/80 p-5 rounded-xl border-2 border-red-500/50 shadow-xl">
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-red-500/30">
                        <MapPin className="text-red-400" size={28} />
                        <span className="text-red-300 font-bold text-2xl">Noite 2</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 p-3 rounded-lg">
                          <p className="text-purple-300 text-sm font-semibold mb-1">Círculo fecha em:</p>
                          <p className="text-white font-bold text-lg">{translate(selectedPattern.n2Circle)}</p>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded-lg">
                          <p className="text-purple-300 text-sm font-semibold mb-1 flex items-center gap-1">
                            <Skull size={16} /> Boss da Noite:
                          </p>
                          <p className="text-amber-300 font-bold text-base">{translate(selectedPattern.n2Boss)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Extra Night Boss */}
                  {selectedPattern.extraBoss && (
                    <div className="mt-6 max-w-4xl mx-auto">
                      <div className="bg-gradient-to-r from-red-900/50 to-purple-900/50 p-5 rounded-xl border-2 border-red-500/70 shadow-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <AlertCircle className="text-red-400" size={28} />
                          <span className="text-red-300 font-bold text-2xl">Boss Extra da Noite</span>
                        </div>
                        <p className="text-amber-300 font-bold text-xl text-center">{translate(selectedPattern.extraBoss)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Instructions */}
        {!selectedNightlord && (
          <div className="bg-slate-800/70 backdrop-blur rounded-xl p-8 border-2 border-purple-500/20 shadow-xl">
            <h3 className="text-2xl font-bold text-amber-300 mb-4">📖 Como Usar:</h3>
            <ol className="text-purple-200 space-y-3 text-lg list-decimal list-inside">
              <li><strong className="text-amber-300">Escolha o Senhor da Noite</strong> que você selecionou no Roundtable Hold</li>
              <li><strong className="text-amber-300">Identifique visualmente</strong> onde você nasceu pelas miniaturas dos mapas</li>
              <li><strong className="text-amber-300">Selecione a seed</strong> (se houver mais de uma com aquele spawn)</li>
              <li><strong className="text-amber-300">Veja o mapa completo</strong> com spawn, círculos e bosses!</li>
            </ol>
            <div className="mt-6 p-5 bg-purple-900/30 rounded-xl border-2 border-purple-500/40">
              <p className="text-purple-200">
                <strong className="text-amber-300 text-xl">⚡ Ultra Rápido:</strong> Perfeito para usar durante a partida. Só olhar a imagem e clicar!
              </p>
            </div>
            <div className="mt-4 p-4 bg-blue-900/20 rounded-xl border-2 border-blue-500/30">
              <p className="text-blue-200 text-sm">
                <strong className="text-blue-300">ℹ️ Nota:</strong> Os mapas são carregados de thefifthmatt.github.io/nightreign/. 
                Alguns Nightlords têm menos seeds disponíveis no momento (Gnoster: 2, Maris: 1, Libra: 1, Fulghor: 1, Caligo: 1, Heolstor: 1).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NightReignPatternFinder;
