
const express = require('express'); 
const app = express(); //
const port = process.env.PORT || 5000; 
const cors = require("cors");
app.use(cors());


app.listen(port, () => console.log(`Listening on port ${port}`)); 


app.get('/back', (req, res) => { 
  res.send({ express: 'Ответ с сервера: Данные получены!' }); 
}); 