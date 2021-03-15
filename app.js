const axios = require('axios');
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(cors());

//TESTE DO SERVIDOR
app.get("/", (request, response) => {
    response.json({ message: 'Parece que você caiu de para-quedas aqui, heim :/' })
});

//Cria a conversão no RDStation
app.post("/conversion", async (req, res, next) => {
  try {
      console.log(req.body);
    let conversion = await axios({ method: 'POST', url: process.env.RD_API_CONVERSION,
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "event_type": "CONVERSION",
        "event_family":"CDP",
        "payload": {
          "conversion_identifier": req.body.conversion_identifier,
          "name": req.body.name,
          "email": req.body.email,
          "tags": req.body.tags,
          "available_for_mailing": true,
        }
      }
    }).then(response => {
      return res.status(200).send('Lead criada com sucesso na RDStation.');
    }).catch(error => {
      console.log(error);
      return res.status(500).send('Erro ao criar led na RDStation.');
    });
    
  } catch (error) {
      return res.status(500).send('Erro ao criar a lead.');
  }
})

//Inicia o server
app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor iniciado!");
});