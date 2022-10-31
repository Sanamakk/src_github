import React, { useEffect,useState } from 'react'

// LIB AXIOS
import axios from 'axios'
// ICONS
import { FaSearch } from 'react-icons/fa'
// CSS DA PAGINA
import './Form.css'

import logo from '../../images/logo.png'

import MenuListComposition from '../menu/Menu'


// Main Function
export default function Form() {
    const [user , setUser] = useState("");
    const [repositorios , setRepositorios] = useState([]);
    const [branches , setBranches] = useState([]);
    const [commits , setCommit] = useState([]);


    // REQUISIÇÃO DE REPOSITORIOS
    async function HandlerSearch () {
        setRepositorios([])
        try {
          const res = await axios.get(`https://api.github.com/users/${user}/repos`)
         res.data.map((repo) => {
            setRepositorios(repositorios => [...repositorios, repo.name])
            GetBranches(repo.name)
        }) 
    } catch (error) {
        console.error(error)
    }finally{
    }
    }

    // REQUISIÇÃO DE BRANCHES
    async function GetBranches (nameRepo) {
        try {
            const res = await axios.get(`https://api.github.com/repos/${user}/${nameRepo}/branches`,{
                repo: 'REPO'
            }).then(res => 
                res.data.map((branch) => {
                    setBranches(branches => [...branches,{repositorio: nameRepo, branche:branch.name}])
                    GetCommit(branch.name, nameRepo)
                }),
                )
            } catch (error) {
                console.error(error)
            } 
    }

    // REQUISIÇÃO DE COMMITS
    async function GetCommit (nameBranch, repoName) {
        try {
            const res = await axios.get(`https://api.github.com/repos/${user}/${repoName}/commits`,{
                repo: 'REPO'
            }).then(res => 
                res.data.map((commit) => {
                    setCommit(branches => [...branches,
                        {branch: nameBranch, 
                        commitMessage:commit.commit.message, 
                        nomeRepositorio: repoName}])
                }),
                )
                
            } catch (error) {
                console.error(error)
            }
    }


return (
    <>  
    {/* CONTAINER COM INPUT DE PESQUISA */}
        <div className='pesquisar'>
            <img className='logo' src={logo}/>
            <h3>Insira seu usuário Github:</h3>

            <div className='central'>
                <input onChange={(e) => setUser(e.target.value)} />
                <button onClick={HandlerSearch}>
                    <FaSearch/>
                </button>
            </div>
        </div>

        {/* RETORNO DOS ITENS */}
        <div className='itens'>
            <ul>
                <li>
                    <h3>Lista de repositórios</h3>
                </li>

                {/* LISTA DE REPOSITORIOS */}
                {repositorios.map(
                    (repo) => {
                        return(
                            // CRIANDO UMA LI A CADA REPOSITORIO
                            <li className='nome-repo'>
                                <button type='button' id='searchBranche'>
                                    {repo}
                                </button>
                            </li>
                        )
                    }
                )}

            </ul>


            <ul>
                <li>
                    <h3>Branches</h3>
                </li>

                {/* Lista para inserir os bracnhes */}
                {/* <MenuListComposition  /> */}
            </ul>


            <ul>
                <li>
                    <h3>Commits</h3>
                </li>
                {/* {commits.map(
                    (commit) =>
                    <li>{commit}</li>
                )} */}
            </ul>
        </div>
    </>
  )
}