import styles from "@/styles/movie.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import imageMovie from "@/public/image.png";
import { getCookie } from "cookies-next";
import { checkToken } from "@/services/tokenConfig";

export default function page({ movieName }: any) {

    const [movie, setMovie]: any = useState();
    const [formData, setFormData] = useState({
        value: 5,
        comment: '',
        email: '',
        movieName: movieName
    });
    const router = useRouter();

    function handleFormEdit(event:any , field:string) {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    }

    async function formSubmit() {
        try {
            
            const cookie = getCookie('authorization');

            const tokenInfos = checkToken(cookie);

            const response = await fetch(`/api/action/rating/create` , {
                method: 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify({
                    value: Number(formData.value),
                    comment: formData.comment,
                    email: tokenInfos.login,
                    movieName: formData.movieName
                })
            });

            const responseJson = await response.json();

            if ( response.status != 201 ) {
                throw new Error(responseJson.message);
            }

        }
        catch ( err:any ) {
            alert(err.message);
        }
    }

    async function fetchData() {
        try {
            const response = await fetch(`/api/action/movie/find?name=` + movieName, {
                method: 'GET'
            });

            const responseJson = await response.json();

            setMovie(responseJson);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    useEffect(() => {
        fetchData();

    }, []);


    return (
        <main>
            <div className={styles.container}>

                {movie != undefined ?

                    <div className={styles.page}>
                        <img src={movie.imageURL} className={styles.movieImage} />

                        <div className={styles.movieInfos}>
                            <p className={styles.field}>Informações do Filme</p>
                            <p className={styles.field}>O nome do filme é : {movie.name} </p>
                            <p className={styles.field}>A data de lançamento é: {movie.releaseDate} </p>
                        </div>

                        <form onSubmit={formSubmit} className={styles.ratingBox}>

                            <textarea onChange={(event) => {handleFormEdit(event, 'comment')}} value={formData.comment} className={styles.ratingComment} placeholder="Digite o seu comentário"></textarea>

                            <select onChange={(event) => {handleFormEdit(event, 'value')}} value={formData.value} className={styles.ratingValue}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>

                            <button className={styles.ratingButton} >Enviar</button>
                        </form>

                        <div className={styles.ratings}>

                            {

                                movie.ratings.map(rating => (
                                    <div className={styles.singleRating}>
                                        <p className={styles.rUsername}>Usuário: {rating.user.username}</p>
                                        <p className={styles.rValue}>Nota: {rating.value}</p>
                                        <p className={styles.rComment}> {rating.comment} </p>
                                    </div>
                                ))

                            }

                        </div>

                    </div>

                    :

                    <div>
                        <p>Filme não encontrado.</p>
                    </div>

                }

            </div>
        </main>
    );
}

export function getServerSideProps(context: any) {
    const { movieName } = context.query;

    return {
        props: {
            movieName
        }
    }
}