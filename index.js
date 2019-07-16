const express = require('express');
const path = require('path');
const members = require('./members');
const logger = require('./middleware/logger')

const app = express();
const PORT = process.env.PORT || 5000;


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// api routes
app.use('/api/members', require('./routes/api/members'))

app.use(logger);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});