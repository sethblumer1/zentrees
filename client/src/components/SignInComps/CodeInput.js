import { PinInput, PinInputField } from '@chakra-ui/react';

import React from 'react';

const CodeInput = () => {
  return (
    <HStack>
      <PinInput>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  );
};

export default CodeInput;
