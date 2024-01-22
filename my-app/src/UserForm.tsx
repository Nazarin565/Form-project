import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import './App.css'

export type User = {
    name: string
    surname: string
    gender: string
    age: number
    email: string
    phone: number
    adress: {
        country: string
        city: string
    }
}

type setState = {
    setUsers: (i: User) => void,
    defaultValue: User | undefined
}

const emailValidate = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

export default function UserForm({ setUsers, defaultValue }: setState) {
    const { register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<User>({
        defaultValues: defaultValue
    })

    const onSubmit: SubmitHandler<User> = (data) => {
        setUsers(data)
        reset()
    }
    
    useEffect(() => {
        if (defaultValue) {
            setValue('name', defaultValue.name)
            setValue('surname', defaultValue.surname)
            setValue('gender', defaultValue.gender)
            setValue('age', defaultValue.age)
            setValue('email', defaultValue.email)
            setValue('phone', defaultValue.phone)
            setValue('adress.country', defaultValue.adress.country)
            setValue('adress.city', defaultValue.adress.city)
            }
    }, [defaultValue]);

    const [gender, setGender] = useState('')
    const handleChange = (e: SelectChangeEvent) => { setGender(e.target.value) }

    return (
        <form className="myform" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input {...register('name',
                    {
                        required: 'Name is required',
                        maxLength: {
                            value: 20,
                            message: 'Too long! Only to 20 characters'
                        }
                    })}
                    placeholder="Your name"
                />
                {errors?.name && <div style={{ color: 'red' }}>{errors.name.message}</div>}
            </div>

            <div>
                <input {...register('surname',
                    {
                        required: 'Surname is required',
                    })}
                    placeholder="Your surname"
                />
                {errors?.surname && <div style={{ color: 'red' }}>{errors.surname.message}</div>}
            </div>

            <div>
                <FormControl sx={{ m: 1, width: 200, backgroundColor: 'white' }} size="small">
                    <InputLabel id="demo-select-small-label" sx={{ color: 'grey' }}>Gender</InputLabel>
                    <Select
                        {...register('gender',
                            { required: 'Gender is required' })}
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={gender}
                        label="Gender"
                        onChange={handleChange}
                    >
                        <MenuItem value={'female'}>Female</MenuItem>
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'other'}>Other</MenuItem>
                    </Select>
                    {errors?.gender && <div style={{ color: 'red' }}>{errors.gender.message}</div>}
                </FormControl>
            </div>

            <div>
                <input {...register('age',
                    {
                        required: 'Age is required',
                        max: {
                            value: 99,
                            message: '100+'
                        },
                        min: {
                            value: 1,
                            message: 'not null'
                        }
                    })}
                    placeholder="Full age"
                    type='number'
                />
                {errors?.age && <div style={{ color: 'red' }}>{errors.age.message}</div>}
            </div>

            <div>
                <input {...register('email',
                    {
                        required: 'Email is required',
                        pattern: {
                            value: emailValidate,
                            message: 'Please enter a valid email'
                        }
                    })}
                    placeholder="E-mail"
                    type='email'
                />
                {errors?.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
            </div>

            <div>
                <input {...register('phone',
                    {
                        required: 'Enter phone number in international format',
                        maxLength: {
                            value: 13,
                            message: 'Enter low number'
                        },
                        minLength: {
                            value: 9,
                            message: 'Enter more number'
                        }
                    })}
                    defaultValue={'+380'}
                    placeholder="Phone number"
                    type='tel'
                />
                {errors?.phone && <div style={{ color: 'red' }}>{errors.phone.message}</div>}
            </div>

            <div>
                <input {...register('adress.country',
                    {
                        required: 'Choose your country',
                    })}
                    placeholder="Country"
                    type=''
                />
                {errors?.adress?.country && <div style={{ color: 'red' }}>{errors.adress.country.message}</div>}
            </div>

            <div>
                <input {...register('adress.city',
                    {
                        required: 'Choose your city',
                    })}
                    placeholder="City"
                />
                {errors?.adress?.city && <div style={{ color: 'red' }}>{errors.adress.city.message}</div>}
            </div>

            <div><button>Create</button></div>
        </form>
    )
}