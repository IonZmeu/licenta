import React from "react";

function Logout() {
  localStorage.removeItem('token');
  window.location.reload()
}

const Profile = () => {
  if  (localStorage.getItem('token') != null){
    return <div>
    <button onClick={() => Logout()}>Logout button</button>
  </div>;
  }
  
};

export default Profile;
