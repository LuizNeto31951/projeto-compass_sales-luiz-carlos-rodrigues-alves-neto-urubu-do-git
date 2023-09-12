import {
  Text,
  TouchableOpacity,
  View,
  TextStyle,
  ViewStyle,
  Image,
} from 'react-native';

interface TextButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  textStyle: TextStyle;
  viewStyle: ViewStyle;
  icon: string;
}

const TextButton: React.FC<TextButtonProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={props.viewStyle}>
        <Image
          source={require(`../../assets/icons/round-arrow_right_alt-24px.png`)}
        />
        <Text style={props.textStyle}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextButton;
