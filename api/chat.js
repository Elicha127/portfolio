const https = require('https');

module.exports = async function handler(req, res) {
    // 1. Headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return res.status(500).json({ error: "Clé API manquante" });

    const PROFILE_CONTEXT = `Tu es l'assistant IA personnel de Yaovi Elicha AGBODOH, administrateur systèmes et réseaux basé à Lomé, Togo. Réponds UNIQUEMENT en rapport avec son profil. Sois précis, chaleureux et professionnel. Réponds en français sauf si la question est posée en anglais. Si on te demande qui tu es, dis que tu es l'assistant IA du portfolio d'Elicha.

PROFIL: Yaovi Elicha AGBODOH
- Email: elichaagbodoh@gmail.com
- Téléphone: +228 91 908 762
- Adresse: Rue-37-Lapampa, Lomé, Togo
- Poste: Administrateur Systèmes et Réseaux

FORMATION:
- Licence ASR — IAI-TOGO (nov. 2022 – déc. 2025): réseaux, sécurité, programmation, BDD
- Psychologie du Travail — FSHS Lomé (oct. 2023 – août 2026): SPSS, management
- BAC Scientifique — Lycée Adidogomé 1 (2021)
- Antennes Paraboliques — CEADPG (2016)

EXPÉRIENCES:
- Germe-tech (sept. 2025 – sept. 2026): Infrastructure ZeroTrust IaC — Ubuntu, Ansible, Prometheus, Grafana, Loki, AlertManager, pfSense, Nextcloud, Asterisk, Postfix, Dovecot, Windows Server
- New Brain Factory (juin–août 2025): Serveur Mail — Windows Server, Active Directory, hMailServer
- DigIT Corporation (juil.–sept. 2024): Plateforme enregistrement santé pour expos

PROJETS ACADÉMIQUES:
- Infrastructure réseau virtualisée
- Solution de conteneurisation Docker
- Active Directory complet avec GPO
- Audit de sécurité: Wireshark, Nmap, Nessus
- Automatisation tâches d'administration système
- Application Java de gestion des stocks
- Site web gestion candidatures IAI-TOGO

CERTIFICATIONS:
- Cisco CCNA 1 (2023): Introduction aux réseaux
- Cisco CCNA 2 (2024): Routage et commutation
- Cisco CCNA 3 (2025): Enterprise Networking, Security, and Automation — badge vérifié sur Credly
- Cisco Cybersécurité (2026, en cours): Principes de cybersécurité

COMPÉTENCES (niveau avancé):
- Réseaux: pfSense, VPN, ZeroTrust, Wireshark, Nmap, Nessus
- Systèmes: Linux/Ubuntu Server, Windows Server, Active Directory, GPO
- Automatisation/DevOps: Ansible, IaC, scripting Bash/Python
- Monitoring: Prometheus, Grafana, Loki, AlertManager
- Services: Postfix, Dovecot, Asterisk, Nextcloud, hMailServer
- Conteneurisation: Docker
- BDD: SQL/MySQL, MongoDB, Neo4j
- Programmation: Python, Java, HTML/CSS

LANGUES: Français (expert), Anglais (intermédiaire)
INTÉRÊTS: Lecture, Prédication, Jeu d'échecs, Communication, Art oratoire, Voyage
RÉFÉRENCE: M. WADJA — 90 35 65 22 — IAI-TOGO
DISPONIBILITÉ: Ouvert à stage, CDI/CDD, freelance, projets réseaux/systèmes/cybersécurité/automatisation;

    // Préparation des données pour Google
    const data = JSON.stringify({
        contents: [{
            parts: [{ text: `CONTEXTE:\n${PROFILE_CONTEXT}\n\nUSER:\n${message}` }]
        }]
    });

    // 2. Utilisation de HTTPS (plus stable que fetch sur les vieilles versions Node)
    const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const request = https.request(options, (response) => {
        let body = '';
        response.on('data', (chunk) => body += chunk);
        response.on('end', () => {
            try {
                const json = JSON.parse(body);
                if (response.statusCode === 200) {
                    const reply = json.candidates?.[0]?.content?.parts?.[0]?.text;
                    res.status(200).json({ reply: reply || "Pas de réponse" });
                } else {
                    res.status(response.statusCode).json({ error: "Erreur Google", detail: json });
                }
            } catch (e) {
                res.status(500).json({ error: "Erreur parsing JSON" });
            }
        });
    });

    request.on('error', (error) => {
        res.status(500).json({ error: "Erreur réseau", details: error.message });
    });

    request.write(data);
    request.end();
};