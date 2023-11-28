export default function Friend({ friendsList, handleSelectedFriend, selectedFriend }) {
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