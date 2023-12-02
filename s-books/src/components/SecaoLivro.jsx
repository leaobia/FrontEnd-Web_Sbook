import CardLivro from "./CardLivro"

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

function SecaoLivro({ filteredAds }) {
  return (
    <div className="secaoLivro" id="secaoLivro">

        <CardLivro filteredAds={filteredAds} />
    </div>
  )
}
export default SecaoLivro