import { useState } from 'react';
import { getRandomId } from './App';

export default function AddFriendForm({ handleAddFriend }) {
    const [name, setName] = useState("");
  
    function handleForm(e) {
      e.preventDefault();
  
      if (!name) return;
  
      const newFriend = {
        id: getRandomId(),
        name: name,
        money: 0
      };
  
      handleAddFriend(newFriend);
      setName("");
    }
  
    function handleOnChange(e) {
      const { value } = e.target;
      setName(value);
    }
  
    return (
      <div>
        <form onSubmit={handleForm} >
          <span>Enter Details :</span><br />
          Name <input name="name" value={name} onChange={handleOnChange} ></input>
          <button>Add</button>
        </form>
      </div>
    );
  }