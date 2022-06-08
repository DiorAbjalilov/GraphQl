import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ALL_USERS } from "./query/user";

const App = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [users, setUsers] = useState([]);
  console.log(data);
  useEffect(() => {}, [data]);
  return (
    <div>
      <form>
        <input type="text" />
        <input type="number" />
        <div className="btns">
          <button>New File</button>
          <button>pull</button>
        </div>
      </form>
      <div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <h3>
                {user.id} {user.name} {user.age}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
