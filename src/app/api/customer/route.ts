import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'
import prismaClient from '@/src/lib/prisma'
import { get } from 'http'

export async function DELETE(request: Request){
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id")

    if(!userId){
        return NextResponse.json({ error: "Failed delete customer" }, { status: 400})
    }

    const findTickets = await prismaClient.ticket.findFirst({
        where:{
            customerId: userId
        }
    })

    if(findTickets){
        return NextResponse.json({ error: "Failed delete customer" }, { status: 400})
    }

    try{
        await prismaClient.customer.delete({
            where:{
                id: userId as string
            }
        })

        return NextResponse.json({ message: "Cliente deletado com sucesso!" })

    }catch(err){
        return NextResponse.json({ error: 'Failed delete customer' }, { status: 400 })
    }
}


export async function POST(request: Request){
    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, email, phone, address } = await request.json()

    try {
     await prismaClient.customer.create({
        data: {
            name,
            email,
            phone,
            address: address ? address : "",
            userId: session.user.id
        },
    })

    return NextResponse.json({ message: 'Cliente cadastrado com sucesso' }, { status: 201 })

    } catch (error) {
           return NextResponse.json({ error: 'Internal Server Error' }, { status: 400})
    }
}   