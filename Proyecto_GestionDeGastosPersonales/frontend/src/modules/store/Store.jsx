import { useEffect, useState } from "react"
//import {ObtenerProductos} from '../../services/categorias.service'
import { Pencil,Trash  } from 'lucide-react';

const store=()=>{
    const [productos,SetProductos]=useState([]);
    
    useEffect(()=>{
        const productos= async()=>{
            const resultado = await ObtenerProductos();
            SetProductos(resultado);
        }
        productos();
    },[])
    return(
        <div className="">
            <div className="border border-gray-300 rounded-2xl p-4 shadow-2xl shadow-gray-300">
                <table className="table-auto w-full border-separate border-spacing-x-5">
                    <thead>
                        <tr>
                            <th className="bg-gray-300 py-3 border-gray-400 rounded-xl font-mono ">id</th>
                            <th className="bg-gray-300  border-gray-400 rounded-xl font-mono">nombre</th>
                            <th className="bg-gray-300  border-gray-400 rounded-xl font-mono">precio</th>
                            <th className="bg-gray-300 rounded-xl font-mono">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                         productos.map((productos)=>(
                            <tr>
                                <td className="font-mono text-center py-2">{productos.id}</td>
                                <td className="font-mono text-center">{productos.nombre}</td>
                                <td className="font-mono text-center">{productos.precio}</td>
                                <td className="flex justify-center gap-2 items-center py-2">
                                    <Pencil className="hover:text-green-500" size={20} />
                                    <Trash className="hover:text-red-700" size={20}/>
                                </td>
                            </tr>
                         ))   
                        }
                       
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default store