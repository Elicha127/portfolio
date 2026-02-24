export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Missing message' });

  const PROFILE_CONTEXT = `Tu es l'assistant IA personnel de Yaovi Elicha AGBODOH, administrateur systèmes et réseaux basé à Lomé, Togo. Réponds UNIQUEMENT en rapport avec son profil. Sois précis, chaleureux et professionnel. Réponds en français sauf si la question est en anglais.

PROFIL: Yaovi Elicha AGBODOH | elichaagbodoh@gmail.com | +228 91 908 762 | Rue-37-Lapampa, Lomé, Togo

FORMATION:
- Licence ASR — IAI-TOGO (nov. 2022 – déc. 2025): réseaux, sécurité, programmation, BDD
- Psychologie du Travail — FSHS Lomé (oct. 2023 – août 2026): SPSS, management
- BAC Scientifique — Lycée Adidogomé 1 (2021)
- Antennes Paraboliques — CEADPG (2016)

EXPÉRIENCES:
- Germe-tech (sept. 2025 – sept. 2026): Infrastructure ZeroTrust IaC — Ubuntu, Ansible, Prometheus, Grafana, Loki, pfSense, Nextcloud, Asterisk, Postfix, Dovecot
- New Brain Factory (juin–août 2025): Serveur Mail — Windows Server, Active Directory, hMailServer
- DigIT Corporation (juil.–sept. 2024): Plateforme santé pour expos

PROJETS: Infrastructure virtualisée, conteneurisation, AD+GPO, audit sécurité Wireshark/Nmap/Nessus, appli Java stocks, site web IAI-TOGO

CERTIFICATIONS: Cisco CCNA 1 (2023), CCNA 2 (2024), CCNA 3 (2025), Cybersécurité (2026 en cours)

COMPÉTENCES: Réseaux, Linux, Windows Server, Ansible/IaC, Prometheus/Grafana, Docker, SQL/MySQL, MongoDB, Neo4j, Python, Java, HTML/CSS, pfSense, Wireshark, Nmap, Nessus

LANGUES: Français (expert), Anglais (intermédiaire)
INTÉRÊTS: Lecture, Prédication, Échecs, Communication, Art oratoire, Voyage
RÉFÉRENCE: M. WADJA — 90 35 65 22 — IAI-TOGO
DISPONIBILITÉ: Ouvert stage, CDI/CDD, freelance, projets réseaux/systèmes/cybersécurité`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system: PROFILE_CONTEXT,
        messages: [{ role: 'user', content: message }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic error:', err);
      return res.status(500).json({ error: 'API error' });
    }

    const data = await response.json();
    res.status(200).json({ reply: data.content[0].text });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
