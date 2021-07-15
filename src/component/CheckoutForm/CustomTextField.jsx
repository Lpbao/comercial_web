import React  from 'react'
import { TextField , Grid , Typography} from '@material-ui/core'
import { useForm , Controller } from 'react-hook-form'

export default function FormInput ({ name , label }) {
    const {control} = useForm()

    return (
        <Grid item xs={12} sm={6}>
            <Controller 
            render={({ field }) => {
                return (
                    <>
                        <TextField {...field} placeholder={label + '*'} required />
                    </>
                )
            
            }} 
            as={TextField} control={control} 
            fullWidth 
            name={name} label={label}   />
        </Grid>
    )
}

