import styles from '@/styles/projeto.module.css'

export default function page() {

    return (
        <main className={styles.container}>
            <h1>Movie reviewer</h1>
            <br />
            <input type="button" id='Continuar' value='Continuar sem logar' />
            <br />
            <h1>ou</h1>
            <br />
            <input type="button" id="entrar" value="Fazer login" />

        </main >
    )
}