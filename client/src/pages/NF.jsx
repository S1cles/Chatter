import { Box, Img, Text } from '@chakra-ui/react'
import React from 'react'
import MyLinkButton from './../components/MyLinkButton/MyLinkButton';

const NF = () => {
  return (
    <Box width={'auto'} padding={10} height={'100vh'} style={{background:'url(/Cover.png)'}}>
        <Text className='error_page' position={'absolute'} top={'30%'} right={'5%'} fontSize={'6xl'}>Error 404</Text>
        <MyLinkButton to='/register'>Back</MyLinkButton>
    </Box>
  )
}

export default NF