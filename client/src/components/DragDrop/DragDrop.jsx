import React from 'react'
import s from './DragDrop.module.scss'
import { Box, Text } from '@chakra-ui/react'
const DragDrop = ({t1 ,t2}) => {
  return (
    <Box className={s.box}>
      <Box className={s.inside}>
         <Text fontSize={'2xl'} fontWeight={'bold'}>{t1}</Text>
         <Text fontSize={'2xl'} fontWeight={'bold'}>{t2}</Text>
      </Box>
    </Box>
  )
}

export default DragDrop