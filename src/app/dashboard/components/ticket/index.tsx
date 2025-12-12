"use client"

import { useContext } from "react"
import { FiCheckSquare, FiFile } from "react-icons/fi"
import { TicketProps } from '@/src/utils/ticket.type'
import { CustomerProps } from '@/src/utils/custumer.type'
import { api } from '@/src/lib/api'
import { useRouter} from 'next/navigation'
import { ModalContext } from "@/src/providers/modal"

interface TicketItemProps{
    ticket: TicketProps;
    customer: CustomerProps | null
}

export function TicketItem({ customer, ticket}: TicketItemProps){
    const router = useRouter();
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext)

    async function handleChangeStatus(){
        try{
            const response = await api.patch("/api/ticket", {
                id: ticket.id,
            })

          router.refresh();
        }catch(err){

        }
    }

    function handleOpenModal(){
        handleModalVisible();
        setDetailTicket({
            customer: customer,
            ticket: ticket
        })
    }

    return(
        <>
          <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200">
            <td className="text-left">
                {customer?.name}
            </td>
            <td className="text-left hidden sm:table-cell">
                {ticket.created_at?.toLocaleDateString("pt-br")}
            </td>
            <td className="text-left">
                <span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span>
            </td>
            <td className="text-left">
               <button className="mr-2" onClick={handleChangeStatus}>
                <FiCheckSquare size={24} color="#131313"/>
               </button> 
               <button onClick={handleOpenModal}>
                <FiFile size={24} color="#25ddf5ff"/>
               </button>
            </td>
          </tr>
        </>
    )
}