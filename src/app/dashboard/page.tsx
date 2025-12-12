import { Container } from '@/src/components/container'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TicketItem } from '@/src/app/dashboard/components/ticket'

import prismaClient from '@/src/lib/prisma'

export default async function Dashboard(){
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        redirect("/")
    }

    const tickets = await prismaClient.ticket.findMany({
        where:{
            userId: session.user.id,
            status: "ABERTO"
        },
        include:{
            customer: true,
        },
        orderBy:{
            created_at: "desc"
        }
    })


    return(
        <div>
            <Container>
                <main className="mt-9 mb-2">
                    <div className="flex items-center justify-between">
                    <h1 className='text-3xl font-bold'>Chamados</h1>
                    <Link href="/dashboard/new" className='bg-cyan-300 px-4 py-1 rounded text-white'>Abrir chamado</Link>
                </div>

                <table className="min-w-full my-2">
                    <thead>
                        <tr>
                            <th className="font-medium text-left pl-1">CLIENTE</th>
                            <th className="font-medium text-left hidden sm:table-cell">DATA CADASTRO</th>
                            <th className="font-medium text-left">STATUS</th>
                            <th className="font-medium text-left">#</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tickets.map( ticket => (
                            <TicketItem 
                               key={ticket.id}
                               customer={ticket.customer}
                               ticket={ticket}
                            />
                        ))}                 

                    </tbody>
                </table>

            {tickets.length === 0 && (
                <h1 className="text-gray-600 px-2 md:px-0">Nenhum ticket aberto foi encontrado...</h1>
            )}
                </main>
            </Container> 
        </div>       
    )
}