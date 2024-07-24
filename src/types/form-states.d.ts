import { structureTypeArray } from "./response"

export type registerFormState = {
    errors: {
        email?: string[],
        password?: string[],
        confirmPassword?: string[],
        _form?: string[]
    }
}


export type loginFormState = {
    errors: {
        email?: string[],
        password?: string[],
        _form?: string[]
    }
}


export type linkFormState = {
    errors: structureTypeArray | {}[]
  }