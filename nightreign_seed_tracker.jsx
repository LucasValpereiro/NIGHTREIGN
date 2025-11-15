import React, { useState } from 'react';
import { Search, MapPin, Clock, Info } from 'lucide-react';

const NightReignSeedTracker = () => {
  const [selectedBoss, setSelectedBoss] = useState('Gladius');
  const [selectedSpawn, setSelectedSpawn] = useState(null);
  const [selectedSeed, setSelectedSeed] = useState(null);

  // Lista dos 8 bosses na ordem especificada
  const bosses = [
    { name: 'Gladius', color: 'bg-red-600', icon: '⚔️' },
    { name: 'Adel', color: 'bg-blue-600', icon: '🛡️' },
    { name: 'Gnoster', color: 'bg-purple-600', icon: '🔮' },
    { name: 'Maris', color: 'bg-cyan-600', icon: '🌊' },
    { name: 'Libra', color: 'bg-yellow-600', icon: '⚖️' },
    { name: 'Fulghor', color: 'bg-orange-600', icon: '⚡' },
    { name: 'Caligo', color: 'bg-gray-700', icon: '🌑' },
    { name: 'Heolstor', color: 'bg-green-600', icon: '🌿' }
  ];

  // Dados de spawn points e suas seeds para cada boss
  const bossData = {
    'Gladius': {
      url: 'https://thefifthmatt.github.io/nightreign/gladius/',
      spawns: {
        'Far Southwest': [8, 10, 13, 14, 26],
        'Stormhill South of Gate': [2, 12, 22, 34],
        'Above Stormhill Tunnel Entrance': [1, 6, 18, 35],
        'West of Warmaster\'s Shack': [19, 28, 29, 31],
        'Southeast of Lake': [4, 21, 25],
        'East of Cavalry Bridge': [0, 5, 9, 27, 37, 39],
        'Minor Erdtree': [7, 11, 38],
        'Below Summonwater Hawk': [3, 17, 20, 23, 24, 30, 32, 33],
        'Northeast of Saintsbridge': [15, 16, 36]
      },
      nightData: {
        night1Circles: ['West Stormhill Graveyard', 'Northwest Corner', 'Southwest Corner', 'Northeast Corner', 'East of Saintsbridge', 'South Lake', 'Northwest Mistwood Pond', 'Northwest Lake', 'Southwest Mistwood', 'Northeast of Lake'],
        night2Circles: ['Northeast Corner', 'West Stormhill Graveyard', 'Southwest Corner', 'Northwest Corner', 'Northwest Mistwood Pond', 'South Lake', 'Northwest Lake', 'Southwest Mistwood', 'Northeast of Lake', 'Southeast Mountaintop', 'North of Crater', 'Noklateo Entrance', 'Southeast Rotted Woods']
      }
    },
    'Adel': {
      url: 'https://thefifthmatt.github.io/nightreign/adel/',
      spawns: {
        'Southeast of Lake': [0, 4, 6],
        'West of Warmaster\'s Shack': [1, 7],
        'Stormhill South of Gate': [2, 12, 14],
        'Below Summonwater Hawk': [3, 4, 8, 10, 19],
        'Far Southwest': [8, 17],
        'Minor Erdtree': [9, 11, 15],
        'East of Cavalry Bridge': [10, 16, 18],
        'Above Stormhill Tunnel Entrance': [7, 17],
        'Northeast of Saintsbridge': [14, 13]
      },
      nightData: {
        night1Circles: ['West Stormhill Graveyard', 'Northwest Mistwood Pond', 'Northeast Corner', 'South of Castle', 'Northwest Lake', 'Southwest Corner', 'South Lake'],
        night2Circles: ['Southwest Mistwood', 'Southwest Corner', 'Northeast Corner', 'West Stormhill Graveyard', 'East of Saintsbridge', 'Northwest of Castle', 'Northwest Lake', 'South Lake', 'Southeast Mountaintop', 'North of Crater', 'Southeast Rotted Woods', 'Northwest Rotted Woods']
      }
    },
    'Gnoster': {
      url: 'https://thefifthmatt.github.io/nightreign/gnoster/',
      spawns: {
        'Default Spawn 1': [0, 1, 2, 3, 4],
        'Default Spawn 2': [5, 6, 7, 8, 9],
        'Mountaintop Spawn': [10, 11, 12, 13],
        'Crater Spawn': [14, 15, 16],
        'Rotted Woods Spawn': [17, 18, 19],
        'Noklateo Spawn': [20, 21, 22]
      },
      nightData: {
        night1Circles: ['Circle A', 'Circle B'],
        night2Circles: ['Circle C', 'Circle D']
      }
    },
    'Maris': {
      url: 'https://thefifthmatt.github.io/nightreign/maris/',
      spawns: {
        'Default Spawn 1': [0, 1, 2, 3, 4],
        'Default Spawn 2': [5, 6, 7, 8, 9],
        'Mountaintop Spawn': [10, 11, 12],
        'Crater Spawn': [13, 14, 15],
        'Rotted Woods Spawn': [16, 17, 18]
      },
      nightData: {
        night1Circles: ['Circle A', 'Circle B'],
        night2Circles: ['Circle C', 'Circle D']
      }
    },
    'Libra': {
      url: 'https://thefifthmatt.github.io/nightreign/libra/',
      spawns: {
        'Default Spawn 1': [0, 1, 2, 3, 4],
        'Default Spawn 2': [5, 6, 7, 8, 9],
        'Special Spawn': [10, 11, 12]
      },
      nightData: {
        night1Circles: ['Circle A'],
        night2Circles: ['Circle B']
      }
    },
    'Fulghor': {
      url: 'https://thefifthmatt.github.io/nightreign/fulghor/',
      spawns: {
        'Default Spawn 1': [0, 1, 2, 3, 4],
        'Default Spawn 2': [5, 6, 7, 8, 9]
      },
      nightData: {
        night1Circles: ['Circle A'],
        night2Circles: ['Circle B']
      }
    },
    'Caligo': {
      url: 'https://thefifthmatt.github.io/nightreign/caligo/',
      spawns: {
        'Default Spawn 1': [0, 1, 2, 3, 4],
        'Default Spawn 2': [5, 6, 7, 8, 9]
      },
      nightData: {
        night1Circles: ['Circle A'],
        night2Circles: ['Circle B']
      }
    },
    'Heolstor': {
      url: 'https://thefifthmatt.github.io/nightreign/heolstor/',
      spawns: {
        'Default Spawn 1': [0, 1, 2, 3, 4],
        'Default Spawn 2': [5, 6, 7, 8, 9]
      },
      nightData: {
        night1Circles: ['Circle A'],
        night2Circles: ['Circle B']
      }
    }
  };

  // Obter dados do boss selecionado
  const currentBossData = bossData[selectedBoss];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            Elden Ring Nightreign
          </h1>
          <p className="text-xl text-gray-300">Seed Tracker & Boss Location Finder</p>
        </div>

        {/* Boss Selection */}
        <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 mb-6 border border-purple-500/30">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Search className="w-6 h-6" />
            Selecione o Boss
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bosses.map((boss) => (
              <button
                key={boss.name}
                onClick={() => {
                  setSelectedBoss(boss.name);
                  setSelectedSpawn(null);
                  setSelectedSeed(null);
                }}
                className={`
                  ${selectedBoss === boss.name ? boss.color : 'bg-gray-700'}
                  hover:scale-105 transition-all duration-200 p-6 rounded-lg border-2
                  ${selectedBoss === boss.name ? 'border-yellow-400' : 'border-transparent'}
                  shadow-lg hover:shadow-2xl
                `}
              >
                <div className="text-4xl mb-2">{boss.icon}</div>
                <div className="font-bold text-lg">{boss.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Spawn Points */}
          <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Spawn Points
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {Object.entries(currentBossData.spawns).map(([spawn, seeds]) => (
                <button
                  key={spawn}
                  onClick={() => setSelectedSpawn(spawn)}
                  className={`
                    w-full text-left p-4 rounded-lg transition-all duration-200
                    ${selectedSpawn === spawn 
                      ? 'bg-purple-600 border-2 border-yellow-400' 
                      : 'bg-gray-700 hover:bg-gray-600'
                    }
                  `}
                >
                  <div className="font-semibold mb-1">{spawn}</div>
                  <div className="text-sm text-gray-300">
                    {seeds.length} seed{seeds.length !== 1 ? 's' : ''} disponível
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Seeds */}
          <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Info className="w-6 h-6" />
              {selectedSpawn ? `Seeds para ${selectedSpawn}` : 'Selecione um Spawn Point'}
            </h2>
            {selectedSpawn ? (
              <div>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {currentBossData.spawns[selectedSpawn].map((seed) => (
                    <button
                      key={seed}
                      onClick={() => setSelectedSeed(seed)}
                      className={`
                        p-3 rounded-lg font-bold transition-all duration-200
                        ${selectedSeed === seed 
                          ? 'bg-yellow-500 text-black scale-110' 
                          : 'bg-gray-700 hover:bg-gray-600'
                        }
                      `}
                    >
                      {String(seed).padStart(3, '0')}
                    </button>
                  ))}
                </div>
                
                {selectedSeed !== null && (
                  <div className="bg-purple-900/50 p-4 rounded-lg border border-purple-400">
                    <h3 className="font-bold mb-2">Seed {String(selectedSeed).padStart(3, '0')}</h3>
                    <a 
                      href={`${currentBossData.url}${String(selectedSeed).padStart(3, '0')}.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      🔗 Ver Mapa Completo
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-400 text-center py-8">
                Selecione um spawn point para ver as seeds disponíveis
              </div>
            )}
          </div>
        </div>

        {/* Night Circles Info */}
        <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 mt-6 border border-purple-500/30">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6" />
            Informações das Noites
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/50">
              <h3 className="text-xl font-bold mb-3 text-blue-300">🌙 Noite 1</h3>
              <div className="space-y-1">
                <p className="text-sm font-semibold mb-2">Círculos de Fechamento:</p>
                {currentBossData.nightData.night1Circles.map((circle, idx) => (
                  <div key={idx} className="text-sm bg-blue-950/50 px-3 py-1 rounded">
                    {circle}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/50">
              <h3 className="text-xl font-bold mb-3 text-red-300">🌑 Noite 2</h3>
              <div className="space-y-1">
                <p className="text-sm font-semibold mb-2">Círculos de Fechamento:</p>
                {currentBossData.nightData.night2Circles.map((circle, idx) => (
                  <div key={idx} className="text-sm bg-red-950/50 px-3 py-1 rounded">
                    {circle}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer com Links */}
        <div className="mt-8 text-center text-gray-400">
          <p className="mb-2">Dados baseados em:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://thefifthmatt.github.io/nightreign/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              TheFifthMatt's Nightreign Patterns
            </a>
            <a 
              href="https://docs.google.com/spreadsheets/d/1qZX3MfipvtPbKwPjElyx9Rler4RXLd9CPrOv7c2XOWI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Planilha Oficial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NightReignSeedTracker;
