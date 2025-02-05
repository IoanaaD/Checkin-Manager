import { Text, Flex, Input, Button, Stack } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormFields = {
  email: string,
  password: string
}

const loginUser = async (data: FormFields) => {
  const response = await fetch("http://localhost:3001/api/user-profile/login", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  })

  if (!response.ok) {
    throw new Error('Login failed: Invalid credentials');
  }

  const result = await response.json()
  return result;
}

const Login = () => {
  const [successMessage, setSuccessMessage] = useState("")
  const { register, handleSubmit, setError, formState: {errors, isSubmitting} } = useForm<FormFields>()
  const {mutateAsync} = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setSuccessMessage("You are logged in!")
    },
    onError: (error: any) => {
      console.log("Error during login:", error.message);
    }
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
     
      const response = await mutateAsync(data);
      console.log(data)
      console.log("User logged in: ", response)
    } catch (error: any) {
      setError("root", {
        message: error.message || "error"
      })
    } 
  }

  return (
    <>
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignItems={"center"}
      direction={"column"}
      padding={"100px"}
      >
      <Text textStyle="4xl">Welcome to Checkin Manager App!</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack w="300px" gap={4} padding={"20px"}>
        <Input {...register("email", {
          required: "Email is required!",
          validate: (value) => {
            if(!value.includes("@")) {
              return "Invalid email!"
            } 
            return true;
          }
        })} placeholder="Email" variant="flushed" />
        {errors.email && <Text color="red">{errors.email.message}</Text>}
        <Input {...register("password", {
          required: "Password is required!",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters!"
          }
        })} placeholder="Password" type='password' variant="flushed" />
        {errors.password && <Text color='red'>{errors.password.message}</Text>}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Submit"}
        </Button>
        {errors.root && <Text color="red">{errors.root.message}</Text>}
        {successMessage && <Text color="green">{successMessage}</Text>}     
        </Stack>
      </form>
    </Flex>
    </>
  )
}

export default Login