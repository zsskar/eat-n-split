import { useState } from 'react';
import './App.css';
import FriendsList from './FriendsList';
import SplitPrice from './SplitPrice';

export function getRandomId() {
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
export default App;
