const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Route test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend fonctionne !' });
});

// Données mock
const logements = [
  { id: 1, titre: "Appartement centre-ville", prix: 50000, ville: "Tunis" },
  { id: 2, titre: "Maison avec jardin", prix: 120000, ville: "Sousse" },
  { id: 3, titre: "Studio proche université", prix: 25000, ville: "Sfax" },
];

// Route pour récupérer les logements
app.get('/api/logements', (req, res) => {
  res.json(logements);
});

app.listen(port, () => {
  console.log(`Serveur backend lancé sur http://localhost:${port}`);
});
