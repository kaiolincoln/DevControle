import { Container } from "@/src/components/container";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CardCustomer } from "./components/card";
import Link from "next/link";

export default async function Customer(){
    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        redirect("/")
    }

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
                    <CardCustomer/>

                    <CardCustomer/>

                    <CardCustomer/>
                </section>

            </main>
        </Container>
    )
}