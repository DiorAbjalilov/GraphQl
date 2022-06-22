import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "./query/user";
import { CREATE_USER } from "./mutations/user";

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState([]);
  const [age, setAge] = useState([]);
  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          name,
          age,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setName("");
      setAge(0);
    });
  };

  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
        />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>New File</button>
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
