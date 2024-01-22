import React from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactSelect from "react-select";

interface IOption {
    value: string
    label: string
}

interface IAddress {
    country: string
    city: string
    street: string
    house: string
}

interface IShippingFields {
    email: string
    name: string
    address: IAddress
}

const options: IOption[] = [{
    value: 'ukraine',
    label: 'Ukraine',
},
{
    value: 'usa',
    label: 'USA',
},
{
    value: 'great-britain',
    label: 'Great Britain',
},
{
    value: 'spain',
    label: 'Spain',
}]

const getValue = (value: string) =>
    value ? options.find((option) => option.value === value) : ''



export default function RegForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        // watch,
        setValue,
        control,
    } = useForm<IShippingFields>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IShippingFields> = (data) => {
        alert(`Your name ${data.name} and you are from ${data.address.country}`)
        console.log(data)
        reset()
    }

    // useEffect(() => {
    //     const subscription = watch((value, { name, type }) =>
    //         console.log(value, name, type))
    //     return () => subscription.unsubscribe()
    // }, [watch])


    return (<div>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <input {...register('name',
                    {
                        required: 'Name is required field',
                        maxLength: {
                            value: 10,
                            message: 'Too long! Only to 10 characters',
                        }
                    })}
                    type='text'
                    placeholder="Name" />
                {errors?.name && (
                    <div style={{ color: 'red' }}>{errors.name.message}</div>)}
            </div>

            <div>
                <input {...register('email',
                    {
                        required: 'Email is required field',
                        pattern: {
                            value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                            message: 'Please, enter valid email!'
                        }
                    })}
                    type='text'
                    placeholder="Email" />
                {errors?.email && (
                    <div style={{ color: 'red' }}>{errors.email.message}</div>)}
            </div>
            <Controller
                control={control}
                name='address.country'
                rules={{
                    required: 'Country is required'
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <div>
                        <ReactSelect
                            placeholder='Countries'
                            options={options}
                            value={getValue(value)}
                            onChange={newValue => onChange((newValue as IOption).value)}
                        />
                        {error && (<div style={{ color: 'red' }}>{error.message}</div>)}
                    </div>
                )}
            />

            <div><button>Send</button></div>

        </form>

        <div><button onClick={() => {
            setValue('name', 'Nazar')
            setValue('email', 'test@test.test')
        }}>Fill data</button></div>
    </div>)
}