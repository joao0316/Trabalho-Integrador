import { checkToken } from "@/services/tokenConfig";
import { deleteCookie, getCookie } from "cookies-next";
import styles from "@/styles/home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter();
  const [data, setData]: any = useState();
  const [saveData, setSaveData]: any = useState();
  const [search , setSearch]: any = useState();

  function handleSearchEdit(event:any) {
    event.preventDefault();
    setSearch(event.target.value);
    
    searchSubmit()
  }
  

  function searchFilter(vetor: Array<any>) {
    if ( search == '' ) {
      return vetor;
    }
    else {
      return vetor.filter(
        (movie:any) => movie.name.toLowerCase().includes(search)
      )
    }
  }

  function searchSubmit() {
    
    try {
      const filteredArray = searchFilter(saveData);
      
      setData(filteredArray);
    }
    catch( err:any ) {
      alert(err.message);
    }
  }

  async function fetchData() {
    const response = await fetch(`/api/action/movie/select`, {
      method: 'GET'
    })

    const responseJson = await response.json();

    setData(responseJson);
    setSaveData(responseJson);

    console.log(data);
  }

  // Funções que vão acontecer antes da página carregar
  useEffect(() => {
    fetchData();
  }, []);

  function logout() {
    deleteCookie('authorization');

    router.push(`/user/login`);
  }

  function movieClick(movieName:string) {
    router.push(`/movie/` + movieName);
  }


  return (
    <main>
      <nav className={styles.navBar}>

        <input value={search} onChange={handleSearchEdit}  className={styles.searchBar} type="text" placeholder="Digite o nome do filme . . ." />

        <button className={styles.btnLogout} onClick={logout}>Logout</button>
      </nav>
      <div className={styles.container}>

        {
          data != undefined && data instanceof Array ?

            data.map(movie => (


              <div className = { styles.card } onClick={() => {movieClick(movie.name)}}>
                <img src={movie.imageURL} alt="" />
                <p>{movie.name}</p>
                <p>{movie.releaseDate}</p>
              </div>


            ))

            :

            <div>
              Filmes não encontrados
            </div>

        }

      </div>
    </main >
  )
}


export function getServerSideProps({ req, res }: any) {
  try {
    const token = getCookie('authorization', { req, res });

    if (!token) {
      throw new Error('Invalid Token');
    }

    checkToken(token);

    return {
      props: {}
    }

  }
  catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/user/login'
      },
      props: {}
    }
  }
}