import React from "react"
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import './Card.css'


const GET_BOOKMARKS = gql`
{
    bookmarks {
        id
        url
        title
    }
}
`;

const DELETE_BOOKMARK = gql`
    mutation deleteBookmark($id: String!){
        deleteBookmark(id: $id){
            id
        }
    }
`

export default function Card({ url, title, id }) {
    
    const [deleteBookmark] = useMutation(DELETE_BOOKMARK);
    const handleSubmit = (id) => {
        // console.log(id)
        deleteBookmark({
            variables: {
                id: id,
            },
            refetchQueries: [{ query: GET_BOOKMARKS }]
        })
    }

    return <div className="card">
        <p className="url"><b>{url}</b></p>
        <p className="title">{title}</p>
        <button onClick={()=>handleSubmit(id)}><a className="button4" style={{backgroundColor:"#f14e4e"}}>Delete</a></button>
        
    </div>
}