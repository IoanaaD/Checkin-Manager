import { Box, Button, Center, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

const fetchUsers = async () => {
    const response = await fetch("http://localhost:3001/api/user-profile");
    if(!response.ok) {
        throw new Error("Failed to fetch users!")
    }
    return response.json()
}

const Home = () => {
    const [isFetched, setIsFetched] = useState(false)
    const { data: users, isLoading, refetch } = useQuery({
        queryFn: fetchUsers,
        queryKey: ["users"],
        enabled: isFetched
    })

    const handleClick = () => {
        setIsFetched(true);
        refetch()
    }

    if( isLoading ) {
        return <div>Is loading...</div>
    }

  return (
    <Flex paddingTop={"100px"} alignItems={"center"} direction={"column"}>
        <Button maxW={"100px"} onClick={handleClick}>Fetch users</Button>
        <div>
            {users?.map((user:any) => {
            return <h1 key={user._id}>{user.givenName}</h1>
         })}
        </div>
    </Flex>
  )
}

export default Home