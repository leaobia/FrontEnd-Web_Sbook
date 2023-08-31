import Filtragem from "../components/Filtragem"
import '../components/Home.css'

function Home() {
    return (
        <div className="Home">
            <Filtragem/>
            <div className="welcome-group">
                <h1>Bem-Vindo,Usuário!</h1>
            </div>
        </div>
    )
}

export default Home