import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

function ProfileRelationsBox(props) {
    const items = props.items;
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {props.title} ({props.items.length})
        </h2>
        <ul>
          {props.items.slice(0,6).map((itemAtual) => {
            return (
              <li key={itemAtual.login}>
                <a href={`/users/${itemAtual}`}>
                  <img src={itemAtual.avatar_url} />
                  <span>{itemAtual.login}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </ProfileRelationsBoxWrapper>
    );
}

export {ProfileRelationsBox};