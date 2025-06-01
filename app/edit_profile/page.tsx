'use client'

import AppFooter from '../components/AppFooter';
import AppNavbar from '../components/AppNavbar';
import ProfileEditor from '../components/profile/ProfileEditor';

export default function EditProfilePage(){
  return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: "#f5f5f5",
      }}
    >
      <AppNavbar/>
      <ProfileEditor/>
      <AppFooter/>
    </div>
  );
}