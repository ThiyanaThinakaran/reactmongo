import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
function App() {
  const [data, setData] = useState([]);
  const [userId, setuserId] = useState('');
  const [password, setpassword] = useState('');
  const [emailId, setemailId] = useState('');
 
  const updateuserId = (event) =>
  {
    setuserId(event.target.value);
  };
 
  const updatepassword = (event) =>
  {
    setpassword(event.target.value);
  };
 
  const updateemailId = (event) =>
  {
    setemailId(event.target.value);
  };
 
  const addNewUser = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/addNewUser', { userId: userId, password: password, emailId: emailId })
      .then((res) => {console.log(res);
        fetchData();
      });
 
  };
 
  const updateUsers = () => {
    axios.put(`http://localhost:3000/updateUser`, { userId: userId, password: password, emailId: emailId })
      .then((res) => {
        console.log(res);
        fetchData();
      });
  };
  const deleteUsers = () => {
    axios.delete(`http://localhost:3000/deleteUser?userId=${userId}`)
      .then((res) => {
        console.log(res);
        fetchData();
      });
  };
  const fetchData = () => {
    fetch('http://localhost:3000/getAll')
      .then((response) => response.json())
      .then((data) => setData(data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <center>
        <form onSubmit={insertUsers}>
          <b>User ID</b>
          <input type="text" value={userId} onChange={updateuserId} /><br />
          <b>Password</b>
          <input type="password" value={password} onChange={updatepassword} /><br />
          <b>Email ID</b>
          <input type="email" value={emailId} onChange={updateemailId} /><br />
       
 
          <input type="submit" value="Add" onSubmit={addNewUser}/>&nbsp;&nbsp;
          <input type="reset" value="Reset" />&nbsp;&nbsp;
          <input type="button" value="Update" onClick={updateUsers} />&nbsp;&nbsp;
          <input type="button" value="Delete" onClick={deleteUsers} />&nbsp;&nbsp;
        </form>
      </center>
      <ul>
        {data.map((item) => (
          <li key={item.userid}>
            {item.userid}&nbsp;,{item.emailid}&nbsp;, {item.password}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;