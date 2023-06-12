import { View, TextInput, Pressable, Animated, Easing } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  toggleInput: () => void;
  inputVisible: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ toggleInput, inputVisible }) => {
  const [input, setInput] = useState("");
  const width = useRef(new Animated.Value(0)).current;

  const widthAnim = width.interpolate({
    inputRange: [0, 1],
    outputRange: ["12%", "100%"],
  });

  const toggleSearch = () => {
    Animated.timing(width, {
      toValue: !inputVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    toggleInput();
  };

  const barWidth = { width: widthAnim };

  return (
    <Animated.View
      className="rounded-full bg-slate-600 flex flex-row items-center justify-end h-full"
      style={[barWidth]}
    >
      <TextInput
        placeholder="Search country"
        value={input}
        onChangeText={setInput}
        className={`text-white h-10 pl-0 ml-5 flex-1`}
        selectionColor="white"
        placeholderTextColor="white"
      />
      <Pressable
        onPress={toggleSearch}
        className="bg-slate-300 rounded-full mx-1 p-2"
      >
        <AntDesign name="search1" size={22} color="black" />
      </Pressable>
    </Animated.View>
  );
};

export default SearchBar;