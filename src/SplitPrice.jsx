import { useState } from 'react';

export default function SplitPrice({ selectedFriend, onSplitBill }) {
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