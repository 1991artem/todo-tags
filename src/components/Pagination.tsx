import Pagination from 'react-bootstrap/Pagination';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

interface ICount {
  count: number;
}

function PaginationComponent({count}: ICount) {
  let navigate = useNavigate();
  let location = useLocation();
  const page = +location.pathname.replace(/\//ig, '');
  const pagination: number[] = [];
  for (var i = 1; i <= count; i++) {
    pagination.push(i);
  }

  const prev = () => {
    if(!page) {
      navigate(`${page-1}`)
    }
  }

  const next = () => {
    if(page < count) {
      navigate(`${page+1}`)
  }
  }
  return (
    <> 
      {
      count > 1 ?
      <Pagination className='pagination'>
      <Pagination.First onClick={()=> navigate('1')}/>
      <Pagination.Prev onClick={prev}/>
      {
      pagination.map((pageNumber: number)=>(
        <NavLink className={'page-link'} to={`/${pageNumber}`} key={Math.trunc(Date.now()*Math.random())}>{pageNumber}</NavLink>
      ))

      }
      <Pagination.Next onClick={next}/>
      <Pagination.Last onClick={()=> navigate(`${count}`)}/>
    </Pagination>
    : null
    }
    </>


  );
}

export default PaginationComponent;