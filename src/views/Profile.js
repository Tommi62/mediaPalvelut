import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const Profile = () => {
  const [user] = useContext(MediaContext);

  return (
    <>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>{user.full_name}</p>
          <p>{user.email}</p>
          <p>{user.username}</p>
        </div>
      )}
    </>
  );
};

export default Profile;
