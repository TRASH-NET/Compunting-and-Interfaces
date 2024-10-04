import React from 'react'

const Instructions = () => {
    return (
        <aside className="w-full p-5">
            <h2 className="font-bold text-xl mb-5 ml-2 text-center">Instrucciones para jugar</h2>
            <ul className="flex flex-col gap-2 justify-start bg-[#c7c7c7] p-4 rounded-md">
                <li className="list-disc ml-5">
                    <p>Para iniciar el juego debe ingresar su Nick Name y presionar el boton <span className='font-bold'>Iniciar juego</span></p>
                </li>
                <li className='list-disc ml-5'>
                    <p><span className='font-bold'> ¡ IMPORTANTE !</span> si no ingresa Nick Name se generara uno automaticamente</p>
                </li>
                <li className="list-disc ml-5">
                    <p>Utilice las flechas del teclado para mover las fichas &larr; &uarr; &rarr; &darr;</p>
                </li>
                <li className="list-disc ml-5">
                    <p>Las fichas con el mismo numero se suman, consigue el numero <span className="font-bold">2048</span> para ganar</p>
                </li>
                <li className="list-disc ml-5">
                    <p>Si te quedas sin movimientos, pierdes. <span className="font-bold">¡ DIVIERTETE !</span></p>
                </li>
            </ul>
        </aside>
    )
}

export default Instructions;