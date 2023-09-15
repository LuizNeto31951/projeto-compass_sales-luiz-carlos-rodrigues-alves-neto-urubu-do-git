import React from 'react';
import {View} from 'react-native';
import RedButton from '../components/ui/RedButton';
import {AuthContext} from '../context/authContext';
import {Title} from '../components/ui/Title';
import {fetchUser} from '../components/util/firebase';
import {useIsFocused} from '@react-navigation/native';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function HomeScreen(): JSX.Element {
  const ctx = React.useContext(AuthContext);
  const isFocused = useIsFocused();
  const [user, setUser] = React.useState(Object);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    async function getUser() {
      const user = await fetchUser(ctx.id);
      setUser(user);
    }
    getUser();
    setLoading(false);
  }, [ctx.isLogged, ctx.id, isFocused]);

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
