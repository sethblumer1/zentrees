import {
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import axios from 'axios';

export const SignInIndex = () => {
  const CodeInput = () => {
    return (
      <HStack display="flex" justify={'center'}>
        <PinInput size="lg">
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

  // Keep track of phone number sent by user
  const [phoneNumber, setPhoneNumber] = useState('');
  // Keep track of pin (6 digit code) sent to user
  // const [code, setCode] = useState('');

  const changePhoneNumber = (e) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  };

  // Send code to user
  const sendText = (e) => {
    e.preventDefault();
    let userNumber = { number: phoneNumber };

    axios
      .post('/', userNumber)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CodeModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const triggerCode = (e) => {
      e.preventDefault();
      sendText(e);
      onOpen();
    };

    const checkCode = (e) => {
      e.preventDefault();
      // Get all digits of PIN from frontend
      let pinInputs = document.getElementsByClassName('chakra-pin-input');
      pinInputs = [...pinInputs];

      // Add to string for code to send to /verify route
      let pinStr = '';
      pinInputs.forEach(function (pinInput) {
        pinStr += pinInput.value;
      });

      let codeToVerify = parseInt(pinStr);

      axios
        .post('/verify', { code: codeToVerify })
        .then((res) => {
          // If user entered in code correctly, create new user / log in
          if (res.data.message === 'success') {
            axios
              .post('/api/auth', { phoneNumber: phoneNumber })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <>
        <Button onClick={(e) => triggerCode(e)} variant="primary">
          Get code
        </Button>

        <Modal
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent display="flex" justifyContent={'center'}>
            <ModalHeader>
              <VStack spacing="4">
                <Text>Check your texts</Text>
                <Text fontSize="md" fontWeight={'normal'}>
                  We've sent a 6-character code to {phoneNumber}
                </Text>
              </VStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CodeInput />
            </ModalBody>
            <ModalFooter flexDir={'column'}>
              <Button
                onClick={(e) => checkCode(e)}
                variant="primary"
                w="100%"
                mb="5px"
              >
                Verify
              </Button>
              <Button onClick={onClose} w="100%">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <Container
      maxW="md"
      h="100vh"
      display="flex"
      alignItems={'center'}
      justifyContent={'center'}
      // py={{ base: '12', md: '24' }}
    >
      <Stack spacing="8" minW="sm">
        <Stack spacing="6" align="center">
          {/* <Logo /> */}
          <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
            Log In / Sign Up
          </Heading>
        </Stack>
        <Stack spacing="6">
          <Divider />
          <Stack spacing="4">
            <InputGroup>
              <InputLeftAddon children="+1" />
              <Input
                placeholder="phone number"
                type="text"
                value={phoneNumber}
                onChange={(e) => changePhoneNumber(e)}
              />
            </InputGroup>
            {/* <Button
              variant="primary"
              onClick={(e) => {
                sendText(e);
              }}
            >
              Continue with phone number
            </Button> */}
            <CodeModal />
          </Stack>
        </Stack>
        {/* <Button variant="link" colorScheme="blue" size="sm">
        Continue using Single Sign-on (SSO)
      </Button> */}
      </Stack>
    </Container>
  );
};
