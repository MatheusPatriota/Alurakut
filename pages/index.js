import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { useEffect, useState } from "react";
import { ProfileRelationsBox } from "../src/components/ProfileRelationsBox";

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      ></img>
      <hr />
      <p>
        <a className="box-link" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  // variaveis
  const [comunidades, setComunidades] = useState([]);
  const [seguidores, setSeguidores] = useState([]);
  const profileName = "MatheusPatriota";
  const pessoasFavoritas = [
    "LucasAzvd",
    "jussaraalves",
    "GabrielVasconcelosMarques",
    "RuanGOA",
    "clenioborgesx",
    "rafxrad",
  ];

  useEffect(() => {
    fetch("https://api.github.com/users/MatheusPatriota/followers")
      .then((serverResponse) => {
        return serverResponse.json();
      })
      .then((reponseConverted) => {
        setSeguidores(reponseConverted);
      });

    // API GraphQL
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "d9e42ca99c80a323feeafc70eb7ba6",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
        allCommunities {
          id 
          title
          imageUrl
          slugCriador
        }
      }`,
      }),
    })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        // console.log(comunidadesVindasDoDato)
        setComunidades(comunidadesVindasDoDato);
      });
  }, []);
  // API Github

  function handleCreateCommunity(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const comunidade = {
      title: formData.get("title"),
      imageUrl: formData.get("image"),
      slugCriador: profileName,
    };

    console.log(comunidade);

    fetch("/api/comunidades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comunidade),
    }).then(async (response) => {
      console.log("entrou na async")

      const dados = await response.json();

      console.log("saiu do async")

      console.log(dados.registroCriado);
      const comunidade = dados.registroCriado;
      setComunidades([...comunidades, comunidade]);
    });
  }

  return (
    <>
      <AlurakutMenu githubUser={profileName} />
      <MainGrid>
        <div style={{ gridArea: "profileArea" }} className="profileArea">
          <ProfileSideBar githubUser={profileName} />
        </div>
        <div style={{ gridArea: "welcomeArea" }} className="welcomeArea">
          <Box>
            <h1>Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subtitle">O que voce deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para colocarmos de Capa"
                  name="image"
                  aria-label="Coloque uma URL para colocarmos de Capa"
                  type="text"
                />
              </div>
              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>
        <div
          style={{ gridArea: "profileRelationsArea" }}
          className="profileRelationsArea"
        >
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          {/* <ProfileRelationsBox title="Pessoas da Comunidade" items={pessoasFavoritas} />
          <ProfileRelationsBox title="Comunidade" items={seguidores} /> */}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((profileName) => {
                return (
                  <li key={profileName}>
                    <a href={`/users/${profileName}`}>
                      <img src={`https://github.com/${profileName}.png`} />
                      <span>{profileName}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.slice(0, 6).map((comunidade) => {
                return (
                  <li key={comunidade.id}>
                    <a href={`/comunidades/${comunidade.id}`}>
                      <img src={comunidade.imageUrl} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
