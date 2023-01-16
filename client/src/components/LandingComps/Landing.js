import React, { useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';
import { Example } from '../calendar/Example';
import { Flex, Divider } from '@chakra-ui/react';

const Landing = () => {
  const { user, clearUser } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    // if (!user) {
    //   navigate('/');
    // }
  }, [user, navigate]);

  return (
    <>
      <Flex justifyContent={'flex-end'}>
        <Button onClick={clearUser} mr={10} mt={5} mb={5} colorScheme="teal">
          Logout
        </Button>
      </Flex>

      <Divider />

      <Box>
        <Example />
      </Box>
    </>
  );
};

export default Landing;
