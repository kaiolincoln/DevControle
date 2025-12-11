"use client"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/src/components/input'
import { api } from '@/src/lib/api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'



const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.string().email("Digite um email valido.").min(1, "O email é obrigatório."),
  phone: z.string().refine((value) => {
    return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
  }, {
    message: "O numero de telefone deve estar (DD) 999999999"
  }),
  address: z.string(),
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm({ userId }: { userId: string }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const router = useRouter();

  async function handleRegisterCustomer(data: FormData){
    const response = await api.post('/api/customer',{
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      userId: userId, 
    })
    if(response.status === 201){
      toast.success('Cliente cadastrado com sucesso')
    }else{
      toast.error('Erro ao cadastrar cliente')
    }

    router.refresh();
    router.replace('/dashboard/customer')
  }
  
  return (
    <form className='flex flex-col mt-6' onSubmit={handleSubmit(handleRegisterCustomer)}>
      <label className='mb-1 font-medium text-lg text-gray-900'>Nome completo</label>

      <Input 
        type="text"
        placeholder="Digite o nome completo..."
        name="name"
        register={register}
        rules={{ required: true }}
        error={errors.name?.message}
      />

    <section className='flex gap-2 my-2 flex-col sm:flex-row'>

      <div className='w-full'>
      <label className='mb-1 font-medium text-lg text-gray-900'>Email</label>
      <Input 
        type="email"
        placeholder="Digite o email..."
        name="email"
        register={register}
        rules={{ required: true }}
        error={errors.email?.message}
      />
      </div>
      
      <div className='w-full'>
      <label className='mb-1 font-medium text-lg text-gray-900'>Telefone</label>
      <Input 
        type="tel"
        placeholder="Digite o telefone..."
        name="phone"
        register={register}
        rules={{ required: true }}
        error={errors.phone?.message}
      />
      </div>
    </section>

    <label className='mb-1 font-medium text-lg text-gray-900'>Endereço</label>
    <Input 
      type="text"
      placeholder="Digite o endereço..."
      name="address"
      register={register}
      rules={{ required: true }}
      error={errors.address?.message}
    />

    <button
       type='submit' 
       className='bg-cyan-300 my-4 px-2 h-11 rounded text-white font-bold hover:bg-cyan-400 duration-300'
       >
        Cadastrar
       </button>
    
    </form>
  )
}