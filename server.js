const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample in-memory database
let inventory = {
    "item1": { name: "Item 1", price: 10 },
    "item2": { name: "Item 2", price: 15 }
};

// API to get inventory
app.get('/api/inventory', (req, res) => {
    res.json(inventory);
});

// API to process a sale
app.post('/api/sale', (req, res) => {
    const { items } = req.body;
    let total = 0;
    
    for (const item of items) {
        if (inventory[item.id]) {
            total += inventory[item.id].price * item.quantity;
        }
    }

    res.json({ total });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
