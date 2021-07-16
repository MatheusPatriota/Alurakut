import {SiteClient} from 'datocms-client'

export default async function recebedorDeRequests(req, res){
    console.log("entrou na funcao")
    if(req.method === 'POST'){
        const TOKEN = '2cf5e38e4d7e10d56c17c630a1e146';
        const client = new SiteClient(TOKEN);
    
        // validar os dados antes de cadastrar
        const registroCriado = await client.items.create({
            itemType: '967809', // id model criado pelo dato
            ...req.body,
            // title: "Comunidade",
            // imageUrl:"htpps://github.com/MatheusPatriota.png",
            // slugCriador:"matheuspatriota"
        })
        console.log(registroCriado);

        res.json({
            dados: "Algum dado Qualquer",
            registroCriado: registroCriado,
        });
        return;
    }

    res.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}