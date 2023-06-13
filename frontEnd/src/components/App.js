import { useState } from "react";
import { Outlet } from "react-router-dom";
import BarraNavegacao from "./barraNavegacao";

export default function App() {
    const [botoes] = useState(['Clientes', 'Serviços', 'Produtos', 'Compra', 'Dados de consumo'])

    return (
        <>
            <BarraNavegacao botoes={botoes} tema='purple'/>
            <Outlet/>
        </>
    )
}