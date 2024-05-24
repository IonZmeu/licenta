import React from "react";

function Logout() {
  localStorage.removeItem('token');
  window.location.reload()
}

const Profile = () => {
  if  (localStorage.getItem('token') != null){
    return <div>
    profile emptz
  </div>;
  }
  
};

export default Profile;
