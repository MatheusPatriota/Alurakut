import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { useEffect, useState } from "react";

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

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        Pessoas da comunidade ({props.items.length})
      </h2>
      <ul>
        {/* {props.items.map((itemAtual) => {
          return (
            <li key={itemAtual.login}>
              <a href={`/users/${itemAtual}`}>
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.name}</span>
              </a>
            </li>
          );
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  // variaveis
  const [comunidades, setComunidades] = useState([
    {
      id: "2316546987489461564648646123",
      title: "Odeio Sair de Casa",
      image:
        "https://observatoriodocinema.uol.com.br/wp-content/uploads/2020/12/Garfield-capa.jpeg",
    },
  ]);
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
  }, [seguidores]);

  // funcoes

  function handleCreateCommunity(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const comunidade = {
      id: new Date().toISOString(),
      title: formData.get("title"),
      image: formData.get("image"),
    };

    setComunidades([...comunidades, comunidade]);
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
              {comunidades.map((commnity) => {
                return (
                  <li key={commnity.id}>
                    <a href={`/users/${commnity.title}`}>
                      <img src={commnity.image} />
                      <span>{commnity.title}</span>
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
