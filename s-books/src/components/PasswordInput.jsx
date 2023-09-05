import { Input, InputGroup, InputRightElement, Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function PasswordInput() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
        />
        <InputRightElement width='2.8rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}  bg='transparent'>
          {show ? (
            <Icon as={FaEye} color='gray.500' />
          ) : (
            <Icon as={FaEyeSlash} color='gray.500' />
          )}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }

  export default PasswordInput