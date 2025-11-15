#!/usr/bin/env python3
"""
Script para extrair dados de spawn points e seeds dos bosses do Elden Ring Nightreign
Usa web scraping para coletar informações das páginas oficiais
"""

import requests
from bs4 import BeautifulSoup
import json
import re

def extract_boss_data(boss_name, url):
    """
    Extrai dados de spawn points e seeds de um boss específico
    
    Args:
        boss_name (str): Nome do boss
        url (str): URL da página do boss
    
    Returns:
        dict: Dicionário com spawns e seeds organizados
    """
    print(f"\n🔍 Coletando dados de {boss_name}...")
    
    try:
        # Faz requisição à página
        response = requests.get(url)
        response.raise_for_status()
        
        # Parse do HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Dicionário para armazenar os spawns
        spawns = {}
        
        # Encontra todos os elementos de spawn point
        # A estrutura pode variar, ajuste conforme necessário
        spawn_sections = soup.find_all('h2') + soup.find_all('h3')
        
        current_spawn = None
        
        for element in soup.find_all(['h2', 'h3', 'a']):
            text = element.get_text().strip()
            
            # Identifica spawn points (geralmente são headers)
            if element.name in ['h2', 'h3'] and not text.startswith('Seed'):
                # Remove números e caracteres especiais do nome
                spawn_name = re.sub(r'^\d+\s*-?\s*', '', text)
                if spawn_name and len(spawn_name) > 3:
                    current_spawn = spawn_name
                    if current_spawn not in spawns:
                        spawns[current_spawn] = []
            
            # Identifica seeds (links ou números)
            elif element.name == 'a' and current_spawn:
                href = element.get('href', '')
                # Extrai número da seed do href (ex: 000.html -> 0)
                seed_match = re.search(r'(\d{3})\.html', href)
                if seed_match:
                    seed_num = int(seed_match.group(1))
                    if seed_num not in spawns[current_spawn]:
                        spawns[current_spawn].append(seed_num)
        
        # Ordena as seeds de cada spawn
        for spawn in spawns:
            spawns[spawn].sort()
        
        print(f"✅ {len(spawns)} spawn points encontrados para {boss_name}")
        
        return {
            'url': url,
            'spawns': spawns,
            'nightData': {
                'night1Circles': ['A definir - consulte a planilha'],
                'night2Circles': ['A definir - consulte a planilha']
            }
        }
    
    except Exception as e:
        print(f"❌ Erro ao coletar dados de {boss_name}: {str(e)}")
        return None

def main():
    """Função principal para coletar dados de todos os bosses"""
    
    # Lista de bosses e suas URLs
    bosses = {
        'Gladius': 'https://thefifthmatt.github.io/nightreign/gladius/',
        'Adel': 'https://thefifthmatt.github.io/nightreign/adel/',
        'Gnoster': 'https://thefifthmatt.github.io/nightreign/gnoster/',
        'Maris': 'https://thefifthmatt.github.io/nightreign/maris/',
        'Libra': 'https://thefifthmatt.github.io/nightreign/libra/',
        'Fulghor': 'https://thefifthmatt.github.io/nightreign/fulghor/',
        'Caligo': 'https://thefifthmatt.github.io/nightreign/caligo/',
        'Heolstor': 'https://thefifthmatt.github.io/nightreign/heolstor/'
    }
    
    # Dicionário para armazenar todos os dados
    all_boss_data = {}
    
    print("=" * 60)
    print("🎮 ELDEN RING NIGHTREIGN - EXTRATOR DE DADOS")
    print("=" * 60)
    
    # Coleta dados de cada boss
    for boss_name, boss_url in bosses.items():
        boss_data = extract_boss_data(boss_name, boss_url)
        if boss_data:
            all_boss_data[boss_name] = boss_data
    
    # Salva os dados em arquivo JSON
    output_file = 'boss_data.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_boss_data, f, indent=4, ensure_ascii=False)
    
    print(f"\n✅ Dados salvos em '{output_file}'")
    print("\n📊 Resumo dos dados coletados:")
    print("=" * 60)
    
    for boss_name, data in all_boss_data.items():
        total_seeds = sum(len(seeds) for seeds in data['spawns'].values())
        print(f"  {boss_name}: {len(data['spawns'])} spawns, {total_seeds} seeds")
    
    print("=" * 60)
    print("\n⚠️  IMPORTANTE:")
    print("  - Verifique os dados coletados em 'boss_data.json'")
    print("  - Complete as informações de 'nightData' consultando a planilha oficial")
    print("  - Ajuste nomes de spawn points se necessário")
    print("\n🔗 Planilha oficial:")
    print("  https://docs.google.com/spreadsheets/d/1qZX3MfipvtPbKwPjElyx9Rler4RXLd9CPrOv7c2XOWI")
    print("\n" + "=" * 60)

# Função auxiliar para converter JSON para JavaScript
def json_to_javascript(json_file='boss_data.json', output_file='boss_data.js'):
    """
    Converte o JSON para um objeto JavaScript para uso direto no app
    
    Args:
        json_file (str): Arquivo JSON de entrada
        output_file (str): Arquivo JS de saída
    """
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("// Dados dos bosses do Elden Ring Nightreign\n")
        f.write("// Gerado automaticamente - Revise antes de usar\n\n")
        f.write("const bossData = ")
        f.write(json.dumps(data, indent=2))
        f.write(";\n\nexport default bossData;")
    
    print(f"✅ Arquivo JavaScript criado: {output_file}")

if __name__ == "__main__":
    print("""
    ╔════════════════════════════════════════════════════════════╗
    ║  ELDEN RING NIGHTREIGN - BOSS DATA EXTRACTOR              ║
    ║                                                            ║
    ║  Este script coleta dados dos bosses automaticamente      ║
    ║  das páginas oficiais do TheFifthMatt                     ║
    ╚════════════════════════════════════════════════════════════╝
    """)
    
    try:
        main()
        
        # Pergunta se deseja converter para JavaScript
        print("\n🔄 Deseja converter os dados para JavaScript? (s/n): ", end="")
        resposta = input().strip().lower()
        if resposta == 's':
            json_to_javascript()
    
    except KeyboardInterrupt:
        print("\n\n⚠️  Operação cancelada pelo usuário")
    except Exception as e:
        print(f"\n❌ Erro: {str(e)}")

"""
INSTRUÇÕES DE USO:

1. Instale as dependências:
   pip install requests beautifulsoup4

2. Execute o script:
   python3 boss_data_extractor.py

3. O script irá:
   - Acessar cada URL dos bosses
   - Extrair spawn points e seeds
   - Salvar tudo em 'boss_data.json'
   - Opcionalmente converter para JavaScript

4. Revise os dados coletados e complete com informações da planilha

5. Copie os dados para o aplicativo React

NOTAS:
- O script pode precisar de ajustes dependendo da estrutura HTML das páginas
- Sempre revise os dados antes de usar no app
- Complete as informações de nightData manualmente usando a planilha
"""
