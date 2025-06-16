export interface UserInterface {
    name: string,
    email: string,
    password: string,
}

export interface UserResponse {
    _id: string,
    name: string,
    email: string,
    createAt: Date,
    updateAt: Date
}