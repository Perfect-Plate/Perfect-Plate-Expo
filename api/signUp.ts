import axios from "axios";

export interface SignUpRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    age: number;
}

const signUp = async (req: SignUpRequest) => {
    const { email, password, firstName, lastName, username, age } = req;
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/v1/user/create/",
            {
                uid: email,
                email: email,
                first_name: firstName,
                last_name: lastName,
                password: password,
                username: username,
                age: 20,
            },
            {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error signing up:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
    }
};

export default signUp;
