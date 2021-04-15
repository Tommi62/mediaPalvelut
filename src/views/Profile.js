import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import {Link as RouterLink} from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

const Profile = () => {
  const [user] = useContext(MediaContext);
  const [avatar, setAvatar] = useState('logo512.png');
  const {getTag} = useTag();

  useEffect(() => {
    (async () => {
      try {
        const result = await getTag('avatar_' + user.user_id);
        if (result.length > 0) {
          const image = result.pop().filename;
          setAvatar(uploadsUrl + image);
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [user]);

  console.log(avatar);

  return (
    <>
      <Typography component="h1" variant="h2" gutterBottom>
        Profile
      </Typography>
      {user && (
        <Card>
          <CardMedia image={avatar} style={{height: '20vh'}} />
          <CardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={user.username} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={user.full_name} />
              </ListItem>
              <ListItem component={RouterLink} to="/myfiles">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="My files" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}
      <Grid>
        <ProfileForm user={user} />
      </Grid>
    </>
  );
};

export default Profile;
