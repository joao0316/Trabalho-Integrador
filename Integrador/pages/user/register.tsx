import styles from '@/styles/register.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function registerPage() {

    const [formData , setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const router = useRouter();

    function handleFormEdit(event: any , fieldName:string) {
        setFormData({
            ...formData,
            [fieldName] : event.target.value
        });
    }

    async function formSubmit(event:any) {
        event.preventDefault();

        try {

            const response = await fetch('/api/action/user/create', {
                method: 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify(formData)
            });
            
            const responseJson = await response.json();

            console.log(response.status);
            console.log(responseJson);

            if ( response.status != 201 ) {
                throw new Error(responseJson.message);
            }
            else {
                alert('Account Created');
                router.push('/user/login');
            }

        }
        catch( err:any ) {
            alert(err.message);
        }
    }

    return (
        <main className={styles.main}>
            <form className={styles.formulario} onSubmit={formSubmit} >
                <div className={styles.form_container}>

                    <h1 className={styles.title1}>Junte-se à comunidade Cimankey</h1>
                    <h1>Junte-se ao Cimankey para ganhar reputação e desbloquear novos previlégios como votar e comentar.</h1>

                    <input type="text" placeholder="Digite o seu nome" onChange={(event) => { handleFormEdit(event, 'name') } }  value={formData.name} />
                    <br />
                    <input type="email" placeholder="Email" onChange={(event) => { handleFormEdit(event, 'email') } } value={formData.email} required />
                    <br />
                    <input type="text" placeholder="Usuário" onChange={(event) => { handleFormEdit(event, 'username') } } value={formData.username} required />
                    <br />
                    <input type="password" placeholder="Senha" onChange={(event) => { handleFormEdit(event, 'password') } } value={formData.password} required />
                    <br />
                    <input type="password" placeholder="Confirmação de Senha" onChange={(event) => { handleFormEdit(event, 'confirmPassword') } } value={formData.confirmPassword} required />
                    <br />

                    <button className={styles.form_btn}>Enviar</button>

                    <br />
                    <br />
                    <Link href={`/user/login`}>Já tenho uma conta</Link>
                </div>
            </form>
        </main>
    );
}