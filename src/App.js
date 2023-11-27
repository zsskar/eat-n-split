import { useState } from 'react';
import './App.css';

function getRandomId() {
  return Math.floor(1000 + Math.random() * 9000);
}

function App() {
  const friendsList = [
    {
      id: getRandomId(),
      name: "Rashid",
      money: 12
    },
    {
      id: getRandomId(),
      name: "Arshad",
      money: 100
    },
    {
      id: getRandomId(),
      name: "Naheem",
      money: 150
    }
  ];

  const [isOpenAddFriend, setIsOpenAddFriend] = useState(false);
  const [friends, setFriends] = useState(friendsList);
  const [selectedFriend, setSelectedFriend] = useState(null);


  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend]);
    setIsOpenAddFriend(false);
  }

  function showHideAddFriendForm() {
    setIsOpenAddFriend((prev) => !prev);
    setSelectedFriend(prev => {
      return prev !== null ? null : prev;
    });
  }

  function handleSelectedFriend(friend) {
    setSelectedFriend((curr) => curr?.id === friend?.id ? null : friend);
    setIsOpenAddFriend(false);
  }

  function onSplitBill(value) {
    setFriends(prevFriends => 
        prevFriends.map(friend => friend.id === selectedFriend.id ? { ...friend, money: friend.money + value } : friend
        ));

        setSelectedFriend(null);
  }

  return (
    <div className='split'>
      <h1>Eat-N-Split</h1>
      <div>
        <FriendsList friendsList={friends} handleAddFriend={handleAddFriend} isOpenAddFriend={isOpenAddFriend}
          showHideAddFriendForm={showHideAddFriendForm} handleSelectedFriend={handleSelectedFriend} selectedFriend={selectedFriend}

        />
      </div>
      <div>
        {selectedFriend && <SplitPrice selectedFriend={selectedFriend} onSplitBill={onSplitBill} />}
      </div>
    </div>
  );
}

function FriendsList({ friendsList, handleAddFriend, isOpenAddFriend, showHideAddFriendForm, handleSelectedFriend, selectedFriend }) {
  console.log(friendsList);

  function handleAddFriendForm() {
    showHideAddFriendForm();
  }

  return (
    <div>
      <ul>
        <Friend friendsList={friendsList} handleSelectedFriend={handleSelectedFriend} selectedFriend={selectedFriend} />
        <br />
      </ul>
      <br />
      {isOpenAddFriend && <AddFriendForm handleAddFriend={handleAddFriend} />}
      <br />
      <button onClick={handleAddFriendForm}>{isOpenAddFriend ? 'Close Friend' : 'Add Friend'}</button>
    </div>
  );
}

function Friend({ friendsList, handleSelectedFriend, selectedFriend }) {
  return (
    <div>
      {
        friendsList.map(friends =>
          <>
            <li key={friends.id}>{friends.name}
              {friends.money < 0 && (
                <span key={friends.id}>You owes {friends.name} {Math.round(friends.money)}</span>
              )}
              {friends.money === 0 && (
                <span key={friends.id}>You and {friends.name} are even.</span>
              )}
              {friends.money > 0 && (
                <span key={friends.id}>{friends.name} owes you {Math.round(friends.money)}</span>
              )}
              <button onClick={() => {
                handleSelectedFriend(friends);
              }}>{selectedFriend && selectedFriend.id === friends.id ? 'Close' : 'Open'}</button>
            </li>
            <br />
            <br />
            <br />
          </>
        )
      }
    </div>
  );
}

function AddFriendForm({ handleAddFriend }) {
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


function SplitPrice({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user")
  const paidByFriend = bill ? bill - paidByUser : "";

  function handleSubmit() {
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);

  }


  return (
    <div>
      <h2>
        SPLIT A BILL WITH {selectedFriend.name}
      </h2>
      Bill Value <input type='text' value={bill} onChange={(e) => setBill(Number(e.target.value))} ></input>
      Your Expense <input type='text' value={paidByUser} onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))} ></input>
      {selectedFriend.name}  Expense <input type='text' value={paidByFriend} disabled></input>
      Who is paying the bill
      <select style={{ width: '100px', textAlign: 'center' }}
        value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select> <br />
      <br />
      <br />
      <button onClick={handleSubmit}>Split</button>
    </div>
  );
  // () => {handleSplitAmount(selectedFriend,paidByFriend)}
}

export default App;
