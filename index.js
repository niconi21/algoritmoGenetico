const path = require('path')
const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors())
app.use('/public', express.static(path.resolve(__dirname, './public')))

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servicio en puerto ${process.env.PORT || 3000}`)
})