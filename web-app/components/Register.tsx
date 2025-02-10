import { Button, Flex, Input, Stack, Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useNavigation } from 'react-router';

type RegisterFields = {
    givenName: string;
    familyName: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const registerUser = async(data: RegisterFields) => {
    const response = await fetch("http://localhost:3001/api/user-profile", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            givenName: data.givenName,
            familyName: data.familyName,
            email: data.email,
            password: data.password
        })
    })

    if(!response.ok) {
        throw new Error ('Register failed!')
    }

    const result = await response.json();
    return result;
}

const Register = () => {
    const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm<RegisterFields>()
    const [successMessage, setSuccessMessage] = useState("")
    const navigate = useNavigate()
    const {mutateAsync} = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            setSuccessMessage("User registered successfully!")
        },
        onError: (error: any) => {
            console.log("Error during register", error.message)
        }
    })

    const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
        try {
            const response = await mutateAsync(data);
            console.log("User registered!",data)
        } catch (error: any) {
            setError("root", {
                message: error.message || "error"
              })
        }
    }

  return (
    <Flex
          width={"100vw"}
          height={"100vh"}
          alignItems={"center"}
          direction={"column"}
          padding={"100px"}
          >
        <Text textStyle="4xl">Create a new account using the form below!</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack w="300px" gap={4} padding={"20px"}>
                <Input {...register("givenName", {
                    required: "Given name is required!"
                })}variant={"flushed"} placeholder='Given Name'/>
                {errors.givenName && <Text color="red">{errors.givenName.message}</Text>}
                <Input {...register("familyName", {
                    required: "Family name is required!"
                })}variant={"flushed"} placeholder='Family Name'/>
                {errors.familyName && <Text color="red">{errors.familyName.message}</Text>}
                <Input {...register("email", {
                    required: "Email is required!",
                    validate: (value) => {
                        if(!value.includes('@')) {
                            return "Invalid email!"
                        }
                        return true
                    }
                })}variant={"flushed"} placeholder='Email'/>
                {errors.email && <Text color="red">{errors.email.message}</Text>}
                <Input {...register("password", {
                    required: "Password is required!",
                    minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters!"
                    }
                })} variant={"flushed"} placeholder='Password' type='password'/>
                {errors.password && <Text color="red">{errors.password.message}</Text>}
                <Button type='submit'>Create account</Button>
                <Button onClick={() => {navigate("/")}}>Go to homepage</Button>
                {errors.root && <Text color="red">{errors.root.message}</Text>}
                {successMessage && <Text color="green">{successMessage}</Text>}
            </Stack>
        </form>
    </Flex>
  )
}

export default Register