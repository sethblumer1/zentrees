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

import { useGlobalContext } from '../context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';

import Landing from '../LandingComps/Landing';

export const SignInIndex = () => {
  const { user, changeUser } = useGlobalContext();
  const loggedInUser = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    // if (user || loggedInUser) {
    //   navigate('/dashboard');
    // }
  }, [user, navigate]);

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
      .post('/send-code', userNumber)
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
              .post('/api/auth/login', { phoneNumber: phoneNumber })
              .then((res) => {
                changeUser(res.data);
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
    <>
      {user || loggedInUser ? (
        <Landing />
      ) : (
        <Container
          maxW="md"
          h="100vh"
          display="flex"
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Stack spacing="8" minW="sm">
            <Stack spacing="6" align="center">
              <Heading size={'sm'}>Log In / Sign Up</Heading>
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
                <CodeModal />
              </Stack>
            </Stack>
          </Stack>
        </Container>
      )}
    </>
  );
};
