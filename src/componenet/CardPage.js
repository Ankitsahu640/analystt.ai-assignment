import React, { useEffect, useState } from 'react';
import Card from './Card';
import ReactPaginate from "react-paginate";

function CardPage() {

  const [users,setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 3;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(()=>{
    fetchDetails();
  },[])

  const fetchDetails=async()=>{
    const data = await fetch("https://jsonplaceholder.typicode.com/users",
        {
            method:"GET",
            headers:{
                'Content-Type': "application/json"
            }
        });
        const user = await data.json();
        setUsers(user);
  }

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  return (
    <>
    <div className='cardPage'>
      {users.slice(pagesVisited, pagesVisited + usersPerPage).map((user)=>{
            return <Card key={user.id} user={user}/>
        })}
    </div>
      <ReactPaginate
        previousLabel={" < "}
        nextLabel={" > "}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    
    </>
  )
}

export default CardPage
