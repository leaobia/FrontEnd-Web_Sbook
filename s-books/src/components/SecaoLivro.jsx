
import CardLivro from "./CardLivro"

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  const abrirLogin = () => {
    document.getElementById('botaoLogin').click()
  }

function SecaoLivro() {
    return (
       <div className="secaoLivro" id="secaoLivro">
        {/* <p className="tipoDeLivro">Ficcao Cientifica</p> */}

        {/* <Alert
    status='error'
    variant='subtle'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    textAlign='center'
    height='45vh'
    marginLeft='22%'
    width='45%'
    borderRadius='20'
  >
    <AlertIcon boxSize='40px' mr={0} />
    <AlertTitle mt={4} mb={1} fontSize='lg'>
      Erro!
    </AlertTitle>
    <AlertDescription maxWidth='sm'>
      Você ainda não fez o login
    </AlertDescription>
    <button className='fazerLoginButton' onClick={abrirLogin}>Fazer Login</button>
  </Alert> */}
        <CardLivro/>
       </div>
    )
}
export default SecaoLivro