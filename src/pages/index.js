
import React, { useEffect, useState } from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import "./style.css";
// import Card from '../components/card';
import Card from '../components/Card';

const GET_BOOKMARKS = gql`
{
    bookmarks {
        id
        url
        title
    }
}
`;

const ADD_BOOKMARK = gql`
    mutation addBookmark($url: String!, $title: String!){
        addBookmark(url: $url, title: $title){
            id
        }
    }
`



export default function Home() {

    let titleField;
    let urlField;

    const { error, loading, data } = useQuery(GET_BOOKMARKS);
    const [addBookmark] = useMutation(ADD_BOOKMARK);

    const handleSubmit = () => {
        // console.log(titleField.value)
        // console.log(urlField.value)
        addBookmark({
            variables: {
                url: urlField.value,
                title: titleField.value
            },
            refetchQueries: [{ query: GET_BOOKMARKS }]
        })
    }

    if (error)
        return <h3>{error}</h3>

    if (loading)
        return <h3>Loading..</h3>




    return <div className="container">

        <h1>Add New Bookmark</h1>

        <div className="form-group">
            <label>
                Enter Bookmark Title: <br />
            </label>
            <input className="form-field" type="text" placeholder="Title" ref={node => titleField = node} />
        </div>
        <br />
        <div className="form-group">
            <label >
                Enter Bookmark URL: <br />
            </label>
            <input className="form-field" type="text" placeholder="URL" ref={node => urlField = node} />
        </div>


        <br />
        <br />
        <div className="button_cont" align="center" onClick={handleSubmit}><a className="example_a" rel="nofollow noopener">Add Bookmark</a></div>

        <h1>My Bookmark List</h1>

        <div className="card-container">
            {data.bookmarks.map((bm) => <Card url={bm.url} title={bm.title} id={bm.id} key={bm.id} />)}
        </div>

    </div>
}