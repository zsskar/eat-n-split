import Friend from './Friend';
import AddFriendForm from './AddFriendForm';

export default function FriendsList({ friendsList, handleAddFriend, isOpenAddFriend, showHideAddFriendForm, handleSelectedFriend, selectedFriend }) {  
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