import { gql } from '@apollo/client'

export const GET_USER = gql`
  query GetUser {
    getUser {
      message
      user {
        _id
        username
      }
    }
  }
`