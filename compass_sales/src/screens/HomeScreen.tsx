import React from 'react';
import {View} from 'react-native';
import RedButton from '../components/ui/RedButton';
import {AuthContext} from '../context/authContext';
import {Title} from '../components/ui/Title';
import {useIsFocused} from '@react-navigation/native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {fetchUser} from '../components/util/Firebase';

function HomeScreen(): JSX.Element {
  const ctx = React.useContext(AuthContext);
  const isFocused = useIsFocused();
  const [user, setUser] = React.useState(Object);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function getUser() {
      const user = await fetchUser(ctx.id);
      setUser(user);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    setLoading(true);
    getUser();
  }, [ctx]);

  if (loading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <View>
      <Title>Hello {user.name}!</Title>
      <RedButton onPress={ctx.authLogout}>Logout</RedButton>
    </View>
  );
}

export default HomeScreen;
