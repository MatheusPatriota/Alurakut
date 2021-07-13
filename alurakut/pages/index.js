import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSideBar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      ></img>
    </Box>
  );
}

export default function Home() {
  const profileName = "MatheusPatriota";
  const pessoasFavoritas = [
    "LucasAzvd",
    "jussaraalves",
    "GabrielVasconcelosMarques",
    "RuanGOA",
    "clenioborgesx",
    "rafxrad",
  ];
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div style={{ gridArea: "profileArea" }} className="profileArea">
          <ProfileSideBar githubUser={profileName} />
        </div>
        <div style={{ gridArea: "welcomeArea" }} className="welcomeArea">
          <Box>
            <h1>Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div
          style={{ gridArea: "profileRelationsArea" }}
          className="profileRelationsArea"
        >
           <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((pessoaAtual) => {
                return (
                  <li>
                    <a href={`/users/${pessoaAtual}`} key={pessoaAtual}>
                      <img src={`https://github.com/${pessoaAtual}.png`} />
                      <span>{pessoaAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          {/* <Box
            style={{ gridArea: "profileRelationsArea" }}
            className="profileRelationsArea"
          >
            Comunidades
          </Box> */}
        </div>
      </MainGrid>
    </>
  );
}
