import { useState } from 'react';
import './App.css';
import Header from './Header';
import ChangeLanguage from './ChangeLanguage';
import UserForm, { User } from './UserForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function App() {
  const [users, setNewUser] = useState<User[]>([])

  const [defaultValue, setDefaultValue] = useState<any>()

  function deleteUser(name: string) {
    const newArray = [...users]
    setNewUser(newArray.filter((e) => e.name !== name))
  }

  function editUser(i: any, index: any) {
    setDefaultValue(i)
    i[index] = defaultValue;
  }

  const k = (i: User) => {
    setNewUser([...users, i])
  }

  //console.log(defaultValue)

  return (
    <>
      <ChangeLanguage>
        <Header />
      </ChangeLanguage>
      <main>
        <ul>
          {users?.map((i, index) => (<li key={index} >
            <DeleteIcon className='delete-icon' sx={{ fontSize: 'medium' }} onClick={() => deleteUser(i.name)} />
            <EditIcon className='edit-icon' sx={{ fontSize: 'medium' }} onClick={() => editUser(i = i, index = index)}>
            </EditIcon>
            {i?.name} {i?.surname}, {i?.age}, {i?.email}, {i?.phone}. {i?.adress.country}, {i?.adress.city}</li>))}
        </ul>
      </main>
      {/* <RegForm /> */}
      <aside><UserForm setUsers={k} defaultValue={defaultValue} /></aside>
    </>
  );
}

export default App
