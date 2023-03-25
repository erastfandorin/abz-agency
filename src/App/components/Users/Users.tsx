import { useEffect, useState } from "react";

import User from "./User/User";
import abzTestApi from "../../services/abzApi";
import Loader from "../Loader";
import { IUser } from "../../interfaces/IForm";

interface UserProps {
  isFormSended: boolean;
  setIsFormSended: (a: boolean) => void;
}

function Users({ isFormSended, setIsFormSended }: UserProps) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, [isFormSended]);

  const getUsers = async () => {
    setIsLoading(true);
    if (isFormSended) {
      await abzTestApi.resetUsersLink();
      setUsers([]);
      setIsFormSended(false);
    } else {
      const result = await abzTestApi.getUsers();

      if (result) {
        setIsLastPage(result.lastPage);
        setUsers([...users, ...result.users]);
      }
    }
    setIsLoading(false);
  };

  return (
    <section className="users" id="users">
      <h2 className="users__heading heading">Working with GET request</h2>
      <ul className="users__list">
        {users.map((user) => (
          <User key={user.id} photo={user.photo} name={user.name} email={user.email} phone={user.phone} position={user.position} />
        ))}
      </ul>
      {isLoading && <Loader />}
      {!isLastPage && (
        <button type="button" className="btn" onClick={getUsers}>
          Show more
        </button>
      )}
    </section>
  );
}

export default Users;
