import { Container } from "@/src/components/container";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CardCustomer } from "./components/card";
import  prismaClient  from "@/src/lib/prisma";

export default async function Customer(){
    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        redirect("/")
    }


    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    return(
        <Container>
            <main>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus clientes</h1>
                    <Link href="/dashboard/customer/new" className='bg-cyan-300 px-4 py-1 rounded text-white'>
                    Novo Cliente
                    </Link>
                </div>

                <section className="grid grid-cols-1 sm:grid-gols-2 lg:grid-cols-3 gap-3 mt-2">
                    {customers.map((customer) => (
                        <CardCustomer 
                        key={customer.id}  
                        customer={customer}
                        />
                    ))}
                </section>

                {customers.length === 0 && (
                    <h1 className="text-gray-600">Voce ainda não possui nenhum cliente.</h1>
                )}

            </main>
        </Container>
    )
}