import { useState } from 'react';

const useTogglePasswordVisibility = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return {
    isPasswordVisible,
    togglePasswordVisibility
  };
};

export default useTogglePasswordVisibility;
