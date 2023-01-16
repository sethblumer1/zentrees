import React from 'react';
import { Box, Input, Flex, Textarea, Button } from '@chakra-ui/react';
export const Example = () => {
  return (
    <>
      <Box m={10}>
        <Flex>
          <Textarea placeholder="e.g., Wash the dishes" mb={5} />
        </Flex>
        <Flex>
          <Input placeholder="Month" mr={2} />
          <Input placeholder="Day" mr={2} />
          <Input placeholder="Year" mr={2} />
          <Input placeholder="Hour" mr={2} />
          <Input placeholder="Minute" mr={2} />
        </Flex>
        <Flex justifyContent={'center'} mt={5}>
          <Button colorScheme={'blue'}>Add reminder</Button>
        </Flex>
      </Box>
    </>
  );
};
